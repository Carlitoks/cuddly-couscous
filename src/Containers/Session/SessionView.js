import React, {Component} from 'react';
import {Platform, Alert, NetInfo, AppState, View, Text, StyleSheet, NativeModules, NativeEventEmitter, TouchableWithoutFeedback} from 'react-native';
import KeepAwake from "react-native-keep-awake";
import { connect } from 'react-redux';
import I18n, {translateApiError} from "../../I18n/I18n";
import merge from 'lodash/merge';
import InCallManager from "react-native-incall-manager";

import api from "../../Config/AxiosConfig";

import {createNewSession, endSession, handleEndedSession, setRemoteUser, setSessionBegan, startTimer, stopTimer} from '../../Ducks/CurrentSessionReducer';

import {UserConnecting} from "./Components/UserConnecting";
import {SessionEnding} from "./Components/SessionEnding";
import {PoorConnectionWarning} from "./Components/PoorConnectionWarning";
import {ReconnectionModal} from "./Components/ReconnectionModal";
import {SessionHeader} from "./Components/SessionHeader";
import {AudioModeBackground} from "./Components/AudioModeBackground";
import {CallTimer} from "./Components/CallTimer";
import {SessionControls} from "./Components/SessionControls";
import {Session as OpentokSession} from "./Components/Opentok/Session";

import * as tests from './SessionView.tests';
import { SESSION, DURATION } from '../../Util/Constants';
import { createRecorder } from '../../Util/Forensics';

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
    // TODO: rename to `device`
    device: {
      platform: null,           // mobile|web|sip
      appState: '', // background|foreground
      networkConnection: 'unknown',
      hasNetworkConnection: true,
      // orientation: '' // TODO: portrait|landscape
      // batteryLevel: '', // TODO: track battery level, one day
      // headset: true/false
    }
  }, obj);
};


let recordSessionEvent = () => {};

class SessionView extends Component {
  
