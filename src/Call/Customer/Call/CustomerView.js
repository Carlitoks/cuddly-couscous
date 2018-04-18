import React, { Component, Ref } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";
import KeepAwake from "react-native-keep-awake";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import {
  updateSettings,
  AsyncCreateSession,
  incrementTimer,
  resetTimerAsync,
  clearSettings,
  EndCall,
  verifyCall
} from "../../../Ducks/CallCustomerSettings";
import {
  tokConnect,
  tokDisConnect,
  update,
  clear
} from "../../../Ducks/tokboxReducer";
import CallButtonToggle from "./../../../Components/CallButtonToggle/CallButtonToggle";
import {
  clearSettings as clearCallSettings,
  updateSettings as updateContactLinguistSettings,
  resetCounter,
  incrementCounter
} from "../../../Ducks/ContactLinguistReducer";
import { GetSessionInfoLinguist } from "../../../Ducks/SessionInfoReducer";

import { Button, View, Text, Image, Switch, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CallButton } from "../../../Components/CallButton/CallButton";
import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";

import { Colors, Images } from "../../../Themes";
import { fmtMSS } from "../../../Util/Helpers";
import styles from "./styles";

import I18n from "../../../I18n/I18n";
import ContactingLinguistView from "../ContactingLinguist/ContactingLinguistView";
import {
  emitLocalNotification,
  cleanNotifications
} from "../../../Util/PushNotification";
import {
  BackgroundInterval,
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { IMAGE_STORAGE_URL } from "../../../Config/env";
import { REASON, STATUS_TOKBOX, TIME, PLATFORM } from "../../../Util/Constants";

class CustomerView extends Component {
  ref: Ref<Publisher>;

  componentWillMount() {
    BackgroundStart();
  }

  async componentDidMount() {
    const { customerTokboxSessionToken, customerTokboxSessionID } = this.props;

    if (Platform.OS === PLATFORM.ANDROID) {
      emitLocalNotification({
        title: "Call",
        message: `${I18n.t("contactingLinguist")} ...`
      });
    }

    this.reconnectCall();
  }

  handleSessionInfoName() {
    if (this.props.linguist) {
      return `${this.props.linguist.firstName} ${
        this.props.linguist.lastInitial
        }`;
    } else if (this.props.customer) {
      return `${this.props.customer.firstName} ${
        this.props.customer.lastInitial
        }`;
    } else {
      return `User`;
    }
  }

  selectImage = () => {
    const { linguist } = this.props;

    return linguist && linguist.avatarURL
      ? {
        uri: this.props.linguist.avatarURL
      }
      : Images.avatar;
  };
  componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer); // remove interval of timer
    Platform.OS === PLATFORM.ANDROID && cleanNotifications();
    this.props.resetTimerAsync(); // reset call timer
    clearInterval(this.props.counterId);
    clearInterval(this.props.timer);
    this.props.resetCounter();
    OpenTok.disconnectAll();
    /*
    if (this.props.networkInfoType !== "none") {
      this.props.clear();
      this.props.clearSettings(); // clean call info
    }*/
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.networkInfoType === "none") {
      this.props.navigation.dispatch({ type: "Home" });
    }
  }

  startTimer = () => {
    const { sessionID, token, selectedCallTime } = this.props;
    const callTime = selectedCallTime * 60;
    this.props.GetSessionInfoLinguist(sessionID, token);
    this.props.updateSettings({
      timer: BackgroundInterval(() => {
        if (
          this.props.elapsedTime > callTime &&
          !this.props.customerExtraTime
        ) {
          this.closeCall(REASON.DONE);
        } else {
          this.props.incrementTimer();

          if (Platform.OS === PLATFORM.ANDROID) {
            emitLocalNotification({
              title: I18n.t("call"),
              message: `${I18n.t("callInProgress")} ${fmtMSS(
                this.props.elapsedTime
              )}`
            });
          }
        }
      }, 1000)
    });
  };

  verifyCallCustomer = () => {
    this.props.updateSettings({
      verifyCallId: setInterval(
        () =>
          this.props.verifyCall(
            this.props.sessionID,
            this.props.token,
            this.props.verifyCallId
          ),
        5000
      )
    });
  };

  reconnectCall = () => {
    const {
      customerTokboxSessionToken,
      customerTokboxSessionID,
      tokConnect,
      sessionID,
      primaryLangCode,
      secundaryLangCode,
      selectedCallTime,
      selectedScenarioId,
      token,
      AsyncCreateSession,
      updateSettings
    } = this.props;

    try {
      AsyncCreateSession({
        type: "immediate_virtual",
        matchMethod: "first_available",
        primaryLangCode: primaryLangCode,
        secundaryLangCode: secundaryLangCode,
        estimatedMinutes: selectedCallTime,
        scenarioID: selectedScenarioId,
        token: token
      }).then(async response => {
        const { tokboxSessionID, tokboxSessionToken } = response;
        this.verifyCallCustomer();
        await tokConnect(tokboxSessionID, tokboxSessionToken);
      });
    } catch (e) {
      console.log("The session could not be created", e);
    }
  };

  closeCall = async reason => {
    const { customerTokboxSessionID, sessionID, token } = this.props;

    clearInterval(this.props.counterId);
    this.props.updateContactLinguistSettings({ modalReconnect: false });
    this.props.resetCounter();

    if (reason === REASON.RETRY) {
      BackgroundCleanInterval(this.props.timer);
      this.props.resetTimerAsync();
      Platform.OS === PLATFORM.ANDROID && cleanNotifications();
    }

    if (
      (reason === REASON.CANCEL ||
        reason === REASON.DONE ||
        reason === REASON.TIMEOUT) &&
      customerTokboxSessionID
    ) {
      await this.props.tokDisConnect(customerTokboxSessionID);
    }

    sessionID && (await this.props.EndCall(sessionID, reason, token));
  };

  callTimeOut = () => {
    const { incrementCounter } = this.props;
    this.props.updateContactLinguistSettings({
      counterId: setInterval(() => incrementCounter(), 1000)
    });
  };

  render() {
    return (
      <View style={styles.containerT}>
        <ModalReconnect
          closeCall={this.closeCall}
          callTimeOut={this.callTimeOut}
          reconnectCall={this.reconnectCall}
        />
        <View
          style={
            this.props.tokboxStatus === STATUS_TOKBOX.STREAM
              ? styles.containerCall
              : styles.containerHiddenCall
          }
        >
          <View style={styles.backgroundContainer}>
            {this.props.customerTokboxSessionID && (
              <Subscriber
                sessionId={this.props.customerTokboxSessionID}
                style={styles.background}
                mute={!this.props.speaker}
                onSubscribeStart={() => {
                  console.log("SubscriberStart");
                  this.startTimer();
                  this.props.updateContactLinguistSettings({
                    modalReconnect: false
                  });
                  clearInterval(this.props.counterId);
                }}
                onSubscribeError={() => {
                  console.log("SubscriberError");
                }}
                onSubscribeStop={() => {
                  console.log("SubscriberStop");
                  BackgroundCleanInterval(this.props.timer);
                  this.props.updateContactLinguistSettings({
                    modalReconnect: true
                  });
                  this.callTimeOut();
                }}
              />
            )}
          </View>
          <View style={styles.publisherBox}>
            {this.props.customerTokboxSessionID && (
              <Publisher
                sessionId={this.props.customerTokboxSessionID}
                style={styles.publisher}
                mute={!this.props.mic}
                video={this.props.video}
                ref={ref => {
                  this.ref = ref;
                }}
                onPublishStart={() => {
                  console.log("Publisher started");
                }}
                onPublishError={() => {
                  console.log("Publisher started error");
                }}
              />
            )}
          </View>
          <View style={styles.topContainer}>
            <TopViewIOS />
            <View style={styles.inlineContainer}>
              <Image style={styles.smallAvatar} source={this.selectImage()} />
            </View>
            <Text style={styles.callerNameText}>
              {this.handleSessionInfoName()}
            </Text>

            {/*<View style={styles.inlineContainer}>
              <Icon style={styles.icon} size={25} name="room" />
              <Text style={styles.locationText}>San Diego, CA</Text>
            </View>*/}

            <View style={styles.inlineContainer}>
              <Text style={styles.incomingCallText}>
                {fmtMSS(this.props.elapsedTime)}
              </Text>
            </View>
          </View>
          <View style={styles.containerSwitch}>
            <Switch
              onValueChange={customerExtraTime =>
                this.props.updateSettings({
                  customerExtraTime: customerExtraTime
                })
              }
              value={this.props.customerExtraTime}
              onTintColor={Colors.onTintColor}
              thumbTintColor={Colors.thumbTintColor}
              tintColor={Colors.tintColor}
            />
            <Text style={styles.extraTime}>{I18n.t("allowExtraTime")}</Text>
          </View>
          <View style={styles.containerButtons}>
            <CallButtonToggle
              onPress={() => {
                if (typeof this.ref !== "string") {
                  this.ref.switchCamera();
                }
              }}
              toggle={true}
              active={this.props.rotate}
              name="CustomerCamera"
              icon="switch-camera"
              iconToggled="switch-camera"
              buttonSize={65}
              iconSize={30}
            />
            <CallButtonToggle
              toggle={true}
              active={this.props.speaker}
              name="CustomerSpeaker"
              icon="volume-up"
              iconToggled="volume-up"
              buttonSize={65}
              iconSize={30}
            />
            <CallButton
              onPress={() => {
                this.closeCall(REASON.DONE);
              }}
              buttonColor="red"
              toggle={false}
              icon="call-end"
              buttonSize={65}
              iconSize={30}
            />
            <CallButtonToggle
              toggle={true}
              active={this.props.mic}
              name="CustomerMute"
              icon="mic"
              iconToggled="mic"
              buttonSize={65}
              iconSize={30}
            />
            <CallButtonToggle
              toggle={true}
              active={this.props.video}
              name="CustomerVideo"
              icon="videocam"
              iconToggled="videocam"
              opacity={0.7}
              buttonSize={65}
              iconSize={30}
            />
          </View>
        </View>
        <KeepAwake />

        {this.props.tokboxStatus !== STATUS_TOKBOX.STREAM &&
          this.props.elapsedTime < 1 && (
            <View style={styles.containerContacting}>
              <ContactingLinguistView
                navigation={this.props.navigation}
                callTimeOut={this.callTimeOut}
                closeCall={this.closeCall}
              />
            </View>
          )}
      </View>
    );
  }
}

