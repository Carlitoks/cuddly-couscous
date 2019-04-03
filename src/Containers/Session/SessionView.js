import React, {Component} from 'react';
import {Animated, Alert, NetInfo, AppState, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import KeepAwake from "react-native-keep-awake";
import { connect } from 'react-redux';
import I18n, {translateApiError} from "../../I18n/I18n";
import merge from 'lodash/merge';

import {createNewSession, endSession, handleEndedSession, setRemoteUser, setSessionBegan, startTimer, stopTimer} from '../../Ducks/CurrentSessionReducer';

import {UserConnecting} from "./Components/UserConnecting";
import {SessionEnding} from "./Components/SessionEnding";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionModal} from "./Components/ReconnectionModal";
import {SessionHeader} from "./Components/SessionHeader";
import {AudioModeBackground} from "./Components/AudioModeBackground";
import {CallTimer} from "./Components/CallTimer";
import {SessionControls} from "./Components/SessionControls";
import {Session as TokboxSession} from "./Components/Tokbox/Session";

import * as tests from './SessionView.tests';
import { SESSION, DURATION } from '../../Util/Constants';

// The user state for local and remote users is the same format.  The object describes
// the users general connection status to the session, app and control states.
//
// Any state about the users status that is potentially useful to know for both parties
// belongs here.
//
// Any state that is purely related to the local device status, and not necessary to know for
// the remote user, can be defined in other areas of the state.
const newUserState = (obj = {}) => {
  return merge({
    platform: null,           // mobile|web|sip
    connection: {
      initiallyConnected: false,
      connected: false,
      connecting: false,
      initiallySending: false,
      sendingAudio: false,
      sendingVideo: false,
      initiallyReceiving: false,
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
      hasNetworkConnection: false,
      // orientation: '' // TODO: portrait|landscape
      // batteryLevel: '', // TODO: track battery level, one day
    }
  }, obj);
};

class SessionView extends Component {
  
  constructor (props) {
    super(props);
    this.init(props);
  }

  init (props) {
    // anything referenced in the template and/or passed to child
    // components as props needs to be defined in `state`
    this.state = {

      // local view state for the session display
      display: {
        controlsVisible: true,
      },

      // state of multiple participants, would be mapped by their userId ... ?
      // tokbox connection ID
      remoteUserStates: {}, // one day...
      remoteUserState: newUserState(),

      // local user state, we can make some immediate overrides since
      // we have more info
      localUserState: newUserState({
        platform: 'mobile',
        app: {
          state: AppState.currentState,
          hasNetworkConnection: true,
        },
        controls: {
          cameraFlipEnabled: false,
          micEnabled: true,
          videoEnabled: props.session.avModePreference == "video",
          speakerEnabled: true, // todo, harder than it seems... do we have headphones, etc...?    
        }
      }),
    };

    this.endingCall = false;
    this.unmounting = false;
  }

  TEST () {
    // tests.testRemoteUserConnects(this);
    // tests.testRemoteUserConnectsAndDisablesVideo(this);
    // tests.testRemoteUserConnectsAndGetsReceivingThrottled(this);
    // tests.testRemoteUserConnectsAndLocalUserGetsReceivingThrottled(this);
    // tests.testRemoteUserDisconnects(this);
    // tests.testLocalUserDisconnects(this);
    // tests.testUserLostNetwork(this);
  }

  setState (data, cb = null) {
    if (this.unmounting) {
      return;
    }
    super.setState(data, cb);
  }

  componentDidMount () {
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
    NetInfo.getConnectionInfo().then((info) => {
      this.updateLocalUserState({app: {networkConnection: info.type}});
    });

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
    this.unmounting = true;
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
    this.updateLocalUserState({app: {
      ...this.state.localUserState.app,
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

  toggleVideo () {
    const {controls, connection} = this.state.localUserState;
    this.updateLocalUserState({
      controls: {
        ...controls,
        videoEnabled: !controls.videoEnabled,
      },
      connection: {
        ...connection,
        sendingVideo: !controls.videoEnabled
      }
    });
    this.updateRemoteUserState({connection: {receivingVideo: !controls.videoEnabled}});
  }

  toggleMic () {
    const {controls, connection} = this.state.localUserState;
    this.updateLocalUserState({
      controls: {
        ...controls,
        micEnabled: !controls.micEnabled
      },
      connection: {
        ...connection,
        sendingAudio: !controls.micEnabled
      }
    });
    this.updateRemoteUserState({connection: {receivingAudio: !controls.micEnabled}});
  }

  toggleSpeaker () {
    const {controls} = this.state.localUserState;
    this.updateLocalUserState({controls: {
      ...controls,
      speakerEnabled: !controls.speakerEnabled
    }});
  }

  toggleCameraFlip () {
    const {controls} = this.state.localUserState;
    this.updateLocalUserState({controls: {
      ...controls,
      cameraFlipEnabled: !controls.cameraFlipEnabled
    }});
  }

  poorConnectionAlertVisible () {
    const {localUserState, remoteUserState} = this.state;
    return localUserState.connection.receivingThrottled || remoteUserState.connection.receivingThrottled;
  }
  
  shouldShowReconnectionState () {
    const {status} = this.props;
    return (
      status.began
      && (!status.ending && !status.ended)
      && (
        "none" == this.state.localUserState.app.networkConnection
        || !this.state.localUserState.connection.connected
        || !this.state.remoteUserState.connection.connected
      )
    );
  }

  beginSession () {
    this.props.setSessionBegan();
    // TODO: sound stuff, InCallManager stuff
  }

  handleInitialCustomerTimeout () {
    this.props.endSession(SESSION.END.TIMEOUT).finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: "CustomerRetryView"});
    });
  }

