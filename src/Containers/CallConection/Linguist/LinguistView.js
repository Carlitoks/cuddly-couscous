import React, { Component, Ref } from "react";
import { AppRegistry, Button, View, Image, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import OpenTok, { Subscriber, Publisher } from "react-native-opentok"; // eslint-disable-line
import styles from "../styles";
import { CallButton } from "../../../Components/CallButton/CallButton";

import {
  updateSettings,
  incrementTimer,
  resetTimerAsync,
  EndCall,
  clearSettings
} from "../../../Ducks/CallLinguistSettings.js";

import { tokDisConnect, tokConnect } from "../../../Ducks/tokboxReducer.js";

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

     tokConnect(linguistTokboxSessionID, linguistTokboxSessionToken);

    //await OpenTok.connect(linguistTokboxSessionID, linguistTokboxSessionToken);

    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED, e =>
      console.log("Session destroyed")
    );
    OpenTok.on(OpenTok.events.ON_SESSION_DID_DISCONNECT, e => {
      console.log("ON_SESSION_DID_DISCONNECT", e);
      console.log(sessionID);
      this.props.EndCall(sessionID, "done", this.props.token);
      //this.props.clearSettings();
      this.props.navigation.dispatch({ type: "RateCallView" });
    });
    OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
      console.log("Stream destroyed");
      OpenTok.disconnect(linguistTokboxSessionID);
      this.props.resetTimerAsync();
      this.props.EndCall(sessionID, "done", this.props.token);
      this.props.navigation.dispatch({ type: "RateCallView" });
    });

    this.startTimer();
  }

  componentWillUnmount() {
    this.props.resetTimerAsync();
  }

  startTimer = () => {
    this.props.updateSettings({
      timer: setInterval(() => {
        this.props.incrementTimer();
      }, 1000)
    });
  };

  getSubscriber = booleanVar => {
    return booleanVar ? (
      <Subscriber
        sessionId={this.props.linguistTokboxSessionID}
        style={styles.background}
        ref={ref => {
          this.ref = ref;
        }}
        onPublishStart={() => {
          console.log("started");
        }}
        onSubscribeError={() => {
          console.log("error");
        }}
      />
    ) : null;
  };

  render() {
    return (
      <View style={styles.containerT}>
        <View style={styles.backgroundContainer}>
          {this.getSubscriber(this.props.linguistTokboxSessionID)}
        </View>
        <View style={styles.subscriberBox}>
          <Publisher
            sessionId={this.props.linguistTokboxSessionID}
            style={styles.subscriber}
            mute={this.props.mute}
            video={this.props.video}
            ref={ref => {
              this.ref = ref;
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
            active={!this.props.speaker}
            icon="volume-up"
            iconToggled="volume-off"
            opacity={0.7}
            buttonSize={65}
            iconSize={30}
          />
          <CallButton
            onPress={() => {
              this.props.tokDisConnect(this.props.linguistTokboxSessionID);
              OpenTok.disconnect(this.props.linguistTokboxSessionID);
              this.props.clearSettings();
              clearInterval(this.props.timer);
              this.props.navigation.dispatch({ type: "RateCallView" });
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
