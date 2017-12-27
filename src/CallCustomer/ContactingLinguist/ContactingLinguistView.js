import React, { Component } from "react";

import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import {
  AsyncCreateSession,
  updateSettings,
  EndCall,
  AsyncCreateInvitation,
  clearSettings
} from "../../Ducks/CallCustomerSettings";
import OpenTok from "react-native-opentok"; // eslint-disable-line
import { CallButton } from "../../Components/CallButton/CallButton";
import styles from "./styles";
import { Images } from "../../Themes";
import { tokConnect, tokDisConnect } from "../../Ducks/tokboxReducer";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: this.props.customerName,
      customerLocation: this.props.customerLocation
    };
  }

  async componentWillMount() {
    const res = await this.props.AsyncCreateSession({
      type: "immediate_virtual",
      matchMethod: "manual",
      primaryLangCode: "eng",
      secundaryLangCode: "cmn",
      estimatedMinutes: 20,
      token: this.props.token
    });
    if(res){
      const tokboxSessionId = res.payload.tokboxSessionID;
      const tokboxToken = res.payload.tokboxSessionToken;
      
      this.props.updateSettings({
        customerTokboxSessionID: tokboxSessionId,
        customerTokboxSessionToken: tokboxToken,
        sessionID: res.payload.sessionID
      });
      
      this.props.tokConnect(tokboxSessionId, tokboxToken);
    } else {
      console.log("The session could not be created")
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    // TODO: unwire these values
    const linguistID = "11111111-1111-1111-1111-111111111111";
    const role = "linguist";
    if (nextProps.tokboxStatus === 1) {
      this.props.AsyncCreateInvitation(
        this.props.sessionID,
        linguistID,
        role,
        this.props.token
      );

      this.props.navigation.dispatch({
        type: "CustomerView"
      });
    }
    // You don't have to do this check first, but it can help prevent an unneeded render
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
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
                Contacting available linguist{" "}
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
                    label="Camera"
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
                      label="Mute"
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
                    label="Speaker"
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
                      label="Video"
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
  token: state.auth.token,
  tokboxStatus: state.tokbox.status,
  sessionID: state.callCustomerSettings.sessionID,
  customerTokboxSessionID: state.callCustomerSettings.customerTokboxSessionID,
  customerTokboxSessionToken: state.callCustomerSettings.customerTokboxSessionID
});

const mD = {
  EndCall,
  clearSettings,
  AsyncCreateSession,
  updateSettings,
  AsyncCreateInvitation,
  tokConnect,
  tokDisConnect
};

export default connect(mS, mD)(ContactingLinguist);
