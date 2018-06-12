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
import CallAvatarName from "../../../Components/CallAvatarName/CallAvatarName";
import styles from "./styles";
import { Images } from "../../../Themes";
import ModalReconnect from "../../../Components/ModalReconnect/ModalReconnect";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import Slide from "../../../Effects/Slide/Slide";
import CallTimer from "../../../Components/CallTimer/CallTimer";
import Sound from "react-native-sound";
import SoundManager from "../../../Util/SoundManager";
import I18n from "../../../I18n/I18n";
import InCallManager from "react-native-incall-manager";
import Instabug from "instabug-reactnative";

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
import { REASON, TIME, PLATFORM, TOKBOX_EVENTS } from "../../../Util/Constants";

import { tokDisConnect, tokConnect, clear } from "../../../Ducks/tokboxReducer";

class LinguistView extends Component {
  constructor() {
    super();
    this.ref;
    this.state = {
      visible: true
    };

    this.endCallSound = new Sound(
      "elastic_done3.wav",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("failed to load the END CALL sound", error);
          return;
        }
      }
    );
  }

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
    await tokConnect(linguistTokboxSessionID, linguistTokboxSessionToken);
  }

  componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer);
    this.props.resetTimerAsync();
    Platform.OS === PLATFORM.ANDROID && cleanNotifications();
    clearInterval(this.props.counterId);
    this.props.resetCounter();
    OpenTok.disconnectAll();
    //SoundManager["EndCall"].play();
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
          onPress: () => {
            try {
              OpenTok.sendSignal(
                this.props.linguistTokboxSessionID,
                "EndCall",
                reason
              );
            } catch (e) {
              console.log(e);
            }
            //this.endCallSound.stop();
            //this.endCallSound.play();
            // SoundManager["EndCall"].play();
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
    //this.endCallSound.play();
    //SoundManager["EndCall"].play();
  };

  callTimeOut = () => {
    const { incrementCounter } = this.props;
    this.props.updateContactLinguistSettings({
      counterId: setInterval(() => incrementCounter(), 1000)
    });
    //this.endCallSound.play();
  };

  switchCamera() {
    if (this.ref && typeof this.ref !== "string") {
      this.ref.switchCamera();
    }
  }

  renderSubscriber() {
    const {
      linguistTokboxSessionID,
      updateContactLinguistSettings,
      counterId,
      timer
    } = this.props;

    return (
      <Subscriber
        sessionId={this.props.linguistTokboxSessionID}
        style={styles.background}
        onSubscribeStart={() => {
          console.log("Sub Started");
          this.props.updateContactLinguistSettings({
            modalReconnect: false
          });
          clearInterval(this.props.counterId);
          this.startTimer();
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
            modalReconnect: false
          });
          this.callTimeOut();
        }}
      />
    );
  }

  renderNoVideoScreen() {
    return (
      <View style={styles.noVideoContainer}>
        <Text style={styles.noVideoName}>{this.props.customerName}</Text>

        <View style={styles.noVideoAvatarContainer}>
          <Image style={styles.noVideoAvatar} source={this.selectImage()} />
        </View>
      </View>
    );
  }

  render() {
    const { visible } = this.state;
    const { disabledSubscriber } = this.props;
    console.log("Video", this.props.video);
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
            {this.renderSubscriber()}
            {disabledSubscriber && this.renderNoVideoScreen()}
          </View>
          <View
            style={
              this.props.video ? styles.publisherBox : styles.hidePublisherBox
            }
          >
            {this.props.linguistTokboxSessionID && (
              <Publisher
                sessionId={this.props.linguistTokboxSessionID}
                style={styles.publisher}
                mute={!this.props.mic}
                video={this.props.video}
                ref={ref => {
                  if (ref) {
                    this.ref = ref;
                  }
                }}
                onPublishStart={() => {
                  //this.startTimer();
                  console.log("publish started");

                  if (!this.props.video) {
                    OpenTok.sendSignal(
                      this.props.linguistTokboxSessionID,
                      TOKBOX_EVENTS.TOGGLE_VIDEO_LINGUIST,
                      (!this.props.video).toString()
                    );
                  }
                }}
                onPublishError={() => {
                  console.log("publish error");
                }}
              />
            )}
          </View>
          {!disabledSubscriber && (
            <View style={styles.CallAvatarNameContainer}>
              <CallAvatarName
                imageSource={this.selectImage()}
                sessionInfoName={this.props.customerName}
              />
            </View>
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
                buttonPress={() =>
                  this.setState({
                    red: false,
                    timeBtn: false,
                    showAlert: false,
                    extraTime: this.state.extraTime + 1
                  })
                }
              />

              <SessionControls
                ref={this.ref}
                closeCall={this.closeLinguist}
                reason={REASON.DONE}
                switch={this.switchCamera.bind(this)}
                linguist
              />
            </View>
          </Slide>
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
  disabledSubscriber: state.tokbox.disabledSubscriber,
  token: state.auth.token,
  networkInfoType: state.networkInfo.type,
  customerName: state.callLinguistSettings.customerName,
  avatarURL: state.callLinguistSettings.avatarURL,
  counter: state.contactLinguist.counter,
  counterId: state.contactLinguist.counterId,
  firstName: state.userProfile.firstName, // For Instabug
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  linguistProfile: state.userProfile.linguistProfile,
  deviceId: state.auth.deviceId,
  eventId: state.events.id
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
