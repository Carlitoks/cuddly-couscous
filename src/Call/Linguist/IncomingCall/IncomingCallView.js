import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncGetInvitationDetail,
  asyncAcceptsInvite
} from "../../../Ducks/CallLinguistSettings";

import { Text, View, ScrollView, Image, Vibration } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { CallButton } from "../../../Components/CallButton/CallButton";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images } from "../../../Themes";
import I18n from "../../../I18n/I18n";

class IncomingCall extends Component {
  state = {
    customerName: this.props.customerName,
    customerLocation: this.props.customerLocation
  };

  componentWillMount() {
    const PATTERN = [1000, 2000, 3000];
    const { invitationID, token } = this.props;
    Vibration.vibrate(PATTERN, true);
    this.props.asyncGetInvitationDetail(invitationID, token);
  }

  takeCall = () => {
    const { invitationID, token, linguistSessionId } = this.props;

    this.props.asyncAcceptsInvite(
      invitationID,
      { accept: true },
      token,
      linguistSessionId
    );
    Vibration.cancel();
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
        alwaysBounceVertical={false} 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* Background Image */}
        <Image source={Images.backgroundCall} style={styles.backgroundImage} />
        <Grid>
          <Col style={{ justifyContent: "space-between" }}>
          <TopViewIOS/>
            {/* Top Container */}
            <Row style={styles.topContainer}>
              <Image style={styles.smallAvatar} source={Images.avatarCall} />

              <Text style={styles.callerNameText}>
                {" "}
                {this.props.customerName}{" "}
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
                  {/*Airport lost and found */}
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
                onPress={this.rejectCall}
              />
              {/* Accept Call */}
              <CallButton
                buttonColor="green"
                toggle={false}
                icon="call"
                onPress={this.takeCall}
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
  estimatedMinutes: state.callLinguistSettings.estimatedMinutes,
  languages: state.callLinguistSettings.languages,
  token: state.auth.token,
  linguistSessionId: state.callLinguistSettings.sessionID
});

const mD = {
  asyncGetInvitationDetail,
  asyncAcceptsInvite
};

export default connect(mS, mD)(IncomingCall);