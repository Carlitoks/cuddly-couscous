import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncGetInvitationDetail,
  asyncAcceptsInvite
} from "../../../Ducks/CallLinguistSettings";

import { Text, View, ScrollView, Image, Vibration } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";

import { CallButton } from "../../../Components/CallButton/CallButton";

import styles from "./styles";
import { Images, Colors } from "../../../Themes";
import I18n from "../../../I18n/I18n";

import { IMAGE_STORAGE_URL } from "../../../Config/env";

class IncomingCall extends Component {
  state = {
    customerName: this.props.customerName,
    customerLocation: this.props.customerLocation
  };

  componentWillMount() {
    const PATTERN = [1000, 2000, 3000];
    const { invitationID, token } = this.props;
    Vibration.vibrate(PATTERN, true);
    // this.props.asyncGetInvitationDetail(invitationID, token);
  }

  takeCall = isAccept => {
    const { invitationID, token, sessionID } = this.props;
    this.props.asyncAcceptsInvite(
      invitationID,
      { accept: isAccept },
      token,
      sessionID
    );
    Vibration.cancel();
  };

  selectImage = () => {
    return this.props.avatarURL
      ? {
          uri: this.props.avatarURL
        }
      : Images.avatar;
  };

  rejectCall = () => {
    console.log("rejecting call");
    Vibration.cancel();
  };

  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
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
                onPress={() => this.takeCall(false)}
              />
              {/* Accept Call */}
              <CallButton
                buttonColor="green"
                toggle={false}
                icon="call"
                onPress={() => this.takeCall(true)}
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
  languages: state.callLinguistSettings.languages,
  token: state.auth.token,
  sessionID: state.tokbox.sessionID
});

const mD = {
  asyncGetInvitationDetail,
  asyncAcceptsInvite
};

export default connect(mS, mD)(IncomingCall);