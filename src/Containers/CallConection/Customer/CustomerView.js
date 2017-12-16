import React, { Component } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";

import {
  updateSettings,
  AsyncCreateSession,
  incrementTimer,
  resetTimerAsync
} from "../../../Ducks/CallCustomerSettings.js";

import { AppRegistry, Button, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CallButton } from "../../../Components/CallButton/CallButton";

import { fmtMSS } from "../../../Util/Helpers";
import styles from "../styles";

class CustomerView extends Component {
  async componentWillMount() {
    const res = await this.props.AsyncCreateSession({
      type: "immediate_virtual",
      matchMethod: "manual",
      primaryLangCode: "eng",
      secundaryLangCode: "cmn",
      estimatedMinutes: 20,
      token: this.props.token
    });

    const tokboxSessionId = res.payload.tokboxSessionID;
    const tokboxToken = res.payload.tokboxSessionToken;

    this.props.updateSettings({
      customerTokboxSessionID: tokboxSessionId,
      customerTokboxSessionToken: tokboxToken
    });

    await OpenTok.connect(tokboxSessionId, tokboxToken);

    console.log("ESTO");

    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => {
      console.log("ON_SIGNAL_RECEIVED", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_CREATED, e => {
      console.log("ON_SESSION_CONNECTION_CREATED", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED, e => {
      console.log("ON_SESSION_CONNECTION_DESTROYED", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_DID_CONNECT, e => {
      console.log("ON_SESSION_DID_CONNECT", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_DID_DISCONNECT, e => {
      console.log("ON_SESSION_DID_DISCONNECT", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_DID_FAIL_WITH_ERROR, e => {
      console.log("ON_SESSION_DID_FAIL_WITH_ERROR", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_STREAM_CREATED, e => {
      console.log("ON_SESSION_STREAM_CREATED", e);
    });

    OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
      console.log("", e);
    });
  }

  render() {
    return (
      <View style={styles.containerT}>
        <View style={styles.backgroundContainer}>
          {this.props.customerTokboxSessionID && (
            <Subscriber
              sessionId={this.props.customerTokboxSessionID}
              style={styles.background}
              onPublishStart={() => {
                console.log("started");
              }}
            />
          )}
        </View>
        <View style={styles.subscriberBox}>
          {this.props.customerTokboxSessionID && (
            <Publisher
              sessionId={this.props.customerTokboxSessionID}
              style={styles.subscriber}
              mute={this.props.mute}
              video={this.props.video}
              ref={ref => {
                this.ref = ref;
              }}
            />
          )}
        </View>
        <View style={styles.topContainer}>
          <View style={styles.inlineContainer}>
            <Image
              style={styles.smallAvatar}
              source={require("../../../Images/smallAvatar.png")}
            />
          </View>
          <Text style={styles.callerNameText}> Caroline C. </Text>

          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="room" />
            <Text style={styles.locationText}>San Diego, CA</Text>
          </View>

          <View style={styles.inlineContainer}>
            <Text style={styles.incomingCallText}>
              {" "}
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
              OpenTok.disconnect(this.props.customerTokboxSessionID);
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
      </View>
    );
  }
}

const mS = state => ({
  mute: state.callCustomerSettings.mute,
  video: state.callCustomerSettings.video,
  speaker: state.callCustomerSettings.speaker,
  timer: state.callCustomerSettings.timer,
  elapsedTime: state.callCustomerSettings.elapsedTime,
  speaker: state.callCustomerSettings.speaker,
  sessionID: state.callCustomerSettings.sessionID,
  customerTokboxSessionID: state.callCustomerSettings.customerTokboxSessionID,
  customerTokboxSessionToken:
    state.callCustomerSettings.customerTokboxSessionToken,
  token: state.auth.token
});

const mD = {
  AsyncCreateSession,
  incrementTimer,
  updateSettings,
  resetTimerAsync
};

export default connect(mS, mD)(CustomerView);
