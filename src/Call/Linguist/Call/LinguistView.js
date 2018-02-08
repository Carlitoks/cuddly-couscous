import React, { Component, Ref } from "react";
import { AppRegistry, Button, View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import KeepAwake from "react-native-keep-awake";
import styles from "./styles";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { Images } from "../../../Themes";
import { CallButton } from "../../../Components/CallButton/CallButton";
import I18n from "../../../I18n/I18n";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import {
  updateSettings,
  incrementTimer,
  resetTimerAsync,
  EndCall,
  clearSettings
} from "../../../Ducks/CallLinguistSettings";

import {
  BackgroundInterval,
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";
import { fmtMSS } from "../../../Util/Helpers";

import { tokDisConnect, tokConnect } from "../../../Ducks/tokboxReducer";

class LinguistView extends Component {
  navigate = this.props.navigation.navigate;
  ref: Ref<Publisher>;

  componentDidMount() {
    const {
      linguistTokboxSessionToken,
      linguistTokboxSessionID,
      tokConnect,
      sessionID
    } = this.props;
  }

  componentWillMount() {
    BackgroundStart();
    const {
      linguistTokboxSessionToken,
      linguistTokboxSessionID,
      tokConnect,
      sessionID
    } = this.props;

    tokConnect(linguistTokboxSessionID, linguistTokboxSessionToken);
  }

  componentWillUnmount() {
    this.props.resetTimerAsync();
    BackgroundCleanInterval(this.props.timer);
  }

  startTimer = () => {
    this.props.updateSettings({
      timer: setInterval(() => {
        this.props.incrementTimer();
      }, 1000)
    });
  };

  render() {
    return (
      <View style={styles.containerT}>
        <KeepAwake />
        <View style={styles.backgroundContainer}>
          <Subscriber
            sessionId={this.props.linguistTokboxSessionID}
            style={styles.background}
            mute={!this.props.speaker}
            onSubscribeStart={() => {
              console.log("Sub Started");
            }}
            onSubscribeError={() => {
              console.log("Sub Error");
            }}
          />
        </View>
        <View style={styles.publisherBox}>
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
        </View>
        <View style={styles.topContainer}>
          <TopViewIOS />
          <View style={styles.inlineContainer}>
            <Image style={styles.smallAvatar} source={Images.avatarCall} />
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
          <CallButton
            onPress={() => {
              if (typeof this.ref !== "string") this.ref.switchCamera();
            }}
            toggle={true}
            icon="camera-front"
            iconToggled="camera-rear"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={() => {
              this.props.updateSettings({ speaker: !this.props.speaker });
            }}
            toggle={true}
            active={!this.props.speaker}
            icon="volume-up"
            iconToggled="volume-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={async () => {
              await OpenTok.sendSignal(
                this.props.linguistTokboxSessionID,
                "EndCall",
                "done"
              );
            }}
            buttonColor="red"
            toggle={false}
            icon="call-end"
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={() => {
              setPermission("microphone").then(response => {
                if (response == "denied" || response == "restricted") {
                  displayOpenSettingsAlert();
                }
                this.props.updateSettings({
                  video: !this.props.mute
                });
              });
            }}
            toggle={true}
            active={this.props.mute}
            icon="mic"
            iconToggled="mic-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={() => {
              setPermission("camera").then(response => {
                if (response == "denied" || response == "restricted") {
                  displayOpenSettingsAlert();
                }
                this.props.updateSettings({
                  video: !this.props.video
                });
              });
            }}
            toggle={true}
            active={!this.props.video}
            icon="videocam"
            iconToggled="videocam-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
            linguistTokboxSessionToken
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  mute: state.callLinguistSettings.mute,
  video: state.callLinguistSettings.video,
  speaker: state.callLinguistSettings.speaker,
  timer: state.callLinguistSettings.timer,
  elapsedTime: state.callLinguistSettings.elapsedTime,
  linguistTokboxSessionToken:
    state.callLinguistSettings.linguistTokboxSessionToken,
  linguistTokboxSessionID: state.callLinguistSettings.linguistTokboxSessionID,
  sessionID: state.callLinguistSettings.sessionID,
  customerName: state.callLinguistSettings.customerName,
  token: state.auth.token
});

const mD = {
  incrementTimer,
  updateSettings,
  resetTimerAsync,
  EndCall,
  clearSettings,
  tokConnect,
  tokDisConnect
};

export default connect(mS, mD)(LinguistView);
