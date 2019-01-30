import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {KeepAwake} from "react-native-keep-awake";
import { connect } from 'react-redux';

import {endSession, handleEndedSession} from '../../Ducks/CurrentSessionReducer';

import {CustomerConnecting} from "./Components/CustomerConnecting";
import {LinguistConnecting} from "./Components/LinguistConnecting";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionState} from "./Components/ReconnectionState";
import {SessionControls} from "./Components/SessionControls";
import {Session} from "./Components/Tokbox/Session";
import {Publisher} from "./Components/Tokbox/Publisher";
import {Subscriber} from "./Components/Tokbox/Subscriber";

import styles from "./styles.js";

newParticipantState = (connectionId) => {
  return {
    platform: null,           // mobile|web|sip
    legacyVersion: false,
    subscribedToMyStream: false,    // are they successfully subscribed to me?
    initiallyConnected: false,
    currentlyConnected: false,
    connecting: false,
    user: {
      firstName: "",
      lastInitial: "",
    },
    connection: {
      id: connectionId,
    },
    stream: {
      id: null,
      subscribed: false,
    },
    controls: {
      micEnabled: null,
      videoEnabled: null,
      speakerEnabled: null,
      cameraFlipEnabled: null,
    },
    app: {
      state: '', // background|foreground
    },
    heartbeat: {
      active: false,
      interval: null,
      lastReceived: null,
    }
  }
}

class SessionView extends Component {

  // setup initial state, received props include:
  // * isLinguist|isCustomer - role of the user in question
  // * endedViaPushNotification - if session was ended via push notification
  // * user
  // * session creation params
  // * session cnx info
  constructor(props) {
    super(props);

    // anything referenced in the template and/or passed to child
    // components as props needs to be defined in `state`
    this.state = {

      // state of session display
      display: {
        controlsVisible: true,
      },

      // user's call control state
      controls: {
        cameraFlipEnabled: false,
        micEnabled: true,
        videoEnabled: props.session.avModePreference,
        speakerEnabled: true, // todo, harder than it seems...
      },

      // state of other participants, see `newSubscriberState`, this is a map indexed by their
      // tokbox connection ID
      remoteParticipants: {},
      remoteParticipant: newParticipantState(),

      // state of user's connection/stream to tokbox
      connection: {
        connectionID: null, // tokbox connection ID
        initiallyConnected: false,
        currentlyConnected: false,
        reconnecting: false,
        connecting: true
      },

      // state of user's stream to tokbox
      stream: {
        id: null,
        created: false,
        published: false
      },

      // higher level Solo session state - like did we "connect" to the other person successfully at any point?
      session: {
        initiallyConnectedToParticipant: false,
      },

      // signal to send to other participants
      signal: {},

    };

    // event handlers for tokbox API
    this.otSessionHandlers = {
      signal: (e) => {

      },
    };

    this.otPublisherHandlers = {};
    this.otSubscriberHandlers = {};

    this.endingCall = false; // NOTE: probably need this in `state` as well - it's here to prevent double taps
    this.callTimer = null;
    this.initialConnectingTimer = null;

    // status of call from server
    this.status = {
      interval: null,
      polling: false,
    };

  }

  componentDidMount () {
    // TODO: init some things:
    // * app state listeners
    // * push notification listeners
  }

  componentWillUnmount () {
    // TODO: unregister listeners:
    // * app state
    // * push notification
  }

  // hide/show call controls
  toggleDisplayControls () {
    this.setState({display: {controlsVisible: !this.state.display.controlsVisible}});
  }

  // to not break old apps
  sendLegacySignal() {}
  sendSignal (type, data) {
    this.setState({signal: {type, data}});
  }

  toggleVideo () {
    const enabled = !this.state.controls.videoEnabled;
    this.setState({controls:{
      ...this.state.controls,
      videoEnabled: enabled
    }});
    this.sendSignal('videoStatus', {enabled});
  }

  toggleMic () {
    const enabled = !this.state.controls.micEnabled;
    this.setState({controls:{
      ...this.state.controls,
      micEnabled: enabled
    }});
    this.sendSignal('micStatus', {enabled});
  }

