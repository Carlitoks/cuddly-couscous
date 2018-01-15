import React, { Component, Ref } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import {
  updateSettings,
  AsyncCreateSession,
  incrementTimer,
  resetTimerAsync,
  clearSettings,
  EndCall
} from "../../../Ducks/CallCustomerSettings.js";
import { tokConnect, tokDisConnect } from "../../../Ducks/tokboxReducer";
import { clearSettings as clearCallSettings } from "../../../Ducks/ContactLinguistReducer";

import { AppRegistry, Button, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CallButton } from "../../../Components/CallButton/CallButton";

import { fmtMSS } from "../../../Util/Helpers";
import styles from "../styles";

class CustomerView extends Component {
  ref: Ref<Publisher>;

  async componentDidMount() {
    const {
      customerTokboxSessionToken,
      customerTokboxSessionID,
      tokConnect,
      sessionID
    } = this.props;

    // await OpenTok.connect(customerTokboxSessionID, customerTokboxSessionToken);

    // tokConnect(customerTokboxSessionID, customerTokboxSessionToken);

    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
    OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED, e =>
      console.log("Session destroyed")
    );
    OpenTok.on(OpenTok.events.ON_SESSION_DID_DISCONNECT, e => {
      //console.log("ON_SESSION_DID_DISCONNECT", e);
      //console.log(sessionID);
      //this.props.EndCall(sessionID, "done", this.props.token);
      //this.props.clearSettings();
      this.props.navigation.dispatch({ type: "RateCallView" });
    });
    OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
      //console.log("Stream destroyed");
      OpenTok.disconnect(customerTokboxSessionID);
      this.props.EndCall(sessionID, "done", this.props.token);
      //this.props.navigation.dispatch({ type: "RateCallView" });
    });
    this.startTimer();
  }

  componentWillUnmount() {
    this.props.resetTimerAsync();
    this.props.clearCallSettings();
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
          <Publisher
            sessionId={this.props.customerTokboxSessionID}
            style={styles.subscriber}
            mute={this.props.mute}
            video={this.props.video}
            ref={ref => {
              this.ref = ref;
            }}
          />
        </View>
        <View style={styles.topContainer}>
        <TopViewIOS/> 
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
            onPress={() => {
              this.props.updateSettings({ mute: !this.props.speaker });
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
            onPress={() => {
              OpenTok.disconnect(this.props.customerTokboxSessionID);
              this.props.tokDisConnect(this.props.customerTokboxSessionID);
              this.props.EndCall(
                this.props.sessionID,
                "done",
                this.props.token
              );
             //this.props.navigation.dispatch({ type: "RateCallView" });
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
  resetTimerAsync,
  clearSettings,
  tokConnect,
  tokDisConnect,
  EndCall,
  clearCallSettings
};

export default connect(mS, mD)(CustomerView);