  handleInitialLinguistTimeout () {
    this.props.endSession(SESSION.END.FAILURE_REMOTE).finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  handleUserConnecting () {
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      connected: false,
      connecting: true,
    }});
  }

  handleUserConnected () {
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      initiallyConnected: true,
      connected: true,
      connecting: false,
    }});
    if (this.props.status.began) {
      this.props.startTimer();
    }
  }

  handleUserReceivingAV (ops) {
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      initiallyReceiving: true,
      receivingAudio: ops.audio,
      receivingVideo: ops.video
    }}, () => {
      const rc = this.state.remoteUserState.connection;
      if (rc.connected && rc.initiallyReceiving) {
        this.beginSession();
      }
    });
  }

  handleUserSendingAV (ops) {
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      initiallySending: true,
      sendingAudio: ops.audio,
      sendingVideo: ops.video,
    }});
  }

  handleUserDisconnected () {
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      connected: false,
      connecting: false,
    }});
    this.props.stopTimer();
  }

  handleUserReceivingAVThrottled () {
    this.updateLocalUserState({connection: {receivingThrottled: true}});
  }

  handleUserReceivingAVUnthrottled () {
    this.updateLocalUserState({connection: {receivingThrottled: false}});
  }

  handleRemoteUserConnecting () {
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      connected: false,
      connecting: true,
    }});
  }

  handleRemoteUserConnected () {
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      initiallyConnected: true,
      connected: true,
      connecting: false,
    }});
    if (this.props.status.began) {
      this.props.startTimer();
    }
  }

  handleRemoteUserReceivingAV (ops) {
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      initiallyReceiving: true,
      receivingVideo: ops.video,
      receivingAudio: ops.audio,
    }}, () => {
      const lc = this.state.localUserState.connection;
      if (lc.connected && lc.initiallyReceiving) {
        this.beginSession();
      }
    });
  }

  handleRemoteUserSendingAV (ops) {
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      initiallySending: true,
      sendingAudio: ops.audio,
      sendingVideo: ops.video,
    }});
  }

  handleRemoteUserDisconnected () {
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      initiallyConnected: true,
      connected: false,
      connecting: false,
    }});
    this.props.stopTimer();
  }

  handleRemoteUserReceivingAVThrottled () {
    this.updateRemoteUserState({connection: {receivingThrottled: true }});
  }

  handleRemoteUserReceivingAVUnthrottled () {
    this.updateRemoteUserState({connection: {receivingThrottled: false}});
  }

  handleRemoteUserVideoEnabled () {
    this.updateLocalUserState({connection: {receivingVideo: true}});
    this.updateRemoteUserState({connection: {sendingVideo: true}});
  }

  handleRemoteUserVideoDisabled () {
    this.updateLocalUserState({connection: {receivingVideo: false}});
    this.updateRemoteUserState({connection: {sendingVideo: false}});
  }

  updateRemoteUserState (data, cb = null) {
    this.setState({remoteUserState: merge(this.state.remoteUserState, data)}, cb);
  }

  updateLocalUserState(data, cb = null) {
    this.setState({localUserState: merge(this.state.localUserState, data)}, cb);
  }

  showAudioMode () {
    const {receivingVideo, receivingThrottled} = this.state.localUserState.connection;
    return !receivingVideo || receivingThrottled;
  }

  // call ended by user locally
  triggerEndCall (reason, confirm = false) {
    if (confirm) {
      Alert.alert(I18n.t("notification"), "Are you sure?", [
        {text: I18n.t('yes'), onPress: () => {
          this._triggerEndCall(reason);
        }},
        {text: I18n.t('no')}
      ]);
    } else {
      this._triggerEndCall(reason);
    }
  }

  _triggerEndCall (reason) {
    if (this.props.status.ending || this.endingCall) {
      return;
    }

    this.endingCall = true;
    this.props.endSession(reason).finally(() => {
      this.cleanup();
      this.endingCall = false;
      this.props.navigation.dispatch({type: this.chooseSessionEndedView(true)});
    });
  }

  // call was ended by the remote participant
  handleRemoteEnded (reason) {

    // we call this first to update the session, which also
    // ensures the end reason is accurate from the perspective
    // of this client
    this.props.handleEndedSession(reason).finally(() => {
      this.cleanup();
      this.props.navigation.dispatch({type: this.chooseSessionEndedView(false)});
    });
  }

  // figure out the proper state to navigate the user to once the session has ended, 
  // and also display an alert in cases where that is needed
  chooseSessionEndedView(endedByLocal) {
    const {session, isCustomer} = this.props;
    const {began} = this.props.status;
    const {hasNetworkConnection} = this.state.localUserState.app;
    let targetView = "Home";
    let alert = false;

    console.log("SessionView.chooseSessionEndedView: ", session.endReason);

    switch (session.endReason) {
      case SESSION.END.DONE: {
        targetView = began && hasNetworkConnection ? "RateView" : "Home";
        break;
      }
      case SESSION.END.CANCEL: {
        if (isCustomer) {
          targetView = (endedByLocal) ? "Home" : "CustomerRetryView";
        } else {
          targetView = "Home";
          if (!endedByLocal) {
            alert = {
              title: I18n.t('notification'),
              body: "Call was canceled by the customer." //I18n.t()
            };
          }
        }
        break;
      }
      case SESSION.END.DISCONNECT_LOCAL: {
        targetView = (isCustomer) ? "CustomerRetryView" : "RateView"
        if (!isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "You were disconnected from the call."
          };
        }
        break;
      }
      case SESSION.END.DISCONNECT_REMOTE: {
        targetView = (isCustomer) ? "CustomerRetryView" : "RateView"
        if (!isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "Your customer was disconnected from the call."
          };
        }
        break;
      }
      case SESSION.END.BALANCE_EXCEEDED: {
        targetView = "RateView";
        if (isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "Your account has run out of time." //I18n.t()
          };
        }
        break;
      }
      case SESSION.END.TIME_EXCEEDED: {
        targetView = "RateView";
        if (isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "Call exceeded the time limit." //I18n.t()
          };
        }
        break
      }
      case SESSION.END.FAILURE_LOCAL: {
        targetView = (isCustomer) ? "CustomerRetryView" : "Home";
        if (!isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "We were unable to connect you to the customer." //I18n.t()
          };
        }
        break;
      }
      case SESSION.END.FAILURE_REMOTE: {
        targetView = (isCustomer) ? "CustomerRetryView" : "Home";
        if (!isCustomer) {
          alert = {
            title: I18n.t('notification'),
            body: "The customer was unable to connect." //I18n.t()
          };
        }
        break;
      }
      default: targetView = "Home";
    }

    if (!!alert) {
      Alert.alert(alert.title, alert.body);
    }

    return targetView;
  }

  triggerRetryCall (endReason, startReason) {
    this.endingCall = true;
    this.props.endSession(endReason).finally(() => {
      this.endingCall = false;
      this.props.createNewSession({
        ...this.props.newSessionParams,
        reason: startReason
      })
      .then((res) => {
        this.props.navigation.dispatch({type: "CustomerMatchingView"})
      })
      .catch((e) => {
        Alert.alert(I18n.t("error"), translateApiError(e));
        this.props.navigation.dispatch({type: "Home"});
      })
      .finally((res) => {
        this.cleanup();
      });
    });
  }

  render () {
    const {localUserState, remoteUserState} = this.state;

    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleDisplayControls() }>
        <View style={{flex: 1}}>

          <KeepAwake />

          <TokboxSession
            user = {this.props.user }
            session = { this.props.session }
            credentials = { this.props.credentials }
            remoteUser = { this.props.remoteUser }
            localSessionStatus = { this.props.status }
            
            remoteUserState = { remoteUserState }
            localUserState = { localUserState }

            onSessionEnded = {(reason) => { this.handleRemoteEnded(reason) }}

            // update basic connection status of remote participant
            onRemoteUserConnecting = {() => { this.handleRemoteUserConnecting() }}
            onRemoteUserConnectingFailed = {() => { this.handleRemoteUserDisconnected() }}
            onRemoteUserConnected = {() => { this.handleRemoteUserConnected() }}
            onRemoteUserDisconnected = {() => { this.handleRemoteUserDisconnected() }}
            onRemoteUserReconnected = {() => { this.handleRemoteUserConnected() }}
            onRemoteUserUpdated = {(userState) => { this.updateRemoteUserState(userState) }}
            onRemoteUserReceivingAV = {(ops) => { this.handleRemoteUserReceivingAV(ops) }}
            onRemoteUserSendingAV = {(ops) => { this.handleRemoteUserSendingAV(ops) }}
            onRemoteUserReceivingAVThrottled = {() => { this.handleRemoteUserReceivingAVThrottled() }}
            onRemoteUserReceivingAVUnthrottled = {() => { this.handleRemoteUserReceivingAVUnthrottled() }}
            onRemoteUserVideoEnabled = {() => { this.handleRemoteUserVideoEnabled() }}
            onRemoteUserVideoDisabled = {() => { this.handleRemoteUserVideoDisabled() }}

            // update basic connection status of user
            onUserConnecting = {() => { this.handleUserConnecting() }}
            onUserConnectingFailed = {() => { this.handleUserDisconnected() }}
            onUserConnected = {() => { this.handleUserConnected() }}
            onUserDisconnected = {() => { this.handleUserDisconnected() }}
            onUserReconnected = {() => { this.handleUserConnected() }}
            onUserReceivingAV = {(ops) => { this.handleUserReceivingAV(ops) }}
            onUserSendingAV = {(ops) => { this.handleUserSendingAV(ops) }}
            onUserReceivingAVThrottled = {() => { this.handleUserReceivingAVThrottled() }}
            onUserReceivingAVUnthrottled = {() => { this.handleUserReceivingAVUnthrottled() }}

          >
            {this.showAudioMode() && (
            <AudioModeBackground user={ this.props.remoteUser } />
            )}

            <SessionHeader user={ this.props.remoteUser } />
            
            <View style={ styles.controlContainer }>
              <View style={ styles.controls }>
                { this.poorConnectionAlertVisible() && (
                <PoorConnectionWarning
                  isCustomer={this.props.isCustomer}
                  localThrottle={localUserState.connection.receivingThrottled}
                  remoteThrottle={remoteUserState.connection.receivingThrottled}
                />
                )}
                <CallTimer timer = { this.props.timer } />
                <SessionControls
                  cameraFlipEnabled={ localUserState.controls.cameraFlipEnabled }
                  onCameraFlipPressed= {() => { this.toggleCameraFlip() }}
                  speakerEnabled = { localUserState.controls.speakerEnabled}
                  onSpeakerPressed = {() => {  this.toggleSpeaker() }}
                  micEnabled = { localUserState.controls.micEnabled }
                  onMicPressed =  {() => { this.toggleMic() }}
                  videoEnabled = { localUserState.controls.videoEnabled }
                  onVideoPressed = {() => { this.toggleVideo() }}
                  endingCall = { this.state.endingCall }
                  onEndCallPressed = {() => { this.triggerEndCall(SESSION.END.DONE, true) }}
                />
              </View>
            </View>

          </TokboxSession>

          {/* If there is a remote user, but we haven't connected to them yet, show the initial connection screen */}
          {!!this.props.remoteUser.id && !this.props.status.began && (
          <UserConnecting
            user = { this.props.user }
            remoteUser = {this.props.remoteUser}
            remoteUserState = { remoteUserState }
            localUserState = { localUserState }
            status = { this.props.status }
            session = { this.props.session }
            secondsUntilError = { SESSION.TIME.CONNECT / DURATION.SECONDS }
            onError = {(reason) => { this.triggerEndCall(reason, false) }}
            onRemoteEnded = {(reason) => { this.handleRemoteEnded(reason) }}
            onCancel = {() => { this.triggerEndCall(SESSION.END.CANCEL, false) }}
          />
          )}
          
          {(this.props.status.ending || this.props.status.ended) && (
          <SessionEnding />
          )}
          
          {/* If the initial connection was established, but one party has been disconnected... */}
          <ReconnectionModal
            isVisible = { this.shouldShowReconnectionState() }
            user = { this.props.user }
            status = { this.props.status }
            remoteUser = {this.props.remoteUser}
            remoteUserConnection = {remoteUserState.connection}
            isCustomer = { this.props.isCustomer }
            isLinguist = { this.props.isLinguist }
            userConnection = { localUserState.connection }
            userApp = { localUserState.app }
            onEnd = {(reason) => { this.triggerEndCall(reason, false) }}
            onRetry = {(end, start) => { this.triggerRetryCall(end, start) }}
          />

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  controlContainer: {
    position: 'absolute',
    top: 0,
    left:0,
    bottom: 0,
    right: 0,
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

const mS = (state) => ({
  user: state.userProfile, // TODO: replace with state.activeUser.user
  newSessionParams: state.newSessionReducer.session,
  ...state.currentSessionReducer
});

const mD = {
  endSession,
  handleEndedSession,
  setRemoteUser,
  setSessionBegan,
  createNewSession,
  startTimer,
  stopTimer
}

export default connect(mS, mD)(SessionView);