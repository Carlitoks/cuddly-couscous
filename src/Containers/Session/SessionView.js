import React, {Component} from 'react';
import {Alert, NetInfo, AppState, View, Text, TouchableWithoutFeedback} from 'react-native';
import {KeepAwake} from "react-native-keep-awake";
import { connect } from 'react-redux';
import I18n, {translateApiError} from "../../I18n/I18n";

import {endSession, handleEndedSession, setRemoteUser, setSessionBegan} from '../../Ducks/CurrentSessionReducer';

import {UserConnecting} from "./Components/UserConnecting";
import {CustomerMatching} from "./Components/CustomerMatching";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionState} from "./Components/ReconnectionState";
import {SessionControls} from "./Components/SessionControls";
import {Session} from "./Components/Tokbox/Session";

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
      hasNetworkConnection: false
    }
  }
}

class SessionView extends Component {
  
  constructor (props) {
    super(props);
    this.init(props);
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
        networkConnection: null,
        hasNetworkConnection: true
      },

      // basic state of user's connection/stream to av session (tokbox), note this is NOT
      // about the devices network connection
      connection: {
        initiallyConnected: false,
        connected: false,
        connecting: false,
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

      // signal to send to other participants
      signal: {},
    };

    this.endingCall = false; // NOTE: probably need this in `state` as well - it's here to prevent double taps
    this.callTimer = null;
  }

  TEST () {
    // tests.testLinguistConnects(this);
    // tests.testRemoteUserDisconnects(this);
    tests.testLocalUserDisconnects(this);
    // tests.testUserLostNetwork(this);
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);

    // TODO: after #1732
    // this.blurSubscription = this.props.navigation.addListener("didBlur", this.cleanup);

    // TODO: init some things:
    // * push notification listeners
    // * linguist connecting, end call, 

    this.TEST();
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
    this.handleNetworkConnectionTypeChanged(prevState, currentState);
  }

  handleNetworkConnectionTypeChanged (prevState, currentState) {
    this.setState({app: {
      ...this.state.app,
      networkConnection: currentState,
      hasNetworkConnection: currentState != "none"
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
    
    this.sendSignal("connectionType", {fromType, toType});
  }

  handleLostNetworkConnection () {
    // TODO: anything to pass down to children, like a force reload of certain components?
  }

  handleRegainedNetworkConnection () {
    // TODO: anything to pass down to children, like a force reload of certain components?
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
  
  shouldShowReconnectionState () {
    return (
      this.hasInitiallyConnected() &&
      (!this.props.status.ending || !this.props.status.ended) &&
      (
        "none" == this.state.app.networkConnection ||
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

  handleInitialLinguistTimeout () {
    this.props.endSession('failure_remote').finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  handleUserConnecting () {
    this.setState({connection: {
      ...this.state.connection,
      connected: false,
      connecting: true,
    }});
  }

  handleUserConnected () {
    this.setState({connection: {
      ...this.state.connection,
      initiallyConnected: true,
      connected: true,
      connecting: false,
    }}, () => {
      const rc = this.state.remoteUserState.connection;
      if (rc.initiallyConnected && rc.connected) {
        this.props.setSessionBegan();
      }
    });
  }

  handleUserDisconnected () {
    this.setState({connection: {
      ...this.state.connection,
      connected: false,
      connecting: false,
    }});
  }

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
    }, () => {
      const lc = this.state.connection;
      if (lc.initiallyConnected && lc.connected) {
        this.props.setSessionBegan();
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
  handleInitialConnectionError (reason, i18nKey) {
    Alert.alert("Failed to Connect", I18n.t(i18nKey))
    this._triggerEndCall(reason)
  }

  // call ended by user
  triggerEndCall (reason) {
    if (!this.props.isLinguist) {
      this._triggerEndCall(reason);
      return;
    }

    // TODO: alert "are you sure?"
    this._triggerEndCall(reason);

  }

  _triggerEndCall (reason) {
    if (this.props.status.ending || this.endingCall) {
      return;
    }

    // TODO: figure out proper target view
    let targetView = "Home";
    this.endingCall = true;

    this.sendSignal('endingCall', {reason});
    this.props.endSession(reason).then((res) => {
      this.sendSignal('endedCall');
    }).catch((e) => {
      this.sendSignal('endingCallFailed');
    }).finally(() => {
      this.cleanup();
      this.endingCall = false;
      this.props.navigation.dispatch({type: targetView});
    });
  }

  // call ended by a remote participant
  handleCallEnded (reason) {
    // TODO: figure out proper target view: rate vs home
    // if connected & done, go to rate screen
    let targetView = "Home";
    
    // if in the process of connecting, call was cancelled by the other party
    Alert.alert("Cancelled", "The call was cancelled by the other party.");

    this.props.handleEndedSession().finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: targetView});
    });
  }

  triggerRetryCall (endReason, startReason) {
    // TODO: end current call
    // create new call
    // force reload component somehow... "initState(props)"
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleDisplayControls() }>
        <View style={{flex: 1}}>

          {/* <KeepAwake /> */}

          {/* TODO: consider a dedicated component for triggering a call retry? */}

          {/* 
              This triggers most of the relevant events by handling the actual
              connection to Tokobx.
         */}
          <Session
            user = {this.props.user }
            session = { this.props.session }
            credentials = { this.props.credentials }
            remoteUser = {this.props.remoteUser}
            remoteUserState = {this.state.remoteUserState}
            localAppState = { this.state.app }
            localControlState = { this.state.controls }
            localSessionStatus = { this.props.status }
            onSessionEnded = {() => { this.handleCallEnded() }}

            // keep or remove?
            sendSignal = { this.state.signal }
            onSignalReceived = {null}

            // update basic connection status of remote participant
            onRemoteUserConnecting = {() => { this.handleRemoteUserConnecting() }}
            onRemoteUserConnectingFailed = {() => { this.handleRemoteUserDisconnected() }}
            onRemoteUserConnected = {() => { this.handleRemoteUserConnected() }}
            onRemoteUserDisconnected = {() => { this.handleRemoteUserDisconnected() }}
            onRemoteUserReconnected = {() => { this.handleRemoteUserConnected() }}

            // other status updates?
            onRemoteUserPoorConnection = {null}
            onRemoteUserUpdated = {(user) => { this.props.setRemoteUser(user) }}

            // update basic connection status of user
            onUserConnecting = {() => { this.handleUserConnecting() }}
            onUserConnectingFailed = {() => { this.handleUserDisconnected() }}
            onUserConnected = {() => { this.handleUserConnected() }}
            onUserDisconnected = {() => { this.handleUserDisconnected() }}
            onUserReconnected = {() => { this.handleUserConnected() }}

            // other status updates?
            onUserPoorConnection = {null}
          >
            {/* <SessionHeader /> */}
            { this.poorConnectionAlertVisible() && (
            <PoorConnectionWarning message={ this.poorConnectionAlertMessage () } />
            )}

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
              onEndCallPressed = {() => { this.triggerEndCall("done") }}
            />
          </Session>

          {/* If there is a remote user, but we haven't connected to them yet, show the initial connection screen */}
          {!!this.props.remoteUser.id && !this.hasInitiallyConnected() && (
          <UserConnecting
            user = { this.props.user }
            remoteUser = {this.props.remoteUser}
            remoteUserState = {this.state.remoteUserState}
            connection = { this.state.connection }
            status = { this.props.status }
            session = { this.props.session }
            secondsUntilError = { 30 }
            onError = { (reason) => { this.handleInitialConnectionError(reason, "session.errFailedToConnect") }}
            onRemoteCancel = {() => { this.handleCallEnded() }}
            onCancel = {() => { this.triggerEndCall("cancel") }}
          />
          )}

          {/* If we are the customer and haven't been matched to a linguist yet, display matching state */}
          {!this.props.remoteUser || !this.props.remoteUser.id && this.props.isCustomer && (
          <CustomerMatching
            session = { this.props.session }
            status = { this.props.status }
            secondsUntilTimeout = { 70 }
            onCancel = {() => { this.triggerEndCall("cancel") }}
            onTimeout = {() => { this.handleInitialCustomerTimeout() }}
            onError = {(reason) => { this.handleInitialConnectionError(reason, "session.errFailedToConnect") }}
            onLinguistIdentified = {(user) => { this.props.setRemoteUser(user) }}
          />
          )}
          
          {/* If the initial connection was established, but one party has been disconnected... */}
          <ReconnectionState
            isVisible = { this.shouldShowReconnectionState() }
            user = { this.props.user }
            status = { this.props.status }
            remoteUser = {this.props.remoteUser}
            remoteUserConnection = {this.state.remoteUserState.connection}
            isCustomer = { this.props.isCustomer }
            isLinguist = { this.props.isLinguist }
            userConnection = { this.state.connection }
            userApp = { this.state.app }
            onEnd = {(reason) => { this.triggerEndCall(reason) }}
            onRetry = {(end, start) => { this.triggerRetryCall(end, start) }}
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
  setSessionBegan, // NOTE: will trigger the first timer event
}

export default connect(mS, mD)(SessionView);