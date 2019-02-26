import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import KeepAwake from "react-native-keep-awake";
import InCallManager from "react-native-incall-manager";
import IncomingCallView from "../IncomingCall/IncomingCallView";
import timer from "react-native-timer";
import { displayEndCall } from "../../../Util/Alerts";
import CallAvatarName from "../../../Components/CallAvatarName/CallAvatarName";
import NoVideoScreen from "../../../Components/NoVideoScreen/NoVideoScreen";
import { SessionHandler } from "../../../Components";
import styles from "./styles";
import { Images } from "../../../Themes";
import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import Slide from "../../../Effects/Slide/Slide";
import CallTimer from "../../../Components/CallTimer/CallTimer";
import SoundManager from "../../../Util/SoundManager";
import I18n from "../../../I18n/I18n";
import Instabug from "instabug-reactnative";

import {
  updateSettings as updateContactLinguistSettings,
  clearSettings as clearCallSettings,
  resetCounter,
  incrementCounter
} from "../../../Ducks/ContactLinguistReducer";
import {
  update as updateSettings,
  incrementTimer,
  resetTimerAsync,
  EndCall,
  clear,
  closeCall,
  closeCallReconnect,
  clearTokboxStatus
} from "../../../Ducks/ActiveSessionReducer";
import { cleanNotifications } from "../../../Util/PushNotification";
import {
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";
import { REASON, TIME, STATUS_TOKBOX } from "../../../Util/Constants";
import ConnectingView from "../Connecting/ConnectingView";
import { Fade } from "../../../Effects";
import PoorConnectionAlert from "../../../Components/PoorConnectionAlert/PoorConnectionAlert";
import FCM from "react-native-fcm";
import DeviceInfo from "react-native-device-info";

class LinguistView extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  async componentWillMount() {
    BackgroundStart();
    if (Platform.OS === "android") {
      FCM.removeAllDeliveredNotifications();
      FCM.cancelAllLocalNotifications();
    }
    const systemName = DeviceInfo.getSystemName();
    if (systemName == "Android") {
      const nativeBridge = NativeModules.InCallManager;
      const NativeModule = new NativeEventEmitter(nativeBridge);
      this.wiredHeadsetListener = NativeModule.addListener(
        "WiredHeadset",
        this.handleWiredHeadSetState
      );
    } else {
      InCallManager.getIsWiredHeadsetPluggedIn()
        .then(res => {
          InCallManager.start({ media: "video" });
          let isWiredHeadsetPluggedIn = res.isWiredHeadsetPluggedIn;
          if (isWiredHeadsetPluggedIn) {
            this.props.updateSettings({ speaker: false });
            InCallManager.setForceSpeakerphoneOn(false);
          } else {
            this.props.updateSettings({ speaker: true });
            InCallManager.setForceSpeakerphoneOn(true);
          }
        })
        .catch(err => {
          console.log(
            "InCallManager.getIsWiredHeadsetPluggedIn() catch: ",
            err
          );
        });
    }
    //Check for permission before the start method
    if (InCallManager.recordPermission !== "granted") {
      InCallManager.requestRecordPermission()
        .then(requestedRecordPermissionResult => {
          console.log(
            "InCallManager.requestRecordPermission() requestedRecordPermissionResult: ",
            requestedRecordPermissionResult
          );
        })
        .catch(err => {
          console.log("InCallManager.requestRecordPermission() catch: ", err);
        });
    }
    //InCallManager.start({ media: "audio" });
    //InCallManager.setForceSpeakerphoneOn(true);
  }
  handleWiredHeadSetState = deviceState => {
    InCallManager.start({ media: "audio" });
    if (deviceState.isPlugged) {
      this.props.updateSettings({ speaker: false });
      InCallManager.setForceSpeakerphoneOn(false);
    } else {
      this.props.updateSettings({ speaker: true });
      InCallManager.setForceSpeakerphoneOn(true);
    }
  };
  componentDidMount() {
    const {
      linguistTokboxSessionID,
      sessionID,
      firstName,
      lastName,
      preferredName,
      linguistProfile,
      deviceId,
      eventId
    } = this.props;
    const name = preferredName ? preferredName : firstName;
    const role = !!linguistProfile ? "Linguist" : "Customer";
    const device = !!deviceId ? ` DeviceID: ${deviceId} ` : "";
    const session = !!linguistTokboxSessionID
      ? ` SessionID: ${linguistTokboxSessionID} `
      : "";
    Instabug.setUserData(
      `${name} ${this.props.lastName} (${role})${device}${session}`
    );
  }

  async componentWillUnmount() {
    const systemName = DeviceInfo.getSystemName();
    if (systemName == "Android") {
      this.wiredHeadsetListener.remove();
    }

    BackgroundCleanInterval(this.props.timer);
    await timer.clearInterval("counterId");
    await timer.clearInterval("timer");
    this.props.resetTimerAsync();
    cleanNotifications();
    this.props.resetCounter();
    InCallManager.stop();
    this.props.updateSettings({
      modalReconnect: false
    });
    this.props.clearTokboxStatus();
    this.props.clearCallSettings();
    this.props.clear();
  }

  handleSessionInfoName() {
    const { customerName } = this.props;

    return customerName ? `${customerName.split(' undefined')[0]}` : "Customer";
  }

  selectImage = () => {
    const { avatarURL } = this.props;

    return avatarURL
      ? {
          uri: this.props.avatarURL
        }
      : Images.avatar;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.networkInfoType === "none") {
      //this.props.navigation.dispatch({ type: "Home" });
    }
  }

  callTimeOut = () => {
    const { incrementCounter } = this.props;
    this.props.updateContactLinguistSettings({
      counterId: timer.setInterval("counterId", () => incrementCounter(), 1000)
    });
  };

  closeCallLinguist = reason => {
    displayEndCall(() => {
      SoundManager["EndCall"].play();
      this.props.closeCall(REASON.DONE);
    });
  };

  render() {
    const { visible } = this.state;
    const { closeCall, elapsedTime, closeCallReconnect } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ visible: !visible })}
      >
        <View style={styles.fullPage}>
          <ModalReconnect closeCall={closeCallReconnect} />
          <SessionHandler
            image={this.selectImage()}
            sessionInfoName={this.handleSessionInfoName()}
          >
            <Slide visible={visible} min={0} max={112}>
              <View style={styles.containerControls}>
                {(this.props.localVideoWarning == "ENABLED" ||
                  this.props.signalVideoWarning == "ENABLED") && (
                  <PoorConnectionAlert isLinguist />
                )}
                <CallTimer
                  time={elapsedTime}
                  changeVisible={() => this.setState({ visible: !visible })}
                />

                <SessionControls
                  closeCall={this.closeCallLinguist}
                  reason={REASON.DONE}
                  switch={() => {}}
                  linguist
                />
              </View>
            </Slide>
          </SessionHandler>
          <KeepAwake />
          {this.props.tokboxStatus !== STATUS_TOKBOX.STREAM &&
            this.props.elapsedTime < 1 && (
              <View style={styles.containerIncomingCall}>
                <ConnectingView navigation={this.props.navigation} />
              </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mS = state => ({
  timer: state.activeSessionReducer.timer,
  elapsedTime: state.activeSessionReducer.elapsedTime,
  reconnecting: state.activeSessionReducer.reconnecting,
  linguistTokboxSessionToken: state.activeSessionReducer.tokboxToken,
  linguistTokboxSessionID: state.activeSessionReducer.tokboxID,
  tokboxStatus: state.activeSessionReducer.status,
  sessionID: state.activeSessionReducer.sessionID,
  token: state.auth.token,
  networkInfoType: state.networkInfo.type,
  customerName: state.activeSessionReducer.customerName,
  avatarURL: state.activeSessionReducer.avatarURL,
  counter: state.contactLinguist.counter,
  counterId: state.contactLinguist.counterId,
  firstName: state.userProfile.firstName, // For Instabug
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  linguistProfile: state.userProfile.linguistProfile,
  deviceId: state.auth.deviceId,
  eventId: state.events.id,
  localVideoWarning: state.activeSessionReducer.localVideoWarning,
  signalVideoWarning: state.activeSessionReducer.signalVideoWarning
});

const mD = {
  incrementTimer,
  updateSettings,
  resetTimerAsync,
  EndCall,
  clear,
  updateContactLinguistSettings,
  resetCounter,
  incrementCounter,
  clearCallSettings,
  closeCall,
  clearTokboxStatus,
  closeCallReconnect
};

export default connect(
  mS,
  mD
)(LinguistView);
