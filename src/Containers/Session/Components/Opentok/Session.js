import React, {Component} from "react";
import {Text, View, Platform} from "react-native";
import {Publisher} from "./Publisher";
import {Subscriber} from "./Subscriber";
import styles from "./styles";

import { OTSession } from 'opentok-react-native';

import {TOKBOX_APIKEY} from  "../../../../Config/env";

import { recordSessionOpentokEvent, createRecorder } from "../../../../Util/Forensics";
import { VIDEO_WARNING } from "../../../../Util/Constants";

// custom app signals sent/received via tokbox connection
const SIGNALS = {
  ENDING: 'ending', // signal that other side is ending the call
  NOT_LEGACY_VERSION: 'notLegacyVersion', // signal that other side has a modern version of the app
  APP_STATE: 'appState', // signal about other sides app state (background/active, etc)
  NETWORK_STATE: 'networkConnection', // signal about other sides connection type (wifi/cell)
  CONTROL_STATE: 'controls', // signal for other sides call control state (video/mute/speaker/cameraFlip)
  VIDEO_THROTTLE: 'videoThrottle', // signal if other sides video receiving has been throttled by tokbox
  VIDEO_THROTTLE_LIFTED: 'videoThrottleLifted', // signal if other side's video has stopped being throttled
  LEGACY_VIDEO_THROTTLED: VIDEO_WARNING.TYPE, // legacy signal if other sides video receiving has been throttled/unthrottled by tokbox
  RECEIVING_AV: 'receivingAV', // signal from other side they are initially receiving audio/video from this side
  AV_STATUS: 'avStatus', // status of remote side, if they are receiving audio or video
  HEARTBEAT: 'heartbeat', // periodic heartbeat from other side to prove connection is still active
  TIMER_RESET: 'timerReset', // timer should be reset to the specified amount, this happens in the case of certain types of disconnects
};

const newUserState = () => {
  return {
    connectionID: null,
    streamID: null,
    meta: null,
    legacyVersion: true, // specifically this means pre 3.0.0
    publishing: false,
    publishingAudio: false,
    publishingVideo: false,
    publisherError: false,

    // not setable for legacy versions - requires current version
    subscribing: false,
    subscriberError: false,
    lastHeartbeatAt: null
  }
}

let recordComponentEvent = () => {};

export class Session extends Component {
  constructor (props) {
    super(props);

    // setup forensics logger
    recordComponentEvent = createRecorder(`session.Opentok.Session.`, {sessionID: this.props.session.id});
    recordComponentEvent('constructor');

    this.state = {
      unmounting: false,
      mounted: true,

      // local UI settings
      display: {
        primaryFeed: 'subscriber' // publisher | subscriber
      },

      // config to pass to the tokbox subscriber for each available stream
      streamProperties: {},
      
      // signal to send to other participant
      signal: {type: "", data: ""}
    };

    this.originalSessionID = props.session.id;
    this.endedByRemote = false;

    this.remoteUserState = newUserState();
    this.remoteUserState.legacyVersion = true;
    // this.remoteUserStates = []; // one day...

    this.localUserState = newUserState();
    this.localUserState.legacyVersion = false;

    // heartbeats to check for remote connection loss
    this.sendingHeartbeat = false;
    this.sendHeartbeatIntervalID = null;
    this.receivingHeartbeat = false;
    this.receiveHeartbeatIntervalID = null;

    this.connected = false;
    this.unmounting = false;

    // sort of a hack for https://github.com/opentok/opentok-react-native/issues/271    
    this.disableListeners = false;

    // handler invoked by tokbox: https://github.com/opentok/opentok-react-native/blob/master/docs/OTSession.md#events
    this.eventHandlers = {
      sessionConnected: () => { this.onSessionConnected(); },
      sessionReconnected: () => { this.onSessionReconnected(); },
      sessionDisconnected: () => { this.onSessionDisconnected(); },
      sessionReconnecting: () => { this.onSessionReconnecting(); },
      connectionCreated: (event) => { this.onConnectionCreated(event); },
      connectionDestroyed: (event) => { this.onConnectionDestroyed(event); },
      streamCreated: (event) => { this.onStreamCreated(event); },
      streamPropertyChanged: (event) => { this.onStreamPropertyChanged(event); },
      streamDestroyed: (event) => { this.onStreamDestroyed(event); },
      signal: (event) => { this.onSignal(event); },
      archiveStarted: (event) => {},
      archiveStopped: (event) => {},
      error: (event) => { this.onError(event); },
      otrnError: (e) => { this.onOtrnError(e); }
    };
  }

