import React, { Component, Ref } from "react";
import {
  Button,
  View,
  Image,
  Text,
  Alert,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import KeepAwake from "react-native-keep-awake";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images } from "../../../Themes";
import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import Fade from "../../../Effects/Fade/Fade";

import I18n from "../../../I18n/I18n";
import InCallManager from "react-native-incall-manager";

import {
  updateSettings as updateContactLinguistSettings,
  clearSettings as clearCallSettings,
  resetCounter,
  incrementCounter
} from "../../../Ducks/ContactLinguistReducer";
import {
  updateSettings,
  incrementTimer,
  resetTimerAsync,
  EndCall,
  clearSettings
} from "../../../Ducks/CallLinguistSettings";
import {
  emitLocalNotification,
  cleanNotifications
} from "../../../Util/PushNotification";
import {
  BackgroundInterval,
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";
import { fmtMSS } from "../../../Util/Helpers";
import { REASON, TIME, PLATFORM } from "../../../Util/Constants";

import { tokDisConnect, tokConnect, clear } from "../../../Ducks/tokboxReducer";

class LinguistView extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }
  ref: Ref<Publisher>;

  componentWillMount() {
    BackgroundStart();
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
  }
  async componentDidMount() {
    const {
      linguistTokboxSessionToken,
      linguistTokboxSessionID,
      tokConnect,
      sessionID
    } = this.props;
    await tokConnect(linguistTokboxSessionID, linguistTokboxSessionToken);
  }

  componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer);
    this.props.resetTimerAsync();
    Platform.OS === PLATFORM.ANDROID && cleanNotifications();
    clearInterval(this.props.counterId);
    this.props.resetCounter();
    OpenTok.disconnectAll();
    InCallManager.stop();
  }

  selectImage = () => {
    const { avatarURL } = this.props;

    return avatarURL
      ? {
          uri: this.props.avatarURL
        }
      : Images.avatar;
  };

  startTimer = () => {
    this.props.updateSettings({
      timer: BackgroundInterval(() => {
        this.props.incrementTimer();
        if (Platform.OS === PLATFORM.ANDROID) {
          emitLocalNotification({
            title: I18n.t("call"),
            message: `${I18n.t("callInProgress")} ${fmtMSS(
              this.props.elapsedTime
            )}`
          });
        }
      }, 1000)
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.networkInfoType === "none") {
      this.props.navigation.dispatch({ type: "Home" });
    }

    if (nextProps.counter > TIME.HIDEMODAL && this.props.counterId) {
      clearInterval(this.props.counterId);
      this.props.resetCounter();
      this.closeCall();
    }
  }

  closeLinguist = async reason => {
    Alert.alert(
      I18n.t("endCall"),
      I18n.t("logOutConfirmation"),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: I18n.t("endCall"),
          onPress: async () => {
            await OpenTok.sendSignal(
              this.props.linguistTokboxSessionID,
              "EndCall",
              reason
            );
            this.props.navigation.dispatch({ type: "RateView" });
          }
        }
      ],
      { cancelable: true }
    );
  };

  closeCall = async () => {
    const { linguistTokboxSessionID, sessionID, token } = this.props;

    linguistTokboxSessionID &&
      (await this.props.tokDisConnect(linguistTokboxSessionID));

    this.props.navigation.dispatch({ type: "Home" });

    this.props.clear();
    this.props.clearSettings();
    this.props.clearCallSettings();
  };

  callTimeOut = () => {
    const { incrementCounter } = this.props;
    this.props.updateContactLinguistSettings({
      counterId: setInterval(() => incrementCounter(), 1000)
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(visible);
          this.setState({ visible: !visible });
        }}
      >
        <View style={styles.containerT}>
          <ModalReconnect closeCall={this.closeCall} />
          <View style={styles.backgroundContainer}>
            <Subscriber
              sessionId={this.props.linguistTokboxSessionID}
              style={styles.background}
              onSubscribeStart={() => {
                console.log("Sub Started");
                this.props.updateContactLinguistSettings({
                  modalReconnect: false
                });
                clearInterval(this.props.counterId);
                InCallManager.start({ media: "audio" });
                InCallManager.setForceSpeakerphoneOn(true);
              }}
              onSubscribeError={() => {
                console.log("Sub Error");
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
          </View>
          <View style={styles.publisherBox}>
            {this.props.linguistTokboxSessionID && (
              <Publisher
                sessionId={this.props.linguistTokboxSessionID}
                style={styles.publisher}
                mute={!this.props.mic}
                video={this.props.video}
                ref={ref => {
                  this.ref = ref;
                }}
                onPublishStart={() => {
                  this.startTimer();
                  console.log("publish started");
                }}
                onPublishError={() => {
                  console.log("publish error");
                }}
              />
            )}
          </View>
          <View style={styles.topContainer}>
            <TopViewIOS />
            <View style={styles.inlineContainer}>
              <Image style={styles.smallAvatar} source={this.selectImage()} />
            </View>
            <Text style={styles.callerNameText}>{this.props.customerName}</Text>

            <View style={styles.inlineContainer}>
              <Text style={styles.incomingCallText}>
                {fmtMSS(this.props.elapsedTime)}
              </Text>
            </View>
          </View>
          <Fade
            visible={visible}
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              paddingBottom: 20
            }}
          >
            <SessionControls
              ref={this.ref}
              closeCall={this.closeLinguist}
              reason={REASON.DONE}
              linguist
            />
          </Fade>
          <KeepAwake />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mS = state => ({
  mic: state.callLinguistSettings.mic,
  video: state.callLinguistSettings.video,
  rotate: state.callLinguistSettings.rotate,
  speaker: state.callLinguistSettings.speaker,
  timer: state.callLinguistSettings.timer,
  elapsedTime: state.callLinguistSettings.elapsedTime,
  linguistTokboxSessionToken: state.tokbox.tokboxToken,
  linguistTokboxSessionID: state.tokbox.tokboxID,
  sessionID: state.tokbox.sessionID,
  token: state.auth.token,
  networkInfoType: state.networkInfo.type,
  customerName: state.callLinguistSettings.customerName,
  avatarURL: state.callLinguistSettings.avatarURL,
  counter: state.contactLinguist.counter,
  counterId: state.contactLinguist.counterId
});

const mD = {
  incrementTimer,
  updateSettings,
  resetTimerAsync,
  EndCall,
  clearSettings,
  tokConnect,
  tokDisConnect,
  updateContactLinguistSettings,
  resetCounter,
  incrementCounter,
  clearCallSettings,
  clear
};

export default connect(mS, mD)(LinguistView);
