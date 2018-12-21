import React, { Component } from "react";
import { connect } from "react-redux";

import {
  verifyCall,
  updateSettings,
  clearSettings
} from "../../../Ducks/CallLinguistSettings";

import {
  asyncAcceptsInvite,
  update as updateActiveSession
} from "../../../Ducks/ActiveSessionReducer";
import timer from "react-native-timer";
import { Text, View, ScrollView, Image, Vibration, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";

import CallButton from "../../../Components/CallButton/CallButton";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images, Colors } from "../../../Themes";
import I18n from "../../../I18n/I18n";
import SoundManager from "../../../Util/SoundManager";
import { VIBRATE_PATTERN } from "../../../Util/Constants";
import Permissions from "react-native-permissions";
import { checkForAllPermissions } from "../../../Util/Permission";
import Sound from "react-native-sound";

class IncomingCall extends Component {
  state = {
    customerName: this.props.customerName,
    customerLocation: this.props.customerLocation,
    acceptIsDisabled: false,
    endIsDisabled: false,
    incomingCallRingTone: new Sound(
      "elastic_musical5.wav",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("error loading sound", error);
          return;
        }
      }
    )
  };

  componentWillMount() {
    Vibration.vibrate(VIBRATE_PATTERN, true);
    this.verifyCallLinguist();
    Permissions.checkMultiple(["camera", "microphone"]).then(response => {
      if (
        (response.camera !== "authorized" ||
          response.microphone !== "authorized") &&
        isAccept
      ) {
        checkForAllPermissions(valueToUpdate => {
          this.props.updateActiveSession(valueToUpdate);
        });
        this.setState({
          acceptIsDisabled: false
        });
      }
      if (
        (response.camera == "restricted" ||
          response.camera == "undetermined" ||
          response.microphone == "restricted" ||
          response.microphone == "undetermined") &&
        isAccept
      ) {
        Alert.alert(
          I18n.t("appPermissions"),
          I18n.t("acceptAllPermissionsLinguist"),
          [{ text: I18n.t("ok") }]
        );
        this.setState({
          acceptIsDisabled: false
        });
      }
    });
  }

  componentDidMount() {
    this.startSound();
  }

  sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  startSound = async () => {
    await this.sleep(500);
    this.state.incomingCallRingTone.setNumberOfLoops(-1);
    this.state.incomingCallRingTone.play();
  };

  componentWillUnmount() {
    timer.clearInterval("verifyCallId");
    this.props.clearSettings();
    this.state.incomingCallRingTone.stop();
    this.state.incomingCallRingTone.release();
  }

  changeButtonState(value, type) {
    if (type === "accept") {
      this.setState({
        acceptIsDisabled: value
      });
    } else {
      this.setState({
        rejectIsDisabled: value
      });
    }
  }

  takeCall = isAccept => {
    const { invitationID, token, sessionID, navigation } = this.props;
    timer.clearInterval("verifyCallId");
    Permissions.checkMultiple(["camera", "microphone"]).then(response => {
      if (
        (response.camera == "authorized" &&
          response.microphone == "authorized") ||
        isAccept == false
      ) {
        this.props
          .asyncAcceptsInvite(
            invitationID,
            { accept: isAccept },
            token,
            sessionID
          )
          .then(response => {
            navigation.dispatch({
              type: response.type,
              params: response.params
            });
            this.changeButtonState(response.buttonDisabled, "accept");
          })
          .catch(error => {
            navigation.dispatch({
              type: error.type,
              params: error.params
            });
            this.changeButtonState(error.buttonDisabled, "accept");
          });
      }
      this.state.incomingCallRingTone.stop();
      Vibration.cancel();
    });
  };

  verifyCallLinguist = () => {
    this.props.updateSettings({
      verifyCallId: timer.setInterval(
        "verifyCallId",
        () =>
          this.props.verifyCall(
            this.props.sessionID,
            this.props.token,
            this.props.verifyCallId
          ),
        2000
      )
    });
  };
  selectImage = () => {
    return this.props.avatarURL
      ? {
          uri: this.props.avatarURL
        }
      : Images.avatar;
  };

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* Linear Gradient */}
        <LinearGradient
          colors={[
            Colors.gradientColor.top,
            //Colors.gradientColor.middle,
            Colors.gradientColor.bottom
          ]}
          style={styles.linearGradient}
        />
        <Grid>
          <Col style={{ justifyContent: "space-between" }}>
            <TopViewIOS />
            {/* Top Container */}
            <Row style={styles.topContainer}>
              <Image style={styles.smallAvatar} source={this.selectImage()} />

              <Text style={styles.callerNameText}>
                {this.props.customerName}
              </Text>

              <Text style={styles.incomingCallText}>
                {I18n.t("incomingCall")}
              </Text>
            </Row>

            {/* Center Container */}
            <Row style={styles.centerContainer}>
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="forum" />
                <Text style={styles.notificationText}>
                  {this.props.languages}
                </Text>
              </View>
              {this.props.customerScenario && (
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="help" />
                <Text style={styles.notificationText}>
                  {this.props.customerScenario}
                </Text>
              </View> )}
              {this.props.customScenarioNote && (
                <View style={styles.inlineContainer}>
                  <Icon style={styles.icon} size={25} name="textsms" />
                  <Text style={styles.notificationText}>
                    {this.props.customScenarioNote}
                  </Text>
                </View>
              )}
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="watch-later" />
                <Text style={styles.notificationText}>
                  {this.props.estimatedMinutes}
                </Text>
              </View>
            </Row>

            {/* Call Buttons */}
            <Row style={styles.bottomContainer}>
              {/* End Call */}
              <CallButton
                buttonColor="red"
                toggle={false}
                icon="call-end"
                onPress={() => {
                  this.changeButtonState(true, "end");
                  this.takeCall(false);
                }}
              />
              {/* Accept Call */}
              <CallButton
                buttonColor="green"
                toggle={false}
                icon="call"
                disabled={this.state.acceptIsDisabled}
                onPress={() => {
                  this.changeButtonState(true, "accept");
                  this.takeCall(true);
                }}
              />
            </Row>
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  invitationID: state.callLinguistSettings.invitationID,
  customerName: state.callLinguistSettings.customerName,
  avatarURL: state.callLinguistSettings.avatarURL,
  estimatedMinutes: state.callLinguistSettings.estimatedMinutes,
  customerScenario: state.callLinguistSettings.customerScenario,
  customScenarioNote: state.callLinguistSettings.customScenarioNote,
  languages: state.callLinguistSettings.languages,
  verifyCallId: state.callLinguistSettings.verifyCallId,
  token: state.auth.token,
  sessionID: state.callLinguistSettings.sessionID
});

const mD = {
  asyncAcceptsInvite,
  verifyCall,
  updateSettings,
  clearSettings,
  updateActiveSession
};

export default connect(
  mS,
  mD
)(IncomingCall);
