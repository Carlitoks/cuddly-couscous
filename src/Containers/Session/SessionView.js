import React, {Component} from 'react';
import {NetInfo, AppState, View, Text, TouchableWithoutFeedback} from 'react-native';
import {KeepAwake} from "react-native-keep-awake";
import { connect } from 'react-redux';

import {endSession, handleEndedSession, setRemoteParticipant} from '../../Ducks/CurrentSessionReducer';

import {CustomerConnecting} from "./Components/CustomerConnecting";
import {LinguistConnecting} from "./Components/LinguistConnecting";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionState} from "./Components/ReconnectionState";
import {CallTimer} from './Components/CallTimer';
import {SessionControls} from "./Components/SessionControls";
import {Session} from "./Components/Tokbox/Session";

import styles from "./styles.js";

newParticipantState = (props) => {
  return {
    platform: null,           // mobile|web|sip
    legacyVersion: false,
    connection: {
      initiallyConnected: false,
      connected: false,
      connecting: false,
      receivingThrottled: false,
      receivingAudio: false,
      receivingVideo: false,
    },
    user: {
      ...props.remoteParticipant,
      firstName: "",
      lastInitial: "",
    },
    controls: {
      micEnabled: null,
      videoEnabled: null,
      speakerEnabled: null,
      cameraFlipEnabled: null,
    },
    app: {
      state: '', // background|foreground
      network: '',
    }
  }
}

class SessionView extends Component {
  
  constructor (props) {
    super(props);
    this.init(props);
    this.TEST();
  }

  TEST () {
    this._testScenario_linguistConnects();
  }

  _testScenario_linguistConnects() {
    // trigger connecting
    setTimeout(() => {
      this.props.setRemoteParticipant({
        id: "22222222-2222-2222-2222-222222222223",
        firstName: "Evan",
        lastInitial: "V"
      });
      this.handleRemoteParticipantConnecting();
    }, 3000);

    // trigger connected
    setTimeout(() => {
      this.handleRemoteParticipantConnected();
    }, 7000);
  }

  init (props) {
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
      remoteParticipant: newParticipantState(props),

      // basic state of user's connection/stream to av session (tokbox)
      connection: {
        initiallyConnected: false,
        connected: false,
        connecting: true
      },

      // higher level Solo session state - like did we "connect" to the other person successfully at any point?
      status: {
        initiallyConnectedToParticipant: false,
        ending: false,
        ended: false,
      },

      // signal to send to other participants
      signal: {},

      appState: AppState.currentState,
      networkConnection: null
    };

    this.endingCall = false; // NOTE: probably need this in `state` as well - it's here to prevent double taps
    this.callTimer = null;
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
    console.log(this.props.navigation);
    // this.blurSubscription = this.props.navigation.addListener("didBlur", this.cleanup);

