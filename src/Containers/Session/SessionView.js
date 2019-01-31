import React, {Component} from 'react';
import {NetInfo, AppState, View, Text, TouchableWithoutFeedback} from 'react-native';
import {KeepAwake} from "react-native-keep-awake";
import { connect } from 'react-redux';

import {endSession, handleEndedSession, setRemoteUser} from '../../Ducks/CurrentSessionReducer';

import {CustomerConnecting} from "./Components/CustomerConnecting";
import {LinguistConnecting} from "./Components/LinguistConnecting";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionState} from "./Components/ReconnectionState";
import {CallTimer} from './Components/CallTimer';
import {SessionControls} from "./Components/SessionControls";
import {Session} from "./Components/Tokbox/Session";

import styles from "./styles.js";
import * as tests from './SessionView.tests';

newRemoteUserState = (props) => {
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
    controls: {
      micEnabled: null,
      videoEnabled: null,
      speakerEnabled: null,
      cameraFlipEnabled: null,
    },
    app: {
      state: '', // background|foreground
      networkConnection: '',
    }
  }
}

class SessionView extends Component {
  
  constructor (props) {
    super(props);
    this.init(props);
    this.TEST();
  }

  init (props) {
    // anything referenced in the template and/or passed to child
    // components as props needs to be defined in `state`
    this.state = {

      // state of session display
      display: {
        controlsVisible: true,
      },

      app: {
        state: AppState.currentState,
        networkConnection: null
      },

      // basic state of user's connection/stream to av session (tokbox)
      connection: {
        initiallyConnected: true,
        connected: false,
        connecting: true,
        receivingThrottled: false,
        receivingAudio: false,
        receivingVideo: false,
      },

      // user's call control state
      controls: {
        cameraFlipEnabled: false,
        micEnabled: true,
        videoEnabled: props.session.avModePreference,
        speakerEnabled: true, // todo, harder than it seems...
      },

      // state of multiple participants, would be mapped by their userId ... ?
      // tokbox connection ID
      remoteUserStates: {},
      remoteUserState: newRemoteUserState(props),

      // higher level Solo session state - like did we "connect" to the other person successfully at any point?
      status: {
        ending: false,
        ended: false,
      },

      // signal to send to other participants
      signal: {},
    };

    this.endingCall = false; // NOTE: probably need this in `state` as well - it's here to prevent double taps
    this.callTimer = null;
  }

  TEST () {
    tests.testLinguistConnects(this);
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);

    // TODO: after #1732
    // this.blurSubscription = this.props.navigation.addListener("didBlur", this.cleanup);

