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

    this.eventHandlers = {

      // handles connection state for the local user
      sessionConnected: () => {
        recordSessionTokboxEvent('session.sessionConnected', {
          sessionID: this.props.session.id
        });
        this.props.onUserConnected();
      },
      sessionReconnected: () => {
        recordSessionTokboxEvent('session.sessionReconnected', {
          sessionID: this.props.session.id
        });
        this.props.onUserConnected();
      },
      sessionDisconnected: () => {
        recordSessionTokboxEvent('session.sessionDisconnected', {
          sessionID: this.props.session.id
        });
        this.props.onUserDisconnected();
      },
      sessionReconnecting: () => {
        recordSessionTokboxEvent('session.sessionReconnecting', {
          sessionID: this.props.session.id
        });
        this.props.onUserConnecting();
      },

      // handles connection state for the remote user
      connectionCreated: (event) => {
        recordSessionTokboxEvent('session.connectionCreated', {
          event,
          sessionID: this.props.session.id
        });

        // a remote user is connecting
        this.remoteUserState.connectionID = event.connectionId;
        this.remoteUserState.meta = JSON.parse(event.data);
        this.props.onRemoteUserConnecting();
        // TODO: send local state
      },
      connectionDestroyed: (event) => {
        // HACK
        if (this.state.unmounting) {
          console.log("RETURNING EARLY ON connectionDestroyed");
          return;
        }

        recordSessionTokboxEvent('session.connectionDestroyed', {
          event,
          sessionID: this.props.session.id
        });
        this.remoteUserState = newRemoteUserState();
        this.props.onRemoteUserDisconnected();
      },
      streamCreated: (event) => {
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

        // TODO: set brief timeout to check if "connected" - extra signal may be received to 
        // set if this is a modern or legacy version
        this.props.onRemoteUserConnected();
      },
      streamDestroyed: (event) => {
        recordSessionTokboxEvent('session.streamDestroyed', {
          event,
          sessionID: this.props.session.id
        });

        this.remoteUserState = {
          ...this.remoteUserState,
          streamID: null,
          publishing: false,
          publishingAudio: false,
          publishingVideo: false,
        };

        this.props.onRemoteUserDisconnected();
      },
      signal: (event) => {
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
      },

      archiveStarted: (event) => {
      },
      archiveStopped: (event) => {
      },
      error: (event) => {
        recordSessionTokboxEvent('session.error', {
          event,
          sessionID: this.props.session.id
        });
        this.remount();
      },
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
    setTimeout(() => {
      this.sendSignal("TEST", {foo: "bar"});
    }, 5000);
  }

  componentWillUnmount () {
    recordSessionEvent("session.componentWillUnmount");
    this.cleanup();
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
            {/* don't mount the publisher/subscriber if we're in the process of ending the call*/}
            <Publisher
              session = {session}
              status = {localSessionStatus}
              onError = {() => { this.remount() }}
            />
            <Subscriber
              session = {session}
              status = {localSessionStatus}
              onError = {() => { this.remount() }}
            />
          </OTSession>
        )}
        { this.props.children }
      </View>
    );
  }
}
