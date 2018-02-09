import React, { Component } from "react";

//COMPONENTS
import {
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { PermissionsAndroid } from "react-native";
import { CallButton } from "../../../Components/CallButton/CallButton";
// STYLE AND THEMES
import styles from "./styles";
import { Images } from "../../../Themes";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
// REDUCERS
import { connect } from "react-redux";
import { tokDisConnect } from "../../../Ducks/tokboxReducer";
import {
  AsyncCreateSession,
  updateSettings,
  EndCall,
  AsyncCreateInvitation,
  clearSettings
} from "../../../Ducks/CallCustomerSettings";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import I18n from "../../../I18n/I18n";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: this.props.customerName,
      customerLocation: this.props.customerLocation
    };
  }

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
        <View style={styles.backgroundView} />
        <Grid>
          <TopViewIOS />
          <Col style={{ justifyContent: "space-between" }}>
            {/* Top Container */}
            <Row style={styles.topContainer}>
              <ActivityIndicator size="large" color="white" />

              <Text style={styles.callerNameText}>
                {I18n.t("contactingLinguist")}
              </Text>
            </Row>

            {/* Call Buttons */}
            <Row style={styles.bottomContainer}>
              <View style={styles.containerButtons}>
                <CallButton
                  onPress={() => {}}
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
                  onPress={() => {
                    this.props.EndCall(
                      this.props.sessionID,
                      "cancel",
                      this.props.token
                    );
                    this.props.tokDisConnect(
                      this.props.customerTokboxSessionID
                    );
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
                    setPermission("microphone").then(response => {
                      if (response == "denied" || response == "restricted") {
                        displayOpenSettingsAlert();
                      }
                      this.props.updateSettings({
                        mute: !this.props.mute
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
                />
              </View>
            </Row>
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  mute: state.callCustomerSettings.mute,
  video: state.callCustomerSettings.video,
  speaker: state.callCustomerSettings.speaker,
  tokboxStatus: state.tokbox.status,
  sessionID: state.callCustomerSettings.sessionID,
  customerTokboxSessionID: state.callCustomerSettings.customerTokboxSessionID,
  customerTokboxSessionToken:
    state.callCustomerSettings.customerTokboxSessionID,
  token: state.auth.token
});

const mD = {
  EndCall,
  clearSettings,
  AsyncCreateSession,
  updateSettings,
  AsyncCreateInvitation,
  tokDisConnect
};

export default connect(mS, mD)(ContactingLinguist);