    // TODO: init some things:
    // * push notification listeners
    // * linguist connecting, end call, 
  }

  componentWillUnmount () {
    console.log("SessionView.componentWillUnmount");
    this.cleanup();
  }

  cleanup () {
    console.log("SessionView.cleanup");
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener("connectionChange", this.handleConnectionChange);

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

    this.setState({app: {
      ...this.state.app,
      networkConnection: currentState
    }});

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
    this.sendSignal("connectionType", {fromType, toType});
  }

  hasNetworkConnection () {
    return this.state.app.networkConnection != "none";
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
  
  shouldShowReconnectionState () {
    return (
      this.hasInitiallyConnected() &&
      (
        !this.state.connection.connected ||
        !this.state.remoteUserState.connection.connected
      )
    );
  }

  handleInitialCustomerTimeout () {
    this.props.endSession('timeout').finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: "CustomerRetryView"});
    });
  }

  handleUserConnecting () {}
  handleUserConnected () {}
  handleUserDisconnected () {}

  handleRemoteUserConnecting () {
    this.setState({
      remoteUserState: {
        ...this.state.remoteUserState,
        connection: {
          ...this.state.remoteUserState.connection,
          connected: false,
          connecting: true,
        }
      }
    })
  }

  handleRemoteUserConnected () {
    this.setState({
      remoteUserState: {
        ...this.state.remoteUserState,
        connection: {
          ...this.state.remoteUserState.connection,
          initiallyConnected: true,
          connected: true,
          connecting: false,
        }
      }
    });
  }

  handleRemoteUserDisconnected () {
    this.setState({
      remoteUserState: {
        ...this.state.remoteUserState,
        connection: {
          ...this.state.remoteUserState.connection,
          initiallyConnected: true,
          connected: false,
          connecting: false,
        }
      }
    });
  }

  hasInitiallyConnected () {
    return this.state.remoteUserState.connection.initiallyConnected && this.state.connection.initiallyConnected;
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
    // double tap prevention
    if (this.endingCall) {
      return;
    }
    // TODO: figure out proper end reason, and proper target view
    // * rate view if connected
    // * otherwise home?
    let reason = 'done';
    let targetView = "Home";
    this.endingCall = true;

    this.setState({endingCall: true});
    this.sendSignal('endingCall', {reason});
    this.props.endSession(reason).then((res) => {
      this.setState({endingCall: false, endedCall: true});
      this.sendSignal('endedCall');
    }).catch((e) => {
      this.endingCall = false;
      this.setState({endingCall: false, endedCall: true});
      this.sendSignal('endingCallFailed');
    }).finally(() => {
      this.cleanup();
      this.endingCall = false;
      this.props.navigation.dispatch({type: targetView});
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

          <Text style={styles.text}>Hello {this.props.user.firstName}</Text>

          { this.props.isLinguist && !this.hasInitiallyConnected() && (
            <LinguistConnecting
              remoteUser = {this.props.remoteUser}
              remoteUserState = {this.state.remoteUserState}
              session = { this.props.session }
              onError = { () => { this.handleInitialConnectionError("session.errFailedToConnect") } }
              onTimeout = { () => { this.handleInitialLinguistTimeout() } }
            />
          )}
          { this.props.isCustomer && !this.hasInitiallyConnected() && (
            <CustomerConnecting
              remoteUser = {this.props.remoteUser}
              remoteUserState = {this.state.remoteUserState}
              session = { this.props.session }
              secondsUntilTimeout = { 60 }
              onError = { () => { this.handleInitialConnectionError("session.errFailedToConnect") } }
              onTimeout = { () => { this.handleInitialCustomerTimeout() } }
            />
          )}

          { this.shouldShowReconnectionState() && (
            <ReconnectionState
              user = { this.props.user }
              remoteUser = {this.props.remoteUser}
              remoteUserConnection = {this.state.remoteUserState.connection}
              isCustomer = { this.props.isCustomer }
              isLinguist = { this.props.isLinguist }
              userConnection = { this.state.connection }
              onEnd = {() => { this.triggerEndCall() }}
              onTryAgain = {() => { this.triggerRetryCall() }}
            />
          )}

          { this.shouldRenderSession() && (
            <Session
              user = {this.props.user }
              session = { this.props.session }
              credentials = { this.props.credentials }
              remoteUser = {this.props.remoteUser}
              remoteUserState = {this.state.remoteUserState}
              localAppState = { this.state.app }
              localControlState = { this.state.controls }
              localSessionStatus = { this.state.status }
              onSessionEnded = {() => { this.handleCallEnded() }}

              // keep or remove?
              sendSignal = { this.state.signal }
              onSignalReceived = {null}

              // update basic connection status of remote participant
              onRemoteUserConnecting = {null}
              onRemoteUserConnectingFailed = {null}
              onRemoteUserConnected = {null}
              onRemoteUserDisconnected = {null}
              onRemoteUserReconnected = {null}
              onRemoteUserPoorConnection = {null}
              onRemoteUserUpdated = {null} // for things like...

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
            onSpeakerPressed = {() => {  this.toggleSpeaker() }}
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
  ...state.currentSessionReducer
});

const mD = {
  endSession,
  handleEndedSession,
  setRemoteUser,
}

export default connect(mS, mD)(SessionView);