  setState (data, cb = null) {
    if (this.unmounting) {
      return;
    }
    super.setState(data, cb);
  }

  mounted () {
    return (!this.unmounting
      && this.props.localUserState.device.hasNetworkConnection
      && !this.state.unmounting
      && this.state.mounted);
  }

  componentWillUnmount () {
    recordComponentEvent('componentWillUnmount');
    this.cleanup();
  }

  // check prop state for changes that should be signaled to other participants
  componentDidUpdate (prevProps) {
    if (this.disableListeners) {
      return;
    }

    const oldP = prevProps;
    const newP = this.props;

    if (this.unmounting) {
      return;
    }

    // handle edge case where new session could have been created
    if (newP.session.id != this.originalSessionID) {
      this.unmounting = true;
      return;
    }

    // are we ending?
    if (!oldP.ending && newP.ending) {
      if (this.endedByRemote) {
        return;
      }
      this.sendSignal(SIGNALS.ENDING, {reason: newP.endReason});
      return;
    }

    const oldS = oldP.localUserState.device;
    const newS = newP.localUserState.device;
    if (oldS.appState != newS.appState) {
      this.sendSignal(SIGNALS.APP_STATE, {appState: newS.appState});
    }
    if (oldS.networkConnection != newS.networkConnection) {
      this.sendSignal(SIGNALS.NETWORK_STATE, {type: newS.networkConnection});
    }

    const oldC = oldP.localUserState.controls;
    const newC = newP.localUserState.controls;
    if (
      oldC.micEnabled != newC.micEnabled ||
      oldC.videoEnabled != newC.videoEnabled ||
      oldC.speakerEnabled != newC.speakerEnabled ||
      oldC.cameraFlipEnabled != newC.cameraFlipEnabled
    ) {
      this.sendSignal(SIGNALS.CONTROL_STATE, newC);

      // iOS currently does not fire `streamPropertyChanged`, so we have to assumep
      // our stream sending state matches our publishing state
      // https://github.com/opentok/opentok-react-native/issues/269
      if (Platform.OS == "ios" && this.localUserState.publishing) {
        this.handlePublishingAV({
          audio: newC.micEnabled,
          video: newC.videoEnabled || newC.cameraFlipEnabled
        });
      }
    }
  }

