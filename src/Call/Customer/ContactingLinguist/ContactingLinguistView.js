import React, { Component } from "react";

//COMPONENTS
import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CallButton } from "../../../Components/CallButton/CallButton";

// STYLE AND THEMES
import styles from "./styles";
import { Images } from "../../../Themes";

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
        <Image
          source={Images.backgroundCustomer}
          style={styles.backgroundImage}
        />
        <Grid>
          <Col style={{ justifyContent: "space-between" }}>
            {/* Top Container */}
            <Row style={styles.topContainer}>
              <ActivityIndicator size="large" color="white" />

              <Text style={styles.callerNameText}>
                {" "}
                {I18n.t("contactingLinguist")}
                {" "}
              </Text>
            </Row>

            {/* Center Container */}
            <Row style={styles.centerContainer}>
              <Col style={styles.buttonContainerLeft}>
                <View style={styles.buttonColumn}>
                  {/* Switch Camera Button */}
                  <CallButton
                    onPress={() => {}}
                    toggle={true}
                    icon="camera-front"
                    iconToggled="camera-rear"
                    opacity={0.7}
                    label={I18n.t("rotate")}
                  />
                </View>
                <View style={styles.buttonColumn}>
                  <View style={{ flex: 1 }}>
                    {/* Toggle Microphone Button */}
                    <CallButton
                      onPress={() => {
                        this.props.updateSettings({ mute: !this.props.mute });
                      }}
                      toggle={true}
                      icon="mic"
                      iconToggled="mic-off"
                      opacity={0.7}
                      label={I18n.t("mute")}
                    />
                  </View>
                </View>
              </Col>
              <Col style={styles.buttonContainerRight}>
                <View style={{ flex: 1 }}>
                  {/* Toggle Speaker Button */}
                  <CallButton
                    onPress={() => {
                      this.props.updateSettings({
                        speaker: !this.props.speaker
                      });
                    }}
                    toggle={true}
                    icon="volume-up"
                    iconToggled="volume-off"
                    opacity={0.7}
                    label={I18n.t("speaker")}
                  />
                </View>
                <View style={styles.buttonColumn}>
                  <View style={{ flex: 1 }}>
                    {/* Toggle Videocam Button */}
                    <CallButton
                      onPress={() => {
                        this.props.updateSettings({ video: !this.props.video });
                      }}
                      toggle={true}
                      icon="videocam"
                      iconToggled="videocam-off"
                      opacity={0.7}
                      label={I18n.t("video")}
                    />
                  </View>
                </View>
              </Col>
            </Row>

            {/* Call Buttons */}
            <Row style={styles.bottomContainer}>
              {/* End Call */}
              <CallButton
                onPress={() => {
                  this.props.tokDisConnect(this.props.customerTokboxSessionID);
                  this.props.navigation.dispatch({ type: "Home" });
                }}
                buttonColor="red"
                toggle={false}
                icon="call-end"
              />
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
    state.callCustomerSettings.customerTokboxSessionID
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
