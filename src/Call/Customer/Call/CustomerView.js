import React, { Component, Ref } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";
import KeepAwake from "react-native-keep-awake";
import CallAvatarName from "../../../Components/CallAvatarName/CallAvatarName";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import CallTimer from "../../../Components/CallTimer/CallTimer";
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

import {
  clearSettings as clearCallSettings,
  updateSettings as updateContactLinguistSettings,
  resetCounter,
  incrementCounter
} from "../../../Ducks/ContactLinguistReducer";
import { GetSessionInfoLinguist } from "../../../Ducks/SessionInfoReducer";

import {
  Button,
  View,
  Text,
  Image,
  Switch,
  Platform,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import Slide from "../../../Effects/Slide/Slide";
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
import {
  REASON,
  STATUS_TOKBOX,
  TIME,
  PLATFORM,
  TOKBOX_EVENTS
} from "../../../Util/Constants";
import InCallManager from "react-native-incall-manager";
class CustomerView extends Component {
  constructor() {
    super();
    this.ref;
    this.state = {
      visible: true,
      red: false,
      timeBtn: false,
      showAlert: false,
      extraTime: 0
    };
  }

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
    const { linguist, customer } = this.props;
    const user = linguist ? linguist : customer ? customer : null;

    return user ? `${user.firstName} ${user.lastInitial}` : "User";
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
    InCallManager.stop();
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
        if (!!callTime && callTime + this.state.extraTime < 60 * 60) {
          if (
            this.props.elapsedTime >=
            callTime + this.state.extraTime - 2 * 60
          ) {
            this.setState({
              red: true
            });
            if (!this.state.showAlert) {
              this.setState({
                showAlert: true
              });
              this.displayTimeAlert();
            }
          }
        }

        if (
          this.props.elapsedTime > callTime + this.state.extraTime
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

  displayTimeAlert = () => {
    Alert.alert(
      I18n.t("extraTime1"),
      I18n.t("extraTime2"),
      [
        {
          text: I18n.t("extraTimeA1"),
          onPress: () => {
            let extraTime = this.state.extraTime + 5 * 60;
            console.log("Add Pressed");
            this.setState({
              red: false,
              showAlert: false,
              extraTime: extraTime
            });
          }
          //style: "cancel"
        },
        {
          text: I18n.t("extraTimeA2"),
          onPress: () => {
            this.setState({
              timeBtn: true
            });
            console.log("No Pressed");
          }
        }
      ],
      { cancelable: false }
    );
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
      updateSettings,
      customScenarioNote
    } = this.props;

    try {
      AsyncCreateSession({
        type: "immediate_virtual",
        matchMethod: "first_available",
        primaryLangCode:
          primaryLangCode[3] !== "eng" && primaryLangCode[3] !== "cmn"
            ? "eng"
            : primaryLangCode[3],
        secundaryLangCode: secundaryLangCode,
        estimatedMinutes: selectedCallTime,
        scenarioID: selectedScenarioId,
        customScenarioNote,
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
    this.props.updateContactLinguistSettings({
      modalReconnect: false,
      customScenarioNote: ""
    });
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

  switchCamera() {
    if (this.ref && typeof this.ref !== "string") {
      this.ref.switchCamera();
    }
  }

  renderSubscriber() {
    const {
      customerTokboxSessionID,
      updateContactLinguistSettings,
      counterId,
      timer
    } = this.props;

    return (
      <Subscriber
        sessionId={customerTokboxSessionID}
        style={styles.background}
        onSubscribeStart={() => {
          console.log("SubscriberStart");
          this.startTimer();
          updateContactLinguistSettings({
            modalReconnect: false
          });
          clearInterval(counterId);
        }}
        onSubscribeError={() => {
          console.log("SubscriberError");
        }}
        onSubscribeStop={() => {
          console.log("SubscriberStop");
          BackgroundCleanInterval(timer);
          updateContactLinguistSettings({
            modalReconnect: true
          });
          this.callTimeOut();
        }}
      />
    );
  }

  renderNoVideoScreen() {
    return (
      <View style={styles.noVideoContainer}>
        <Text style={styles.noVideoName}>{this.handleSessionInfoName()}</Text>

        <View style={styles.noVideoAvatarContainer}>
          <Image style={styles.noVideoAvatar} source={this.selectImage()} />
        </View>
      </View>
    );
  }

  render() {
    const { visible } = this.state;
    const { disabledSubscriber, customerTokboxSessionID } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(visible);
          this.setState({ visible: !visible });
        }}
      >
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
              {customerTokboxSessionID && this.renderSubscriber()}
              {disabledSubscriber && this.renderNoVideoScreen()}
            </View>
            <View
              style={
                this.props.video ? styles.publisherBox : styles.hidePublisherBox
              }
            >
              {this.props.customerTokboxSessionID && (
                <Publisher
                  sessionId={this.props.customerTokboxSessionID}
                  style={styles.publisher}
                  mute={!this.props.mic}
                  video={this.props.video}
                  ref={ref => {
                    if (ref) {
                      this.ref = ref;
                    }
                  }}
                  onPublishStart={() => {
                    console.log("Publisher started");

                    if (!this.props.video) {
                      OpenTok.sendSignal(
                        this.props.customerTokboxSessionID,
                        TOKBOX_EVENTS.TOGGLE_VIDEO_CUSTOMER,
                        (!this.props.video).toString()
                      );
                    }
                  }}
                  onPublishError={() => {
                    console.log("Publisher started error");
                  }}
                />
              )}
            </View>
            {!disabledSubscriber && (
              <CallAvatarName
                imageSource={this.selectImage()}
                sessionInfoName={this.handleSessionInfoName()}
              />
            )}

            <Slide
              visible={visible}
              min={0}
              max={112}
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "100%"
              }}
            >
              <View style={styles.containerControls}>
                <CallTimer
                  time={this.props.elapsedTime}
                  changeVisible={() => this.setState({ visible: !visible })}
                  red={this.state.red}
                  showButton={this.state.timeBtn}
                  buttonPress={() => {
                    let extraTime = this.state.extraTime + 5 * 60;
                    this.setState({
                      red: false,
                      timeBtn: false,
                      showAlert: false,
                      extraTime: extraTime
                    });
                  }}
                />

                <SessionControls
                  ref={this.ref}
                  closeCall={this.closeCall}
                  reason={REASON.DONE}
                  switch={this.switchCamera.bind(this)}
                />
              </View>
            </Slide>
          </View>
          <KeepAwake />

          {this.props.tokboxStatus !== STATUS_TOKBOX.STREAM &&
            this.props.elapsedTime < 1 && (
              <View style={styles.containerContacting}>
                <ContactingLinguistView
                  navigation={this.props.navigation}
                  callTimeOut={this.callTimeOut}
                  closeCall={this.closeCall}
                  switch={this.switchCamera.bind(this)}
                />
              </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mS = state => ({
  mic: state.callCustomerSettings.mic,
  video: state.callCustomerSettings.video,
  timer: state.callCustomerSettings.timer,
  elapsedTime: state.callCustomerSettings.elapsedTime,
  sessionID: state.tokbox.sessionID,
  customerTokboxSessionID: state.tokbox.tokboxID,
  customerTokboxSessionToken: state.tokbox.tokboxToken,
  token: state.auth.token,
  tokboxStatus: state.tokbox.status,
  disabledSubscriber: state.tokbox.disabledSubscriber,
  selectedScenarioId: state.contactLinguist.selectedScenarioId,
  primaryLangCode: state.userProfile.selectedNativeLanguage,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  customScenarioNote: state.contactLinguist.customScenarioNote,
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