  constructor (props) {
    super(props);
    // set up forensics logger
    recordSessionEvent = createRecorder(`session.SessionView.`, {sessionID: this.props.session.id});
    recordSessionEvent('constructor');

    // anything referenced in the template and/or passed to child
    // components as props needs to be defined in `state`
    this.state = {

      // the reason we have extra state for tracking loading and ending
      // is to prevent trying to connect or disconnect from the underlying
      // Opentok session too early
      loaded: false,
      ending: false,
      endReason: false,

      // local view state for the session display (hide/show controls or other UI)
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
        device: {
          platform: 'mobile',
          appState: AppState.currentState,
          hasNetworkConnection: true,
        },
        controls: {
          cameraFlipEnabled: false,
          micEnabled: true,
          videoEnabled: props.session.avModePreference == "video",
          speakerEnabled: true,
        }
      }),
    };

    // seems redundant, but these are used to ensure some processes dom't execute twice
    // related to ending the session
    this.endingCall = false;
    this.unmounting = false;
    this.statusPollIntervalID = null;

    // used only on android
    this.wiredHeadsetListener = false;
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
    NetInfo.isConnected.addEventListener("connectionChange", this.handleNetworkIsConnected);
    
    // get initial network values before mounting the session
    Promise.all([
      NetInfo.getConnectionInfo().then((info) => {
        this.handleConnectionChange(info);
      }),
      NetInfo.isConnected.fetch().then((isConnected) => {
        this.updateLocalUserState({device: {hasNetworkConnection: isConnected}});
      })
    ]).finally(() => {
      // we use this as the trigger to initially allow the session component, otherwise
      // it may start loading, trigger an error, then remount and result in event listeners
      // being registered twice
      this.setState({loaded: true});
    });

    if (Platform.OS == "android") {
      this.androidComponentDidMount();
    }
    if (Platform.OS == "ios") {
      this.iosComponentDidMount();
    }

    this.TEST();
  }

  androidComponentDidMount () {
    const nativeBridge = NativeModules.InCallManager;
    const NativeModule = new NativeEventEmitter(nativeBridge);
    this.wiredHeadsetListener = NativeModule.addListener("WiredHeadset", (deviceState) => {
      this.setWiredHeadsetState(deviceState.isPlugged);
    });
  }

  iosComponentDidMount () {
    InCallManager.getIsWiredHeadsetPluggedIn()
    .then((res) => {
      this.setWiredHeadsetState(res.isWiredHeadsetPluggedIn);
    })
    .catch((err) => {
      recordSessionEvent('error.InCallManager.getIsWiredHeadsetPluggedIn', {error: err});
    });

    // HACK: https://github.com/globalprofessionalsearch/solo-mobile-app/issues/1932
    this.updateLocalUserState({device: {hasNetworkConnection: true}});
    this.setState({loaded: true});
  }

  componentWillUnmount () {
    recordSessionEvent('componentWillUnmount');
    this.cleanup();
  }

  cleanup () {
    recordSessionEvent('cleanup');
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener("connectionChange", this.handleConnectionChange);
    NetInfo.isConnected.removeEventListener("connectionChange", this.handleNetworkIsConnected);

    this.unmounting = true;
    InCallManager.stop();
    clearInterval(this.statusPollIntervalID);

    if (Platform.OS == "android") {
      this.androidComponentCleanup();
    }
    if (Platform.OS == "ios") {
      this.iosComponentCleanup();
    }
  }

  androidComponentCleanup () {
    if (!!this.wiredHeadsetListener) {
      this.wiredHeadsetListener.remove();
    }
  }

  iosComponentCleanup () {

  }

  setWiredHeadsetState(isPluggedIn) {
    if (isPluggedIn) {
      this.updateLocalUserState({controls: {speakerEnabled: false}});
      InCallManager.setForceSpeakerphoneOn(false);
    } else {
      this.updateLocalUserState({controls: {speakerEnabled: true}});
      InCallManager.setForceSpeakerphoneOn(true);
    }
  }

  handleAppStateChange = (nextState) => {
    this.updateLocalUserState({device: {appState: nextState}});
    switch (nextState) {
      case 'background': this.appWillEnterBackground(); break;
      case 'foreground': this.appWillEnterForeground(); break;
      case 'inactive': this.appWillBeSuspended(); break;
    }
  };
  
  appWillEnterBackground () {

  }

  appWillEnterForeground () {

  }

  appWillBeSuspended () {

  }

  handleConnectionChange = (info) => {
    const currentState = info.effectiveType.toLowerCase();
    const prevState = this.state.networkConnection;
    this.handleNetworkConnectionTypeChanged(prevState, currentState);
  };

  handleNetworkIsConnected = (isConnected) => {
    recordSessionEvent('handleNetworkIsConnected', {isConnected});
    const previouslyConnected = this.state.localUserState.device.hasNetworkConnection;
    this.updateLocalUserState({device: {hasNetworkConnection: isConnected}});
    if (!previouslyConnected && isConnected) {
      this.handleRegainedNetworkConnection();
    } else if (previouslyConnected && !isConnected) {
      this.handleLostNetworkConnection();
    }
  };

  handleNetworkConnectionTypeChanged (prevState, currentState) {
    recordSessionEvent('handleNetworkConnectionTypeChanged', prevState, currentState);
    this.updateLocalUserState({device: {networkConnection: currentState}});
  }

  // we treat both the local and remote users as disconnected, because
  // the local user will need to reconnect in order to know if the
  // remote user is still connected
  handleLostNetworkConnection () {
    this.handleUserDisconnected();
    this.handleRemoteUserDisconnected();
  }

  handleRegainedNetworkConnection () {
    this.handleUserConnecting();
  }

  // hide/show call controls
  toggleDisplayControls () {
    this.setState({display: {controlsVisible: !this.state.display.controlsVisible}});
  }

  toggleVideo () {
    const {controls} = this.state.localUserState;
    const enabled = !controls.videoEnabled;
    this.updateLocalUserState({
      controls: {videoEnabled: enabled},
      connection: {sendingVideo: enabled || controls.cameraFlipEnabled}
    });

    // TODO: only update this in case of legacy version - move this to Session
    this.updateRemoteUserState({connection: {receivingVideo: !controls.videoEnabled}});
  }

  toggleMic () {
    const enabled = !this.state.localUserState.controls.micEnabled;
    this.updateLocalUserState({
      controls: {micEnabled: enabled},
      connection: {sendingAudio: enabled}
    });

    // TODO: only update this in case of legacy version - move this to Session
    this.updateRemoteUserState({connection: {receivingAudio: enabled}});
  }

  toggleSpeaker () {
    const enabled = !this.state.localUserState.controls.speakerEnabled;
    this.updateLocalUserState({controls: {speakerEnabled: enabled}});
    InCallManager.setForceSpeakerphoneOn(enabled);
  }

  toggleCameraFlip () {
    const {controls} = this.state.localUserState;
    const enabled = !controls.cameraFlipEnabled;
    this.updateLocalUserState({
      controls: {cameraFlipEnabled: enabled},
      connection: {sendingVideo: enabled || controls.videoEnabled}
    });
    
    // TODO: only update this in case of legacy version - move this to Session
    this.updateRemoteUserState({connection: {receivingVideo: enabled || controls.videoEnabled}});
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
        !this.state.localUserState.device.hasNetworkConnection
        || !this.state.localUserState.connection.connected
        || !this.state.remoteUserState.connection.connected
      )
    );
  }

  beginSession () {
    if (this.props.status.began) {
      return;
    }
    recordSessionEvent('beginSession');
    this.props.setSessionBegan();
    InCallManager.start({media: 'audio'});
    if (this.state.localUserState.controls.speakerEnabled) {
      InCallManager.setForceSpeakerphoneOn(true);
    }

    this.statusPollIntervalID = setInterval(() => {
      this.handleSessionStatusPoll();
    }, 5 * DURATION.SECONDS);
  }

  handleSessionStatusPoll () {
    if (this.ending || this.unmounting) {
      clearInterval(this.statusPollIntervalID);
      return;
    }

    api.get(`/sessions/${this.props.session.id}/status`)
    .then((res) => {
      if (this.ending || this.unmounting) {
        return;
      }
      // check if session was ended by remote party
      if (res.data.session.ended) {
        this.handleRemoteEnded(res.data.session.endReason);
      }
    })
    .catch(() => {
      // NOTE: we don't handle errors here on purpose.  If the user has lost connection, that
      // is handled by the reconnection modal, and triggered by other things.
    });
  }

  handleUserConnecting () {
    recordSessionEvent('handleUserConnecting');
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      connected: false,
      connecting: true,
    }});
  }

  handleUserConnected () {
    recordSessionEvent('handleUserConnected');
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
    recordSessionEvent('handleUserReceivingAV');
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
    recordSessionEvent('handleUserSendingAV');
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      initiallySending: true,
      sendingAudio: ops.audio,
      sendingVideo: ops.video,
    }});
  }

  handleUserDisconnected () {
    recordSessionEvent('handleUserDisconnected');
    this.updateLocalUserState({connection: {
      ...this.state.localUserState.connection,
      connected: false,
      connecting: false,
      sendingAudio: false,
      sendingVideo: false,
      receivingThrottled: false,
      receivingAudio: false,
      receivingVideo: false,
    }});
    this.props.stopTimer();
  }

  handleUserReceivingAVThrottled () {
    recordSessionEvent('handleUserReceivingAVThrottled');
    this.updateLocalUserState({connection: {receivingThrottled: true}});
  }

  handleUserReceivingAVUnthrottled () {
    recordSessionEvent('handleUserReceivingAVUnthrottled');
    this.updateLocalUserState({connection: {receivingThrottled: false}});
  }

  handleRemoteUserConnecting () {
    recordSessionEvent('handleRemoteUserConnecting');
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      connected: false,
      connecting: true,
    }});
  }

  handleRemoteUserConnected () {
    recordSessionEvent('handleRemoteUserConnected');
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
    recordSessionEvent('handleRemoteUserReceivingAV');
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
    recordSessionEvent('handleRemoteUserSendingAV');
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      initiallySending: true,
      sendingAudio: ops.audio,
      sendingVideo: ops.video,
    }});
  }

  handleRemoteUserDisconnected () {
    recordSessionEvent('handleRemoteUserDisconnected');
    this.updateRemoteUserState({connection: {
      ...this.state.remoteUserState.connection,
      connected: false,
      connecting: false,
      sendingAudio: false,
      sendingVideo: false,
      receivingThrottled: false,
      receivingAudio: false,
      receivingVideo: false,
    }});
    this.updateLocalUserState({connection: {
      receivingThrottled: false,
      receivingAudio: false,
      receivingVideo: false,
    }});
    this.props.stopTimer();
  }

  handleRemoteUserReceivingAVThrottled () {
    recordSessionEvent('handleRemoteUserReceivingAVThrottled');
    this.updateRemoteUserState({connection: {receivingThrottled: true}});
  }

  handleRemoteUserReceivingAVUnthrottled () {
    recordSessionEvent('handleRemoteUserReceivingAVUnthrottled');
    this.updateRemoteUserState({connection: {receivingThrottled: false}});
  }

  handleRemoteUserVideoEnabled () {
    recordSessionEvent('handleRemoteUserVideoEnabled');
    this.updateLocalUserState({connection: {receivingVideo: true}});
  }

  handleRemoteUserVideoDisabled () {
    recordSessionEvent('handleRemoteUserVideoDisabled');
    this.updateLocalUserState({connection: {receivingVideo: false}});
  }

  handleRemoteUserAudioEnabled () {
    recordSessionEvent('handleRemoteUserAudioEnabled');
    this.updateLocalUserState({connection: {receivingAudio: true}});
  }

  handleRemoteUserAudioDisabled () {
    recordSessionEvent('handleRemoteUserAudioDisabled');
    this.updateLocalUserState({connection: {receivingAudio: false}});
  }

  handleRemoteUserControlStateChanged (controls) {
    recordSessionEvent('handleRemoteUserControlStateChanged');
    this.updateRemoteUserState({
      controls,
      connection: {
        sendingAudio: controls.micEnabled,
        sendingVideo: controls.videoEnabled || controls.cameraFlipEnabled
      }
    });
  }

  updateRemoteUserState (data, cb = null) {
    this.setState({remoteUserState: merge({}, this.state.remoteUserState, data)}, cb);
  }

  updateLocalUserState(data, cb = null) {
    this.setState({localUserState: merge({}, this.state.localUserState, data)}, cb);
  }

  showAudioMode () {
    const {localUserState} = this.state;
    return !localUserState.device.hasNetworkConnection || !localUserState.connection.receivingVideo;
  }

  // call ended by user locally
  triggerEndCall (reason, confirm = false) {
    recordSessionEvent('triggerEndCall');
    if (confirm) {
      Alert.alert(I18n.t("actions.confirm"), I18n.t('session.confirmEnd'), [
        {text: I18n.t('actions.yes'), onPress: () => {
          this._triggerEndCall(reason);
        }},
        {text: I18n.t('actions.no')}
      ]);
    } else {
      this._triggerEndCall(reason);
    }
  }

  _triggerEndCall (reason) {
    if (this.props.status.ending || this.endingCall) {
      return;
    }

    // this state update will trigger sending the end signal
    // to ther participants
    this.endingCall = true;
    this.setState({ending: true, endReason: reason}, () => {
      // injecting a small delay before actually ending and disconnecting
      setTimeout(() => {
        this.props.endSession(reason).finally(() => {
          this.cleanup();
          this.endingCall = false;
          this.props.navigation.dispatch({type: this.chooseSessionEndedView(true)});
        });
      }, 1000);
    });
  }

  // call was ended by the remote participant
  handleRemoteEnded (reason) {
    recordSessionEvent('handleRemoteEnded', {reason});

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
    const {session, isCustomer, isLinguist} = this.props;
    const {began} = this.props.status;
    const {hasNetworkConnection} = this.state.localUserState.device;
    let targetView = "Home";
    let alert = false;

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
        if (isLinguist) {
          alert = {
            title: I18n.t('notification'),
            body: "You were disconnected from the call."
          };
        }
        break;
      }
      case SESSION.END.DISCONNECT_REMOTE: {
        targetView = (isCustomer) ? "CustomerRetryView" : "RateView"
        if (isLinguist) {
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
        if (isLinguist) {
          alert = {
            title: I18n.t('error'),
            body: "We were unable to connect you to the customer." //I18n.t()
          };
        }
        break;
      }
      case SESSION.END.FAILURE_REMOTE: {
        targetView = (isCustomer) ? "CustomerRetryView" : "Home";
        if (isLinguist) {
          alert = {
            title: I18n.t('error'),
            body: "The customer was unable to connect." //I18n.t()
          };
        }
        break;
      }
      case SESSION.END.ABORTED: {
        targetView = "Home";
        alert = {
          title: I18n.t('notification'),
          body: "Call has been ended."
        };
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
    recordSessionEvent('triggerRetryCall');
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

  isTransitioning () {
    const {status} = this.props;
    return status.ending || status.ended || status.creating || this.state.ending;
  }

  render () {
    const {localUserState, remoteUserState} = this.state;

    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleDisplayControls() }>
        <View style={{flex: 1}}>

          <KeepAwake />

          {this.state.loaded && (
          <OpentokSession
            user = {this.props.user }
            session = { this.props.session }
            credentials = { this.props.credentials }
            remoteUser = { this.props.remoteUser }
            localSessionStatus = { this.props.status }
            ending = { this.state.ending }
            endReason = { this.state.endReason }
            
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
            onRemoteUserAudioEnabled = {() => { this.handleRemoteUserAudioEnabled() }}
            onRemoteUserAudioDisabled = {() => { this.handleRemoteUserAudioDisabled() }}
            onRemoteUserControlStateChanged = {(controls) => { this.handleRemoteUserControlStateChanged(controls) }}

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

            // audio mode background - needs to be rendered in a specific place relative
            // to the Opentok publisher/subscriber
            audioModeBackground={this.showAudioMode() ? (<AudioModeBackground user={ this.props.remoteUser } />) : (<React.Fragment />)}
          >

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

          </OpentokSession>
          )}

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
          
          {/* TODO: make this more interesting, like fade in or something */}
          {(this.state.ending || this.props.status.ending || this.props.status.ended) && (
          <SessionEnding />
          )}
          
          {/* If the initial connection was established, but one party has been disconnected... */}
          {!this.isTransitioning() && (
          <ReconnectionModal
            isVisible = { this.shouldShowReconnectionState() }
            user = { this.props.user }
            status = { this.props.status }
            remoteUser = {this.props.remoteUser}
            remoteUserConnection = {remoteUserState.connection}
            isCustomer = { this.props.isCustomer }
            isLinguist = { this.props.isLinguist }
            userConnection = { localUserState.connection }
            localDevice = { localUserState.device }
            onEnd = {(reason) => { this.triggerEndCall(reason, false) }}
            onRetry = {(end, start) => { this.triggerRetryCall(end, start) }}
          />
          )}

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