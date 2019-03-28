import React, {Component} from "react";
import {Text, View} from "react-native";
import {Publisher} from "./Publisher";
import {Subscriber} from "./Subscriber";
import styles from "./styles";

import { OTSession } from 'opentok-react-native';

import {TOKBOX_APIKEY} from  "../../../../Config/env";

import { recordSessionTokboxEvent, recordSessionEvent } from "../../../../Util/Forensics";

// custom app signals sent/received via tokbox connection
const SIGNALS = {
  ENDING: 'ending', // signal that other side is ending the call
  NOT_LEGACY_VERSION: 'notLegacyVersion', // signal that other side has a modern version of the app
  APP_STATE: 'appState', // signal about other sides app state (background/active, etc)
  NETWORK_STATE: 'networkConnection', // signal about other sides connection type (wifi/cell)
  CONTROL_STATE: 'controls', // signal for other sides call control state (video/mute/speaker/cameraFlip)
  VIDEO_THROTTLE: 'videoThrottle', // signal if other sides video receiving has been throttled by tokbox
  VIDEO_THROTTLE_LIFTED: 'videoThrottleLifted', // signal if other side's video has stopped being throttled
  LEGACY_VIDEO_THROTTLED: 'WARNING', // legacy signal if other sides video receiving has been throttled by tokbox
  RECEIVING_AV: 'receivingAV', // signal from other side they are initially receiving audio/video from this side
  HEARTBEAT: 'heartbeat', // periodic heartbeat from other side to prove connection is still active
};

