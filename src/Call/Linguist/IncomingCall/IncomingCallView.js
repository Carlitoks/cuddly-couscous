import React, { Component } from "react";
import { connect } from "react-redux";

import {
  verifyCall,
  updateSettings,
  clearSettings
} from "../../../Ducks/CallLinguistSettings";

import { asyncAcceptsInvite } from "../../../Ducks/ActiveSessionReducer";

import { Text, View, ScrollView, Image, Vibration } from "react-native";
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

class IncomingCall extends Component {
  state = {
    customerName: this.props.customerName,
    customerLocation: this.props.customerLocation,
    acceptIsDisabled: false,
    endIsDisabled: false
  };

  componentWillMount() {
    Vibration.vibrate(VIBRATE_PATTERN, true);
  }

  componentDidMount() {
    this.verifyCallLinguist();
    SoundManager["IncomingCall"].setNumberOfLoops(-1);
    SoundManager["IncomingCall"].play();
  }

  componentWillUnmount() {
    clearInterval(this.props.verifyCallId);
    this.props.clearSettings();
    SoundManager["IncomingCall"].stop();
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
    const { invitationID, token, sessionID } = this.props;
    clearInterval(this.props.verifyCallId);
    this.props.asyncAcceptsInvite(
      invitationID,
      { accept: isAccept },
      token,
      sessionID
    );

    SoundManager["IncomingCall"].stop();
    Vibration.cancel();
  };

  verifyCallLinguist = () => {
    this.props.updateSettings({
      verifyCallId: setInterval(
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
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="help" />
                <Text style={styles.notificationText}>
                  {this.props.customerScenario}
                </Text>
              </View>
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
  invitationID: state.activeSessionReducer.invitationID,
  customerName: state.callLinguistSettings.customerName,
  avatarURL: state.callLinguistSettings.avatarURL,
  estimatedMinutes: state.callLinguistSettings.estimatedMinutes,
  customerScenario: state.callLinguistSettings.customerScenario,
  customScenarioNote: state.callLinguistSettings.customScenarioNote,
  languages: state.callLinguistSettings.languages,
  verifyCallId: state.callLinguistSettings.verifyCallId,
  token: state.auth.token,
  sessionID: state.activeSessionReducer.sessionID
});

const mD = {
  asyncAcceptsInvite,
  verifyCall,
  updateSettings,
  clearSettings
};

export default connect(
  mS,
  mD
)(IncomingCall);
