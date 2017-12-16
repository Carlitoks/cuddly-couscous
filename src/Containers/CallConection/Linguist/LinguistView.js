import React, { Component } from "react";
import { AppRegistry, Button, View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import styles from "../styles";
import { CallButton } from "../../../Components/CallButton/CallButton";

import {
  updateSettings,
  incrementTimer,
  resetTimerAsync
} from "../../../Ducks/CallLinguistSettings.js";

import { fmtMSS } from "../../../Util/Helpers";
const sessionId =
  "2_MX40NjAxNjk4Mn5-MTUxMzM1MDUwNzE5MX52b0hkVE53Q3g4Mk1RTDJ6MFR2R1Bxa21-fg";
const token =
  "T1==cGFydG5lcl9pZD00NjAxNjk4MiZzaWc9ODc3YTgxMTEwMTY2YzdiNzE3YTk2NTY1OGJiMDBkNjZlNjhhYzZlODpzZXNzaW9uX2lkPTJfTVg0ME5qQXhOams0TW41LU1UVXhNek0xTURVd056RTVNWDUyYjBoa1ZFNTNRM2c0TWsxUlRESjZNRlIyUjFCeGEyMS1mZyZjcmVhdGVfdGltZT0xNTEzMzUwNTcyJm5vbmNlPTAuNjc1MzkyNDM5NTA4NDczOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE1OTQyNTcyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

class LinguistView extends Component {
  navigate = this.props.navigation.navigate;

  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED, e =>
      console.log("Session destroyed")
    );
    OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
      console.log("Stream destroyed");
      OpenTok.disconnect(sessionId);
      this.props.resetTimerAsync();
      this.props.navigation.dispatch({ type: "Home" });
    });
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    console.log("Start Timer");
    this.props.updateSettings({
      timer: setInterval(() => {
        this.props.incrementTimer();
      }, 1000)
    });
  };

  render() {
    return (
      <View style={styles.containerT}>
        <View style={styles.backgroundContainer}>
          <Subscriber
            sessionId={sessionId}
            style={styles.background}
            onPublishStart={() => {
              console.log("started");
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
            onPress={() => {}}
            toggle={true}
            icon="volume-up"
            iconToggled="volume-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={() => {
              OpenTok.disconnect(sessionId);
              this.props.resetTimerAsync();
              console.log("end");
              clearInterval(this.props.timer);
              this.props.navigation.dispatch({ type: "Home" });
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
            icon="videocam"
            iconToggled="videocam-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
        </View>

        <View style={styles.subscriberBox}>
          <Publisher
            sessionId={sessionId}
            style={styles.subscriber}
            mute={this.props.mute}
            video={this.props.video}
            ref={ref => {
              this.ref = ref;
            }}
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
  elapsedTime: state.callLinguistSettings.elapsedTime
});

const mD = {
  incrementTimer,
  updateSettings,
  resetTimerAsync
};

export default connect(mS, mD)(LinguistView);