const newUserState = () => {
  return {
    connectionID: null,
    streamID: null,
    meta: null,
    legacyVersion: true,
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

export class Session extends Component {
  constructor (props) {
    super(props);

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

    this.unmounting = false;

    // handler invoked by tokbox: https://github.com/opentok/opentok-react-native/blob/master/docs/OTSession.md#events
    this.eventHandlers = {
      sessionConnected: () => { this.onSessionConnected(); },
      sessionReconnected: () => { this.onSessionReconnected(); },
      sessionDisconnected: () => { this.onSessionDisconnected(); },
      sessionReconnecting: () => { this.onSessionReconnecting(); },
      connectionCreated: (event) => { this.onConnectionCreated(event); },
      connectionDestroyed: (event) => { this.onConnectionDestroyed(event); },
      streamCreated: (event) => { this.onStreamCreated(event); },
      streamDestroyed: (event) => { this.onStreamDestroyed(event); },
      signal: (event) => { this.onSignal(event); },
      archiveStarted: (event) => {},
      archiveStopped: (event) => {},
      error: (event) => { this.onError(event); },
    };

    recordSessionEvent("session.constructor");
  }

  setState (data, cb = null) {
    if (this.unmounting) {
      return;
    }
    super.setState(data, cb);
  }

  mounted () {
    return !this.unmounting
      && this.props.localUserState.app.networkConnection != "none"
      && !this.state.unmounting
      && this.state.mounted
  }

  componentDidMount () {
    // app state listener
    // netinfo listener
  }

  componentWillUnmount () {
    recordSessionEvent("session.componentWillUnmount");
    this.cleanup();
  }

  // check prop state for changes that should be signaled to other participants
  componentDidUpdate (prevProps) {
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
    if (!oldP.localSessionStatus.ending && newP.localSessionStatus.ending) {
      if (this.endedByRemote) {
        return;
      }
      this.sendSignal(SIGNALS.ENDING);
    }

    const oldS = oldP.localUserState.app;
    const newS = newP.localUserState.app;
    if (oldS.state != newS.state) {
      this.sendSignal(SIGNALS.APP_STATE, {state: newS.state});
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
      this.localUserState.publishingAudio = newC.micEnabled;
      this.localUserState.publishingVideo = newC.videoEnabled;
      this.sendSignal(SIGNALS.CONTROL_STATE, newC);
    }
  }

  onSessionConnected () {
    recordSessionTokboxEvent('session.sessionConnected', {
      sessionID: this.props.session.id
    });
    this.props.onUserConnected();
}

  onSessionReconnected () {
    recordSessionTokboxEvent('session.sessionReconnected', {
      sessionID: this.props.session.id
    });
    this.props.onUserConnected();
  }

  onSessionDisconnected () {
    recordSessionTokboxEvent('session.sessionDisconnected', {
      sessionID: this.props.session.id
    });
    this.props.onUserDisconnected();
  }

  onSessionReconnecting () {
    recordSessionTokboxEvent('session.sessionReconnecting', {
      sessionID: this.props.session.id
    });
    this.props.onUserConnecting();
  }

  // handles connection state for the remote user
  onConnectionCreated (event) {
    recordSessionTokboxEvent('session.connectionCreated', {
      event,
      sessionID: this.props.session.id
    });

    // a remote user is connecting
    this.remoteUserState.connectionID = event.connectionId;
    this.remoteUserState.meta = JSON.parse(event.data);
    this.props.onRemoteUserConnecting();
    this.sendSignal(SIGNALS.NOT_LEGACY_VERSION);

    
    // TODO: test sending back-to-back signals

    // TODO: send local state (controls, app state, etc...)

  }

  onConnectionDestroyed (event) {
    recordSessionTokboxEvent('session.connectionDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    // if we're unmounting return early because informing the system that the remote
    // has disconnected will trigger a reconnection state. But, if we're in the process
    // of ending the sessino we expect the remote user to disconnect.
    if (this.unmounting) {
      return;
    }

    this.remoteUserState = newUserState();
    this.props.onRemoteUserDisconnected();
  }

  onStreamCreated (event) {
    recordSessionTokboxEvent('session.streamCreated', {
      event,
      sessionID: this.props.session.id
    });

    // TODO: for 3-way calls, ensure stream info associated to proper connection
    this.remoteUserState = {
      ...this.remoteUserState,
      streamID: event.streamId,
      publishing: true,
      publishingAudio: event.hasAudio,
      publishingVideo: event.hasVideo,
    };

    this.props.onRemoteUserConnected();
    const ops = {
      audio: event.hasAudio,
      video: event.hasVideo
    }
    this.props.onRemoteUserSendingAV(ops);
    if (this.localUserState.subscribing) {
      this.props.onUserReceivingAV(ops);
      this.notifyIfReceiving();
    }

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
  }

  onStreamDestroyed (event) {
    recordSessionTokboxEvent('session.streamDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    // if we're unmounting return early because informing the system that the remote
    // has disconnected will trigger a reconnection state. But, if we're in the process
    // of ending the sessino we expect the remote user to disconnect.
    if (this.unmounting) {
      return;
    }
    
    this.remoteUserState = {
      ...this.remoteUserState,
      streamID: null,
      publishing: false,
      publishingAudio: false,
      publishingVideo: false,
    };

    // stop tracking stream internally
    if (!!this.state.streamProperties[event.streamId]) {
      let s = this.state.streamProperties;
      delete s[event.streamId];
      this.setState({streamProperties: s});
    }

    this.props.onRemoteUserDisconnected();
  }

  onSignal (event) {
    // ensure signal is from remote participant we actually know about
    if (event.connectionId != this.remoteUserState.connectionID) {
      return;
    }
    recordSessionTokboxEvent('session.signal', {
      event,
      sessionID: this.props.session.id
    });

    let data = null;
    if (!!event.data && event.data != "") {
      data = JSON.parse(event.data);
    }

    this.receiveSignal(event.type, data);
  }

  onError (event) {
    recordSessionTokboxEvent('session.error', {
      event,
      sessionID: this.props.session.id
    });
    this.remount();
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


  publisherStreamCreated (ops) {
    this.localUserState = {
      ...this.localUserState,
      connectionID: ops.connectionId,
      streamID: ops.streamId,
      publishing: true,
      publishingAudio: ops.hasAudio,
      publishingVideo: ops.hasVideo,
    };
    this.props.onUserSendingAV({
      audio: ops.hasAudio,
      video: ops.hasVideo,
    });

    // if the remote user has a legacy version, we have to assume they are receiving
    // what we are publishing.  Otherwise, we wait to receive a signal from the
    // other side that they are in successfully subscribed
    if (this.remoteUserState.legacyVersion) {
      this.props.onRemoteUserReceivingAV({
        audio: ops.hasAudio,
        video: ops.hasVideo,
      });
    }
  }

  publisherStreamDestroyed () {
    this.localUserState = {
      ...this.localUserState,
      streamID: null,
      publishing: false,
      publishingAudio: false,
      publishingVideo: false,
    };
  }

  subscriberReceiving () {
    this.localUserState.subscribing = true;
    if (this.remoteUserState.publishing) {
      this.props.onUserReceivingAV({
        audio: this.remoteUserState.publishingAudio,
        video: this.remoteUserState.publishingVideo,
      });
    }

    this.notifyIfReceiving();
  }

  subscriberVideoEnabled (event) {
    this.remoteUserState.publishingVideo = true;
    this.props.onRemoteUserVideoEnabled();
  }

  subscriberVideoDisabled (event) {
    this.remoteUserState.publishingVideo = false;
    this.props.onRemoteUserVideoDisabled();
  }

  subscriberVideoThrottled () {
    this.sendSignal(SIGNALS.VIDEO_THROTTLE);
    this.props.onUserReceivingAVThrottled();
  }

  subscriberVideoUnthrottled () {
    this.sendSignal(SIGNALS.VIDEO_THROTTLE_LIFTED);
    this.props.onUserReceivingAVUnthrottled();
  }

  notifyIfReceiving () {
    if (this.localUserState.subscribing && this.remoteUserState.publishing) {
      this.sendSignal(SIGNALS.RECEIVING_AV);
    }
  }

  handleCallEnded () {
    this.endedByRemote = true;
    this.cleanup(() => {
      console.log("session.props.onSessionEnded()");
      this.props.onSessionEnded();
    });
  }

  cleanup (cb = null) {
    console.log("session.cleanup");
    this.setState({unmounting: true, mounted: false}, () => {
      this.unmounting = true;
      if (!!cb) {
        cb();
      }
    });
  }

  sendSignal (type, payload = null) {
    if (this.state.unmounting) {
      return;
    }
    
    recordSessionEvent("session.sendSignal", {type, payload});
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
        break;
      }

      // new signals
      case SIGNALS.NOT_LEGACY_VERSION: {
        this.remoteUserState.legacyVersion = false;
        // this.beginExpectingHeartbeat();
        break;
      }
      case SIGNALS.ENDING: {
        this.handleCallEnded();
        break;
      }
      case SIGNALS.CONTROL_STATE: {
        this.remoteUserState.publishingAudio = payload.micEnabled;
        this.remoteUserState.publishingVideo = payload.videoEnabled;
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          controls: payload,
          connection: {
            ...this.props.remoteUserState.connection,
            sendingAudio: payload.micEnabled,
            sendingVideo: payload.videoEnabled
          }
        });
        break;
      }
      case SIGNALS.APP_STATE: {
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          app: {
            ...this.props.remoteUserState.app,
            state: payload.state,
          }
        });
        break;
      }
      case SIGNALS.NETWORK_STATE: {
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          app: {
            ...this.props.remoteUserState.app,
            networkConnection: payload.type,
            hasHetworkConnection: "none" != payload.type,
          }
        });
        break;
      }
      case SIGNALS.RECEIVING_AV: {
        this.remoteUserState.subscribing = true;
        this.props.onRemoteUserReceivingAV({
          audio: this.localUserState.publishingAudio,
          video: this.localUserState.publishingVideo,
        });
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
    }
  }

  isTransitioning () {
    const {localSessionStatus} = this.props;
    return (
      localSessionStatus.creating ||
      localSessionStatus.ended
    );
  }

  remount () {
    this.setState({mounted: false}, () => {
      setTimeout(() => {
        if (this.state.unmounting) {
          return;
        }
        this.setState({mounted: true});
      }, 500);
    });
  }

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
          >
            <Publisher
              session = {session}
              status = {localSessionStatus}
              localUserState = {localUserState}
              remoteUserState = {remoteUserState}
              onStreamCreated = {(event) => { this.publisherStreamCreated(event) }}
              onStreamDestroyed = {(event) => { this.publisherStreamDestroyed(event) }}
              onError = {(event) => { this.remount() }}
            />
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
              onError = {(event) => { this.remount() }}
            />

            {/* NOTE: not possible to implement yet: https://github.com/opentok/opentok-react-native/issues/162 */}
            {/* <View style={ styles.primaryFeedToggle }></View> */}

          </OTSession>
        )}
        { this.props.children }
      </View>
    );
  }
}