  toggleSpeaker () {
    const enabled = !this.state.controls.speakerEnabled;
    this.setState({controls:{
      ...this.state.controls,
      speakerEnabled: enabled
    }});
    this.sendSignal('speakerStatus', {enabled});
  }

  toggleCameraFlip () {
    const enabled = !this.state.controls.cameraFlipEnabled;
    this.setState({controls:{
      ...this.state.controls,
      cameraFlipEnabled: enabled
    }});
    this.sendSignal('cameraFlipStatus', {enabled});
  }

  poorConnectionAlertVisible () { return false; }
  poorConnectionAlertMessage () { return ""; }
  shouldRenderSession() { return true; }
  shouldShowReconnectionState () { return false; }
  handleInitialCustomerTimeout () {
    this.props.endSession('timeout').finally(() => {
      this.props.navigation.dispatch({type: "CustomerRetryView"});
    });
  }

  hasInitiallyConnected () {
    return this.state.remoteParticipant.initiallyConnected && this.state.initiallyConnected;
  }

  // call ended by user
  triggerEndCall () {
    if (!this.props.isLinguist) {
      this._triggerEndCall();
      return;
    }

    // TODO: alert "are you sure?"
    this._triggerEndCall();

  }

  _triggerEndCall () {
    let reason = 'done';
    // TODO: figure out proper end reason
    this.setState({endingCall: true});
    this.sendSignal('endingCall', {reason});


    this.props.endSession(reason).then((res) => {
      this.setState({endingCall: false, endedCall: true});
      this.sendSignal('endedCall');
    }).catch((e) => {
      this.setState({endingCall: false, endedCall: true});
      this.sendSignal('endingCallFailed');
    }).finally(() => {
      // TODO: navigate to target state
    });
  }

  // call ended by a remote participant
  handleCallEnded () {
    this.props.handleCallEnded();
    // TODO:
    // if connected, go to rate screen
    // if connecting, alert about cancelation, go home
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleDisplayControls() }>
        <View style={styles.container}>

          {/* <KeepAwake /> */}

          <Text style={styles.text}>Hello session</Text>

          { this.props.isLinguist && !this.state.initiallyConnected && (
            <LinguistConnecting onTimeout={ this.handleInitialConnectionTimeout } />
          )}
          { !this.hasInitiallyConnected() && (
            <CustomerConnecting
              user = { this.state.remoteParticipant.user }
              connected = { this.state.remoteParticipant.connected }
              connecting = { this.state.remoteParticipant.connecting }
              onTimeout = { () => { this.handleInitialCustomerTimeout() } }
            />
          )}

          { this.shouldShowReconnectionState() && (
            <ReconnectionState user={this.props.user} participant={ this.getDisconnectedParticipant() } />
          )}

          { this.shouldRenderSession() && (
            <Session session={ this.props.session }>
              <Publisher publisher={ this.publisher }></Publisher>
              <Subscriber></Subscriber>
            </Session>
          )}

          { this.poorConnectionAlertVisible() && (
            <PoorConnectionWarning message={ this.poorConnectionAlertMessage () } />
          )}

          <SessionControls
            cameraFlipEnabled={ this.state.controls.cameraFlipEnabled }
            onCameraFlipPressed= { this.toggleCameraFlip }
            speakerEnabled = { this.state.controls.speakerEnabled}
            onSpeakerPressed = { this.toggleSpeaker }
            micEnabled = { this.state.controls.micEnabled }
            onMicPressed =  { this.toggleMic }
            videoEnabled = { this.state.controls.videoEnabled }
            onVideoPressed = { this.toggleVideo }
            endingCall = { this.state.endingCall }
            onEndCallPressed = { this.triggerEndCall }
          />

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mS = (state) => ({
  user: state.userProfile, // TODO: replace with state.activeUser.user
  role: state.currentSessionReducer.role,
  isCustomer: state.currentSessionReducer.isCustomer,
  isLinguist: state.currentSessionReducer.isLinguist,
  session: state.currentSessionReducer.session,
  credentials: state.currentSessionReducer.credentials,
  remoteParticipant: state.currentSessionReducer.remoteParticipant,
});

const mD = {
  endSession,
  handleEndedSession,
}

export default connect(mS, mD)(SessionView);