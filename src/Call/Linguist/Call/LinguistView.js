import React, { Component, Ref } from "react";
import { AppRegistry, Button, View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import KeepAwake from "react-native-keep-awake";

import styles from "./styles";
import { CallButton } from "../../../Components/CallButton/CallButton";

import {
  updateSettings,
  incrementTimer,
  resetTimerAsync,
  EndCall,
  clearSettings
} from "../../../Ducks/CallLinguistSettings";

import { tokDisConnect, tokConnect } from "../../../Ducks/tokboxReducer";

import { fmtMSS } from "../../../Util/Helpers";

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

   /* if (InCallManager.recordPermission !== "granted") {
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
    } */
  }

  componentWillMount() {
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
    //InCallManager.stop();
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
          <View style={styles.inlineContainer}>
            <Image
              style={styles.smallAvatar}
              source={require("../../../Images/smallAvatar.png")}
            />
          </View>
          <Text style={styles.callerNameText}> Hanna C. </Text>

          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="room" />
            <Text style={styles.locationText}>San Diego, CA</Text>
          </View>

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
              //InCallManager.setForceSpeakerphoneOn(!this.props.speaker);
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
              this.props.updateSettings({ mute: !this.props.mute });
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
              this.props.updateSettings({ video: !this.props.video });
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