    // TODO: init some things:
    // * push notification listeners
    // * linguist connecting, end call, 
  }

  componentWillUnmount () {
    this.cleanup();
  }

  cleanup () {
    console.log("SessionView.cleanup");
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener("connectionChange", this.handleConnectionChange);
    if (!!this.blurSubscription) {
      this.blurSubscription.remove();
    }

    // TODO: unregister listeners:
    // * push notification
    // * any audio things, incallManager, etc...

  }

  handleAppStateChange (nextState) {
    this.setState({appState: nextState});
    switch (nextState) {
      case 'background': this.appWillEnterBackground(); break;
      case 'foreground': this.appWillEnterForeground(); break;
      case 'inactive': this.appWillBeSuspended(); break;
    }
  }
  
  appWillEnterBackground () {

  }

  appWillEnterForeground () {

  }

  appWillBeSuspended () {

  }

  handleConnectionChange (info) {
    const currentState = info.effectiveType.toLowerCase();
    const prevState = this.state.networkConnection;

    this.setState({networkConnection: currentState});

    // lost internet connection
    if (currentState == "none" && prevState != "none") {
      this.handleLostNetworkConnection();
      return;
    }

    // regained connection
    if (currentState != "none" && prevState == "none") {
      this.handleRegainedNetworkConnection();
      return;
    }

    this.handleNetworkConnectionTypeChanged(prevState, currentState);
  }

  handleLostNetworkConnection () {

  }

  handleRegainedNetworkConnection () {

  }

  handleNetworkConnectionTypeChanged (fromType, toType) {

  }

  hasNetworkConnection () {
    return this.state.networkConnection != "none";
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
      this.cleanup();
      this.props.navigation.dispatch({type: "CustomerRetryView"});
    });
  }

  handleUserConnecting () {}
  handleUserConnected () {}
  handleUserDisconnected () {}

  handleRemoteParticipantConnecting () {
    this.setState({
      remoteParticipant: {
        ...this.state.remoteParticipant,
        connected: false,
        connecting: true,
      }
    })
  }

  handleRemoteParticipantConnected () {
    this.setState({
      remoteParticipant: {
        ...this.state.remoteParticipant,
        initiallyConnected: true,
        connected: true,
        connecting: false,
      }
    });
  }

  handleRemoteParticipantDisconnected () {
    this.setState({
      remoteParticipant: {
        ...this.state.remoteParticipant,
        connected: false,
        connecting: false,
      }
    });
  }

  hasInitiallyConnected () {
    return this.state.remoteParticipant.initiallyConnected && this.state.initiallyConnected;
  }

  // if an initial connection error is triggered, then just
  // alert the error and send back to home screen
  handleInitialConnectionError (i18nKey) {
    Alert.alert(I18n.t("error"), I18n.t(i18nKey), [{text: I18n.t("ok")}]);
    this.props.triggerEndCall("error")
    this.cleanup();
    this.props.navigation.dispatch({type: "Home"});
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
      this.cleanup();
      // TODO: navigate to target state
      // * rate view if connected
      // * otherwise home?
    });
  }

  // call ended by a remote participant
  handleCallEnded () {
    this.props.handleCallEnded();
    // TODO:
    // if connected, go to rate screen
    // if connecting, alert about cancelation, go home
  }

  triggerRetryCall () {
    // TODO: end current call
    // create new call
    // force reload component somehow... "initState(props)"
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleDisplayControls() }>
        <View style={styles.container}>

          {/* <KeepAwake /> */}

          <Text style={styles.text}>Hello session</Text>

          { this.props.isLinguist && !this.hasInitiallyConnected() && (
            <LinguistConnecting
              remoteParticipant = {this.state.remoteParticipant}
              session = { this.props.session }
              onError = { () => { this.handleInitialConnectionError("session.errFailedToConnect") } }
              onTimeout = { () => { this.handleInitialLinguistTimeout() } }
            />
          )}
          { this.props.isCustomer && !this.hasInitiallyConnected() && (
            <CustomerConnecting
              remoteParticipant = {this.state.remoteParticipant}
              session = { this.props.session }
              secondsUntilTimeout = { 60 }
              onError = { () => { this.handleInitialConnectionError("session.errFailedToConnect") } }
              onTimeout = { () => { this.handleInitialCustomerTimeout() } }
            />
          )}

          { this.shouldShowReconnectionState() && (
            <ReconnectionState
              user = { this.props.user }
              isCustomer = { this.props.isCustomer }
              isLinguist = { this.props.isLinguist }
              networkConnection = { this.state.networkConnection }
              userConnection = { this.state.connection }
              participantConnection = { this.state.remoteParticipant }
              onEnd = {() => { this.triggerEndCall() }}
              onTryAgain = {() => { this.triggerRetryCall() }}
            />
          )}

          { this.shouldRenderSession() && (
            <Session
              user = {this.props.user }
              session = { this.props.session }
              credentials = { this.props.credentials }
              remoteParticipant = { this.props.remoteParticipant }
              networkConnection = { this.state.networkConnection }
              appState = { this.state.appState }
              controls = { this.state.controls }
              sessionStatus = { this.state.status }
              onSessionEnded = {() => { this.handleCallEnded() }}

              // keep or remove?
              sendSignal = { this.state.signal }
              onSignalReceived = {null}

              // update basic connection status of remote participant
              onRemoteParticipantConnecting = {null}
              onRemoteParticipantConnectingFailed = {null}
              onRemoteParticipantConnected = {null}
              onRemoteParticipantDisconnected = {null}
              onRemoteParticipantReconnected = {null}
              onRemoteParticipantPoorConnection = {null}
              onRemoteParticipantUpdated = {null} // for things like...

              // update basic connection status of user
              onUserConnecting = {null}
              onUserConnectingFailed = {null}
              onUserConnected = {null}
              onUserDisconnected = {null}
              onUserReconnected = {null}
              onUserPoorConnection = {null}
            />
          )}

          { this.poorConnectionAlertVisible() && (
            <PoorConnectionWarning message={ this.poorConnectionAlertMessage () } />
          )}

          <CallTimer />
          <SessionControls
            cameraFlipEnabled={ this.state.controls.cameraFlipEnabled }
            onCameraFlipPressed= {() => { this.toggleCameraFlip() }}
            speakerEnabled = { this.state.controls.speakerEnabled}
            onSpeakerPressed = {() => { this.toggleSpeaker() }}
            micEnabled = { this.state.controls.micEnabled }
            onMicPressed =  {() => { this.toggleMic() }}
            videoEnabled = { this.state.controls.videoEnabled }
            onVideoPressed = {() => { this.toggleVideo() }}
            endingCall = { this.state.endingCall }
            onEndCallPressed = {() => { this.triggerEndCall() }}
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
  setRemoteParticipant,
}

export default connect(mS, mD)(SessionView);