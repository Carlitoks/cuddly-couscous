import React, {Component} from "react";
import {Text, View} from "react-native";
import {Publisher} from "./Publisher";
import {Subscriber} from "./Subscriber";
import styles from "./styles";

import { OTSession } from 'opentok-react-native';

import {TOKBOX_APIKEY} from  "../../../../Config/env";

import { recordSessionTokboxEvent, recordSessionEvent } from "../../../../Util/Forensics";

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
      streamProperties: {},
      signal: {type: "", data: ""}
    };

    this.endedByRemote = false;

    this.remoteUserState = newUserState();
    this.remoteUserState.legacyVersion = true;

    // this.remoteUserStates = []; // one day...

    this.localUserState = newUserState();
    this.remoteUserState.legacyVersion = false;

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

  componentDidMount () {
    // app state listener
    // netinfo listener
  }

  componentWillUnmount () {
    recordSessionEvent("session.componentWillUnmount");
    this.cleanup();
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
    this.sendSignal("notLegacyVersion");
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

    this.remoteUserState = newRemoteUserState();
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
      connectionID: null,
      publishing: false,
      publishingAudio: false,
      publishingVideo: false,
    };

    // TODO: props.onUserStoppedSendingAV()?
  }

  subscriberReceiving () {
    this.localUserState.subscribing = true;
    if (this.remoteUserState.publishing) {
      this.props.onUserReceivingAV({
        audio: this.remoteUserState.publishingAudio,
        video: this.remoteUserState.publishingVideo,
      });
    }

    this.notifyIfReceiving()
  }

  notifyIfReceiving () {
    if (this.localUserState.subscribing && this.remoteUserState.publishing) {
      this.sendSignal('receivingAV');
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

  // check prop state for changes that should be signaled to other participants
  componentDidUpdate (prevProps) {
    const oldP = prevProps;
    const newP = this.props;

    // TODO: HANDLE SESSIN ID CHANGE - IF NEW SESSION GETS CREATED BY 
    // CLIENT, THERE'S A BRIEF PERIOD WHERE STATE GETS WEIRD.

    // are we ending?
    if (!oldP.localSessionStatus.ending && newP.localSessionStatus.ending) {
      if (this.endedByRemote) {
        return;
      }
      this.sendSignal("ending");
    }

    if (oldP.localAppState.state != newP.localAppState.state) {
      this.sendSignal("appState", {state: newP.localAppState.state});
    }
    if (oldP.localAppState.networkConnection != newP.localAppState.networkConnection) {
      this.sendSignal("networkConnection", {type: newP.localAppState.networkConnection});
    }

    const oldC = oldP.localControlState;
    const newC = newP.localControlState;
    if (
      oldC.micEnabled != newC.micEnabled ||
      oldC.videoEnabled != newC.videoEnabled ||
      oldC.speakerEnabled != newC.speakerEnabled ||
      oldC.cameraFlipEnabled != newC.cameraFlipEnabled
    ) {
      this.sendSignal("controls", newC);
    }
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
      case 'VIDEO_WARN': {
        break;
      }

      // new signals
      case 'notLegacyVersion': {
        this.remoteUserState.legacyVersion = false;
        // this.beginExpectingHeartbeat();
        break;
      }
      case 'ending': {
        this.handleCallEnded();
        break;
      }
      case 'controls': {
        this.props.onRemoteUserUpdated({
          ...this.props.remoteUserState,
          controls: payload
        });
        break;
      }
      case 'appState': {

        break;
      }
      case 'networkConnection': {

        break;
      }
      case 'receivingAV': {
        this.remoteUserState.subscribing = true;
        this.props.onRemoteUserReceivingAV({
          audio: this.localUserState.publishingAudio,
          video: this.localUserState.publishingVideo,
        });
        break;
      }
      case 'heartbeat': {
        this.remoteUserState.lastHeartbeatAt = new Date();
        break;
      }
    }
  }

  _handleAppStateChange () {

  }

  _handleNetInfoChange () {

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
    const {session, credentials, localSessionStatus} = this.props;
    const {mounted} = this.state;

    return (
      <View style={styles.sessionContainer}>
        {mounted && !this.isTransitioning() && (
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
              onStreamCreated = {(event) => { this.publisherStreamCreated(event) }}
              onStreamDestroyed = {(event) => { this.publisherStreamDestroyed(event) }}
              onError = {(event) => { this.remount() }}
            />
            <Subscriber
              session = {session}
              status = {localSessionStatus}
              streamProperties = { this.state.streamProperties }
              onReceiving = {() => { this.subscriberReceiving() }}
              onError = {(event) => { this.remount() }}
            />
          </OTSession>
        )}
        { this.props.children }
      </View>
    );
  }
}
