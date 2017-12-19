import React, { Component } from "react";

import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import contactLinguist from "../../Ducks/ContactLinguistReducer";
import { CallButton } from "../../Components/CallButton/CallButton";
import { updateSettings } from "../../Ducks/CallCustomerSettings.js";
import styles from "./styles";
import { Images } from "../../Themes";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: this.props.customerName,
      customerLocation: this.props.customerLocation
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(
        {
          type: "CustomerView"
        },
        50000
      );
    });
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
                    onPress={() => {
                      if (typeof this.ref !== "string") this.ref.switchCamera();
                    }}
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
                    onPress={() => {}}
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
                  OpenTok.disconnect(sessionId);
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
  speaker: state.callCustomerSettings.speaker
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(ContactingLinguist);
