import React, { Component } from "react";
import { connect } from "react-redux";
import KeepAwake from "react-native-keep-awake";
import timer from "react-native-timer";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import CallTimer from "../../../Components/CallTimer/CallTimer";
import { SessionHandler } from "../../../Components";

import Instabug from "instabug-reactnative";
import {
  update as updateSettings,
  clear,
  createSession,
  resetTimerAsync,
  EndCall,
  verifyCall,
  closeCall,
  sendSignal,
  clearTokboxStatus
} from "../../../Ducks/ActiveSessionReducer";

import {
  clearSettings as clearCallSettings,
  updateSettings as updateContactLinguistSettings,
  resetCounter,
  incrementCounter
} from "../../../Ducks/ContactLinguistReducer";

import {
  View,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  Platform
} from "react-native";

import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import Slide from "../../../Effects/Slide/Slide";
import { Fade } from "../../../Effects";
import { Images } from "../../../Themes";
import styles from "./styles";

import I18n from "../../../I18n/I18n";
import ContactingLinguistView from "../ContactingLinguist/ContactingLinguistView";
import {
  emitLocalNotification,
  cleanNotifications
} from "../../../Util/PushNotification";
import {
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";
import {
  REASON,
  TIME,
  STATUS_TOKBOX,
  SUPPORTED_LANGS
} from "../../../Util/Constants";
import InCallManager from "react-native-incall-manager";
import PoorConnectionAlert from "../../../Components/PoorConnectionAlert/PoorConnectionAlert";

class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  componentWillMount() {
    BackgroundStart();

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

  async componentDidMount() {
    emitLocalNotification({
      title: "Call",
      message: `${I18n.t("contactingLinguist")} ...`
    });

    const name = this.props.preferredName
      ? this.props.preferredName
      : this.props.firstName;
    const role = !!this.props.linguistProfile ? "Linguist" : "Customer";
    const device = !!this.props.deviceId
      ? ` DeviceID: ${this.props.deviceId} `
      : "";
    const session = !!this.props.customerTokboxSessionID
      ? ` SessionID: ${this.props.customerTokboxSessionID} `
      : "";
    Instabug.setUserData(
      `${name} ${this.props.lastName} (${role})${device}${session}`
    );
    this.connectCall();
  }

  handleSessionInfoName() {
    const { linguist, customer } = this.props;
    const user = linguist ? linguist : customer ? customer : null;

    return user ? `${user.firstName} ${user.lastInitial}` : "Linguist";
  }

  selectImage = () => {
    const { linguist } = this.props;

    return linguist && linguist.avatarURL
      ? {
          uri: this.props.linguist.avatarURL
        }
      : Images.avatar;
  };

  async componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer); // remove interval of timer
    cleanNotifications();
    this.props.resetTimerAsync(); // reset call timer
    this.props.resetCounter();
    InCallManager.stop();
    this.props.updateSettings({
      modalReconnect: false
    });
    this.props.clearTokboxStatus();
    this.props.clearCallSettings();
    this.props.clear();
    timer.clearInterval("counterId");
    timer.clearInterval("timer");
  }

  componentWillReceiveProps(nextProps) {
    /*if (nextProps.networkInfoType === "none") {
      this.props.navigation.dispatch({ type: "Home" });
    }*/
  }

  connectCall = async () => {
    const userNativeLangIsSupported =
      SUPPORTED_LANGS.indexOf(this.props.primaryLangCode[3]) >= 0;
    const {
      createSession,
      primaryLangCode,
      secondaryLangCode,
      selectedCallTime,
      selectedScenarioId,
      customScenarioNote,
      token,
      eventID,
      customerLocation,
      event
    } = this.props;
    await createSession({
      primaryLangCode: userNativeLangIsSupported
        ? primaryLangCode[3]
        : SUPPORTED_LANGS[0],
      secondaryLangCode:
        event.id &&
        event.id !== "" &&
        event.defaultSecondaryLangCode !== undefined
          ? event.defaultSecondaryLangCode
          : secondaryLangCode,
      estimatedMinutes: selectedCallTime,
      scenarioID: selectedScenarioId,
      customScenarioNote: customScenarioNote,
      token: token,
      eventID: eventID,
      location: customerLocation
    });
    this.callTimeOut();
  };

  callTimeOut = () => {
    const { incrementCounter } = this.props;
    this.props.updateContactLinguistSettings({
      counterId: timer.setInterval("counterId", () => incrementCounter(), 1000)
    });
  };

  addMoreTime() {
    this.props.updateSettings({
      red: false,
      timeBtn: false,
      showAlert: false,
      extraTime: this.props.extraTime + 5 * 60
    });
  }

  render() {
    const { visible } = this.state;
    const { red, timeBtn, closeCall, elapsedTime } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ visible: !visible })}
      >
        <View style={styles.fullPage}>
          <SessionHandler
            image={this.selectImage()}
            sessionInfoName={this.handleSessionInfoName()}
          >
            <ModalReconnect
              closeCall={closeCall}
              callTimeOut={this.callTimeOut}
              reconnectCall={this.connectCall}
            />

            <Slide visible={visible} min={0} max={112}>
              <View style={styles.containerControls}>
                {(this.props.localVideoWarning == "ENABLED" ||
                  this.props.signalVideoWarning == "ENABLED") && (
                  <PoorConnectionAlert />
                )}
                <CallTimer
                  time={elapsedTime}
                  changeVisible={() => this.setState({ visible: !visible })}
                  red={red}
                  showButton={timeBtn}
                  buttonPress={() => this.addMoreTime()}
                />

                <SessionControls
                  closeCall={closeCall}
                  reason={REASON.DONE}
                  switch={() => {}}
                />
              </View>
            </Slide>
          </SessionHandler>
          <KeepAwake />

          {this.props.tokboxStatus !== STATUS_TOKBOX.STREAM &&
            this.props.elapsedTime < 1 && (
              <View style={styles.containerContacting}>
                <ContactingLinguistView
                  navigation={this.props.navigation}
                  callTimeOut={this.callTimeOut}
                  closeCall={closeCall}
                  connect={this.connectCall}
                  switch={() => {}}
                />
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
  speaker: state.activeSessionReducer.speaker,
  sessionID: state.activeSessionReducer.sessionID,
  customerTokboxSessionID: state.activeSessionReducer.tokboxID,
  customerTokboxSessionToken: state.activeSessionReducer.tokboxToken,
  token: state.auth.token,
  tokboxStatus: state.activeSessionReducer.status,
  selectedScenarioId: state.contactLinguist.selectedScenarioId,
  primaryLangCode: state.contactLinguist.primaryLangCode, //state.userProfile.selectedNativeLanguage
  secondaryLangCode: state.contactLinguist.secundaryLangCode,
  customScenarioNote: state.contactLinguist.customScenarioNote,
  selectedCallTime: state.activeSessionReducer.selectedTime,
  linguist: state.sessionInfo.linguist,
  counter: state.contactLinguist.counter,
  networkInfoType: state.networkInfo.type,
  counterId: state.contactLinguist.counterId,
  verifyCallId: state.callCustomerSettings.verifyCallId,
  extraTime: state.callCustomerSettings.extraTime,
  red: state.callCustomerSettings.red,
  timeBtn: state.callCustomerSettings.timeBtn,
  location: state.callCustomerSettings.location,
  eventID: state.events.id,
  localVideoWarning: state.activeSessionReducer.localVideoWarning,
  signalVideoWarning: state.activeSessionReducer.signalVideoWarning,
  customerLocation: state.activeSessionReducer.location,
  event: state.events
});

const mD = {
  createSession,
  updateSettings,
  resetTimerAsync,
  EndCall,
  clearCallSettings,
  resetCounter,
  updateContactLinguistSettings,
  incrementCounter,
  clear,
  verifyCall,
  closeCall,
  sendSignal,
  clearTokboxStatus
};

export default connect(
  mS,
  mD
)(CustomerView);