const mS = state => ({
  mic: state.callCustomerSettings.mic,
  video: state.callCustomerSettings.video,
  rotate: state.callCustomerSettings.rotate,
  speaker: state.callCustomerSettings.speaker,
  timer: state.callCustomerSettings.timer,
  elapsedTime: state.callCustomerSettings.elapsedTime,
  sessionID: state.tokbox.sessionID,
  customerTokboxSessionID: state.tokbox.tokboxID,
  customerTokboxSessionToken: state.tokbox.tokboxToken,
  token: state.auth.token,
  tokboxStatus: state.tokbox.status,
  selectedScenarioId: state.contactLinguist.selectedScenarioId,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  selectedCallTime: state.callCustomerSettings.selectedTime,
  customerExtraTime: state.callCustomerSettings.customerExtraTime,
  linguist: state.sessionInfo.linguist,
  counter: state.contactLinguist.counter,
  networkInfoType: state.networkInfo.type,
  counterId: state.contactLinguist.counterId,
  verifyCallId: state.callCustomerSettings.verifyCallId
});

const mD = {
  AsyncCreateSession,
  incrementTimer,
  updateSettings,
  resetTimerAsync,
  clearSettings,
  tokConnect,
  tokDisConnect,
  EndCall,
  clearCallSettings,
  update,
  resetCounter,
  GetSessionInfoLinguist,
  updateContactLinguistSettings,
  incrementCounter,
  clear,
  verifyCall
};

export default connect(mS, mD)(CustomerView);