  onSessionConnected () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.sessionConnected', {
      sessionID: this.props.session.id
    });
    const initiallyConnected = this.props.localUserState.connection.initiallyConnected;
    this.connected = true;
    this.props.onUserConnected();

    // TODO: if previously connected and the session had begin, reset the timer
    if (initiallyConnected) {
      this.sendSignal(SIGNALS.TIMER_RESET, {elapsed: this.props.getElapsedTime()});
    }
  }

  onSessionReconnected () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.sessionReconnected', {
      sessionID: this.props.session.id
    });
    this.connected = true;
    this.props.onUserConnected();

    this.sendSignal(SIGNALS.TIMER_RESET, {elapsed: this.props.getElapsedTime()});
  }

  onSessionDisconnected () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.sessionDisconnected', {
      sessionID: this.props.session.id
    });
    this.connected = false;
    this.props.onUserDisconnected();
  }

  onSessionReconnecting () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.sessionReconnecting', {
      sessionID: this.props.session.id
    });
    this.connected = false;
    this.props.onUserConnecting();
  }

  // handles connection state for the remote user
  onConnectionCreated (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.connectionCreated', {
      event,
      sessionID: this.props.session.id
    });

    // a remote user is connecting
    this.remoteUserState.connectionID = event.connectionId;
    this.remoteUserState.meta = JSON.parse(event.data);
    this.props.onRemoteUserConnecting();

    // update the remote user about our local state
    const {localUserState} = this.props;
    this.sendSignal(SIGNALS.NOT_LEGACY_VERSION);    
    this.sendSignal(SIGNALS.APP_STATE, {state: localUserState.device.appState});
    this.sendSignal(SIGNALS.NETWORK_STATE, {type: localUserState.device.networkConnection});
    this.sendSignal(SIGNALS.CONTROL_STATE, localUserState.controls);
  }

  onConnectionDestroyed (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.connectionDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    // if we're unmounting return early because informing the system that the remote
    // has disconnected will trigger a reconnection state. But, if we're in the process
    // of ending the sessino we expect the remote user to disconnect.
    if (this.unmounting) {
      return;
    }

    // WARNING! In the case of a user losing and regaining connection, multiple connections may be created and destroyed.
    // The user's state will reflect the most recently created connection  - which is the only one we care
    // about.  Therefore, if this gets triggered, we must make sure that the particular connection being destroyed
    // is actually the most recently created one for the remote user.
    if (event.connectionId != this.remoteUserState.connectionID) {
      return;
    }

    this.remoteUserState = newUserState();
    this.props.onRemoteUserDisconnected();
  }


  // the remote user has published a stream
  onStreamCreated (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.streamCreated', {
      event,
      sessionID: this.props.session.id
    });

    // we're calling this on purpose, because it is possible that a remote user's stream
    // could be destroyed and recreated WITHOUT their connection being destroyed and created.
    // if this has already triggered, then it should be the same as a no-op
    this.props.onRemoteUserConnected();

    // TODO: for 3-way calls, ensure stream info associated to proper connection
    this.remoteUserState = {
      ...this.remoteUserState,
      streamID: event.streamId,
      publishing: true,
    };
    // update stream property state, then notify system of
    // remote connection
    this.setState({streamProperties: {
      ...this.state.streamProperties,
      [event.streamId]: {
        subscribeToAudio: true,
        subscribeToVideo: true,
        style: {
          ...styles.subscriber
        }
    }}});

    this.handleReceivingAV(event.hasAudio, event.hasVideo);
    this.notifyIfReceiving(event.hasAudio, event.hasVideo);
  }

  // update sending/receiving status based on actual stream
  // properties.  Note that this event can fire for streams
  // created by the local or remote user
  onStreamPropertyChanged (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.streamPropertyChanged', {
      event,
      sessionID: this.props.session.id
    });

    // determine if stream has audio and video
    let hasAudio = null;
    let hasVideo = null;
    switch (event.changedProperty) {
      case "hasAudio": {
        hasAudio = event.newValue;
        hasVideo = this.props.localUserState.connection.receivingVideo;
        break;
      }
      case "hasVideo": {
        hasAudio = this.props.localUserState.connection.receivingAudio;
        hasVideo = event.newValue;
        break;
      }
    }

    if (event.stream.streamId == this.localUserState.streamID) {
      this.handlePublishingAV(hasAudio, hasVideo);
    } else if (event.stream.streamId == this.remoteUserState.streamID) {
      this.handleReceivingAV(hasAudio, hasVideo);
    }
  }

  // NOTE: at the moment we are making a fundamental assumption that one user has one stream, and
  // in some cases that is not technically accurate.  For now, it should still work because
  // they should only have one stream.
  onStreamDestroyed (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.streamDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    // if we're unmounting return early because informing the system that the remote
    // has disconnected will trigger a reconnection state. But, if we're in the process
    // of ending the sessino we expect the remote user to disconnect.
    if (this.unmounting) {
      return;
    }

    // WARNING! In the case of a user losing and regaining connection, multiple streams may be created and destroyed.
    // The user's state will reflect the most recently created connection and stream - which is the only one we care
    // about.  Therefore, if this gets triggered, we must make sure that the particular stream being destroyed
    // is actually the most recently created one for the remote user.
    if (event.streamId != this.remoteUserState.streamID) {
      return;
    }
    
    this.remoteUserState = {
      ...this.remoteUserState,
      streamID: null,
      publishing: false,
    };

    // TODO: this may not be accurate... may need to remove old stream properties anyway
    // stop tracking stream internally
    if (!!this.state.streamProperties[event.streamId]) {
      let s = this.state.streamProperties;
      delete s[event.streamId];
      this.setState({streamProperties: s});
    }

    this.handleReceivingAV(false, false);

    // even though the user may still technically be connected, we call this anyway, because if
    // we have no stream from them, they may as well be disconnected from the local users' standpoint.
    this.props.onRemoteUserDisconnected();
  }

  onSignal (event) {
    if (this.disableListeners) {
      return;
    }
    // ensure signal is from remote participant we actually know about
    if (event.connectionId != this.remoteUserState.connectionID) {
      return;
    }
    recordSessionOpentokEvent('session.signal', {
      event,
      sessionID: this.props.session.id
    });

    // decode the event data, which will usually be json
    let data = null;
    if (!!event.data && event.data != "") {
      try {
        // it's probably json
        data = JSON.parse(event.data);
      } catch (e) {
        // but if that didn't work, maybe it's just a string
        data = event.data;
      }
    }

    this.receiveSignal(event.type, data);
  }

  onError (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.error', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onError();
  }

  onOtrnError (e) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('session.otrnError', {
      error: e,
      sessionID: this.props.session.id
    });
  }

  beginSendingHeartbeat () {

  }

  stopSendingHeartbeat () {

  }

  beginExpectingHeartbeat () {

  }

  stopExpectingHeartbeat () {

  }

  handleSendHeartbeatInterval () {

  }

  handleExpectHeartbeatInterval () {

  }

  // this is about handling our actual publishing AV status as best as we
  // can tell from the tokbox signals
  handlePublishingAV(audio, video) {
    this.localUserState.publishingAudio = audio;
    this.localUserState.publishingVideo = video;

    // update our sending state
    this.props.onUserSendingAV({audio, video});

    // TODO: if our actual stream state does not match our control state, then there's a problem
    // to diagnose
    // TODO: forensic event for this

    // if the remote user is connected has a legacy version, we must assume they are subscribing
    // if we are publishing
    if (!!this.remoteUserState.connectionID && this.remoteUserState.legacyVersion) {
      this.remoteUserState.subscribing = true;
    }

    // if remote user is subscribing, and has a legacy version, we must assume they are receiving
    // what we are sending
    if (this.remoteUserState.legacyVersion && this.remoteUserState.subscribing) {
      this.props.onRemoteUserReceivingAV({audio, video});
    }
  }

  // handle the actual receiving state of audio and video
  // from the remote user - NOTE that this does not mean we have
  // fully subscribed - it means that we know there is a stream
  // from the other side
  handleReceivingAV(audio, video) {
    this.remoteUserState.publishingAudio = audio;
    this.remoteUserState.publishingVideo = video;

    this.props.onRemoteUserSendingAV({audio, video});

    // we may know about received AV from the remote side before
    // our local subscriber has actually set up
    if (this.localUserState.subscribing) {
      this.props.onUserReceivingAV({audio, video});
      this.sendSignal(SIGNALS.AV_STATUS, {audio, video});
    }

    // if the remote user has a legacy version, we have to assume their sending
    // control state matches what we are receiving.
    if (this.remoteUserState.legacyVersion) {
      
      // we won't be able to tell if we have video because it's enabled for the front vs back
      // camera... that requires an actual signal from a modern version about the
      // local control state
      this.props.onRemoteUserControlStateChanged({micEnabled: audio, videoEnabled: video});
    }
  }

  // the OTPublisher has been set up at this point, and we are actually
  // sending AV from our side
  publisherStreamCreated (ops) {
    if (this.disableListeners) {
      return;
    }
    this.localUserState = {
      ...this.localUserState,
      connectionID: ops.connectionId,
      streamID: ops.streamId,
      publishing: true,
    };

    this.handlePublishingAV(ops.hasAudio, ops.hasVideo);
  }

  // our published stream has stopped being sent, which means we can make
  // some assumptions about our local and remote user states.
  publisherStreamDestroyed () {
    if (this.disableListeners) {
      return;
    }
    this.localUserState = {
      ...this.localUserState,
      streamID: null,
      publishing: false,
    };
    this.handlePublishingAV(false, false);
  }

  // we are INITIALLY receiving AV, meaning the subscriber has actually been setup
  subscriberReceiving () {
    if (this.disableListeners) {
      return;
    }
    this.localUserState.subscribing = true;
    if (this.remoteUserState.publishing) {
      this.handleReceivingAV(this.remoteUserState.publishingAudio, this.remoteUserState.publishingVideo)
    }
    this.notifyIfReceiving(this.remoteUserState.publishingAudio, this.remoteUserState.publishingVideo);
  }

  subscriberVideoEnabled (event) {
    if (this.disableListeners) {
      return;
    }

    // this event can fire even if we're not actually receiving video, because of
    // local subscriber settings
    //
    // see: https://tokbox.com/developer/sdks/js/reference/Subscriber.html#event:videoEnabled
    if ("subscribeToVideo" == event.reason) {
      return;
    }

    this.remoteUserState.publishingVideo = true;
    // TODO: remove local throttle?
    this.props.onRemoteUserVideoEnabled();
  }

  subscriberVideoDisabled (event) {
    if (this.disableListeners) {
      return;
    }

    // this event can fire even if we're not actually receiving video, because of
    // local subscriber settings
    //
    // see: https://tokbox.com/developer/sdks/js/reference/Subscriber.html#event:videoDisabled
    if ("subscribeToVideo" == event.reason) {
      return;
    }

    this.remoteUserState.publishingVideo = false;
    this.props.onRemoteUserVideoDisabled();
  }

  subscriberVideoThrottled () {
    if (this.disableListeners) {
      return;
    }
    if (this.localUserState.legacyVersion) {
      this.sendSignal(SIGNALS.LEGACY_VIDEO_THROTTLED, VIDEO_WARNING.ENABLED);
    } else {
      this.sendSignal(SIGNALS.VIDEO_THROTTLE);
    }
    this.sendSignal(SIGNALS.VIDEO_THROTTLE);
    this.props.onUserReceivingAVThrottled();
  }

  subscriberVideoUnthrottled () {
    if (this.disableListeners) {
      return;
    }
    if (this.remoteUserState.legacyVersion) {
      this.sendSignal(SIGNALS.LEGACY_VIDEO_THROTTLED, VIDEO_WARNING.DISABLED);
    } else {
      this.sendSignal(SIGNALS.VIDEO_THROTTLE_LIFTED);
    }
    
    this.props.onUserReceivingAVUnthrottled();
  }

  notifyIfReceiving (audio, video) {
    if (this.localUserState.subscribing && this.remoteUserState.publishing) {
      this.sendSignal(SIGNALS.RECEIVING_AV, {audio, video});
    }
  }

  handleCallEnded (reason) {
    this.endedByRemote = true;
    this.cleanup(() => {
      this.props.onSessionEnded(reason);
    });
  }

  cleanup (cb = null) {
    this.disableListeners = true;
    recordComponentEvent('cleanup');
    this.setState({unmounting: true, mounted: false}, () => {
      this.unmounting = true;
      if (!!cb) {
        cb();
      }
    });
  }

  sendSignal (type, payload = null) {
    if (this.disableListeners) {
      return;
    }

    // make sure we have actually connected, and are not in the process
    // of ending the session
    if (
      this.state.unmounting
      || !this.connected
      || !this.props.localUserState.device.hasNetworkConnection
    ) {
      return;
    }
    
    recordComponentEvent("sendSignal", {type, payload});
    let data = "";
    if (!!payload) {
      data = JSON.stringify(payload);
    }
    this.setState({signal: {type, data}});
  }

  receiveSignal (name, payload = null) {
    if (this.state.unmounting) {
      return;
    }

    switch (name) {
      // legacy signals
      case SIGNALS.LEGACY_VIDEO_THROTTLED: {
        switch (payload) {
          case VIDEO_WARNING.ENABLED: {
            this.props.onRemoteUserReceivingAVThrottled();
            break;
          }
          case VIDEO_WARNING.DISABLED: {
            this.props.onRemoteUserReceivingAVUnthrottled();
            break;
          }
        }
        break;
      }

      // new signals
      case SIGNALS.NOT_LEGACY_VERSION: {
        this.remoteUserState.legacyVersion = false;
        // this.beginExpectingHeartbeat();
        // this.beginSendingHeartbeat();
        break;
      }
      case SIGNALS.ENDING: {
        this.handleCallEnded(payload.reason);
        break;
      }
      case SIGNALS.CONTROL_STATE: {
        this.props.onRemoteUserControlStateChanged(payload);  
        break;
      }
      case SIGNALS.APP_STATE: {
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          device: {
            ...this.props.remoteUserState.device,
            appState: payload.state,
          }
        });
        break;
      }
      case SIGNALS.NETWORK_STATE: {
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          device: {
            ...this.props.remoteUserState.device,
            networkConnection: payload.type,
            hasHetworkConnection: "none" !== payload.type,
          }
        });
        break;
      }
      case SIGNALS.RECEIVING_AV: {
        // prevent case where iOS was receiving this signal without
        // a payload - but it's not clear how that could happen
        // https://github.com/globalprofessionalsearch/solo-mobile-app/issues/1946
        if (!!payload) {
          this.remoteUserState.subscribing = true;
          this.props.onRemoteUserReceivingAV({
            audio: payload.audio,
            video: payload.video,
          });  
        }
        break;
      }
      case SIGNALS.AV_STATUS: {
        if (!!payload && this.remoteUserState.subscribing) {
          this.props.onRemoteUserReceivingAV({
            audio: payload.audio,
            video: payload.video
          });  
        }
        break;
      }
      case SIGNALS.VIDEO_THROTTLE: {
        this.props.onRemoteUserReceivingAVThrottled();
        break;
      }
      case SIGNALS.VIDEO_THROTTLE_LIFTED: {
        this.props.onRemoteUserReceivingAVUnthrottled();
        break;
      }
      case SIGNALS.HEARTBEAT: {
        this.remoteUserState.lastHeartbeatAt = new Date();
        break;
      }
      case SIGNALS.TIMER_RESET: {
        this.props.onTimerReset(payload.elapsed, 'remote');
        break;
      }
    }
  }

  isTransitioning () {
    const {localSessionStatus} = this.props;
    return (
      localSessionStatus.creating ||
      localSessionStatus.ended
    );
  }

  // remount () {
  //   recordComponentEvent('remount');
  //   this.setState({mounted: false}, () => {
  //     setTimeout(() => {
  //       if (this.state.unmounting) {
  //         return;
  //       }
  //       this.setState({mounted: true});
  //     }, 1000);
  //   });
  // }

  render () {
    const {session, credentials, localSessionStatus, localUserState, remoteUserState} = this.props;

    return (
      <View style={styles.sessionContainer}>
        {this.mounted() && !this.isTransitioning() && (
          <OTSession 
            style = {styles.session}
            apiKey = {TOKBOX_APIKEY}
            sessionId = {credentials.tokboxSessionID}
            token = {credentials.tokboxSessionToken}
            eventHandlers = { this.eventHandlers }
            signal = { this.state.signal }
            options = {{useTextureViews: true}}
          >
            <Subscriber
              session = {session}
              status = {localSessionStatus}
              localUserState = {localUserState}
              remoteUserState = {remoteUserState}
              streamProperties = { this.state.streamProperties }
              onReceiving = {() => { this.subscriberReceiving() }}
              onVideoDisabled = {(event) => { this.subscriberVideoDisabled(event) }}
              onVideoEnabled = {(event) => { this.subscriberVideoEnabled(event) }}
              onVideoDisableWarning = {() => { this.subscriberVideoThrottled() }}
              onVideoDisableWarningLifted = {() => { this.subscriberVideoUnthrottled() }}
              onError = {(event) => { this.props.onError() }}
            />

            { this.props.audioModeBackground }

            <Publisher
              session = {session}
              status = {localSessionStatus}
              localUserState = {localUserState}
              remoteUserState = {remoteUserState}
              onStreamCreated = {(event) => { this.publisherStreamCreated(event) }}
              onStreamDestroyed = {(event) => { this.publisherStreamDestroyed(event) }}
              onError = {(event) => { this.props.onError() }}
            />
          </OTSession>
        )}

        {/* other session UI renders after the session video background */}
        { this.props.children }


        {/* NOTE: not possible to implement yet: https://github.com/opentok/opentok-react-native/issues/162 */}
        {/* <View style={ styles.primaryFeedToggle }></View> */}

      </View>
    );
  }
}
