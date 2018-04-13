import React, { Component, Ref } from "react";
import { Button, View, Image, Text, Alert, Platform } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import KeepAwake from "react-native-keep-awake";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import CallButtonToggle from "../../../Components/CallButtonToggle/CallButtonToggle";
import styles from "./styles";
import { Images } from "../../../Themes";
import { CallButton } from "../../../Components/CallButton/CallButton";
import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import I18n from "../../../I18n/I18n";

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
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { REASON, TIME, PLATFORM } from "../../../Util/Constants";

import { tokDisConnect, tokConnect, clear } from "../../../Ducks/tokboxReducer";

class LinguistView extends Component {
  ref: Ref<Publisher>;

  componentWillMount() {
    BackgroundStart();
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
    /*
    if (this.props.networkInfoType !== "none") {
      this.props.clear();
      this.props.clearSettings(); // clean call info
    }*/
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
    return (
      <View style={styles.containerT}>
        <ModalReconnect closeCall={this.closeCall} />
        <View style={styles.backgroundContainer}>
          <Subscriber
            sessionId={this.props.linguistTokboxSessionID}
            style={styles.background}
            mute={!this.props.speaker}
            onSubscribeStart={() => {
              console.log("Sub Started");
              this.props.updateContactLinguistSettings({
                modalReconnect: false
              });
              clearInterval(this.props.counterId);
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
              mute={this.props.mute}
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
        <View style={styles.containerButtons}>
          <CallButtonToggle
            onPress={() => {
              if (typeof this.ref !== "string") this.ref.switchCamera();
            }}
            toggle={true}
            active={this.props.rotate}
            name="LinguistCamera"
            icon="switch-camera"
            iconToggled="switch-camera"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButtonToggle
            toggle={true}
            active={this.props.speaker}
            name="LinguistSpeaker"
            icon="volume-up"
            iconToggled="volume-up"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={async () => {
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
                        REASON.DONE
                      );
                      this.props.navigation.dispatch({ type: "RateCallView" });
                    }
                  }
                ],
                { cancelable: true }
              );
            }}
            buttonColor="red"
            toggle={false}
            icon="call-end"
            buttonSize={65}
            iconSize={30}
          />
          <CallButtonToggle
            toggle={true}
            active={!this.props.mute}
            name="LinguistMute"
            icon="mic"
            iconToggled="mic"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButtonToggle
            toggle={true}
            active={this.props.video}
            name="LinguistVideo"
            icon="videocam"
            iconToggled="videocam"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
        </View>
        <KeepAwake />
      </View>
    );
  }
}

const mS = state => ({
  mute: state.callLinguistSettings.mute,
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
