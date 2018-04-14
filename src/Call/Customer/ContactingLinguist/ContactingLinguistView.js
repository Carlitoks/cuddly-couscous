import React, { Component } from "react";

//COMPONENTS
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { CallButton } from "../../../Components/CallButton/CallButton";

// STYLE AND THEMES
import styles from "./styles";
import { Images, Colors } from "../../../Themes";

// REDUCERS
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import CallButtonToggle from "./../../../Components/CallButtonToggle/CallButtonToggle";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";

import { REASON, STATUS_TOKBOX } from "../../../Util/Constants";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.callTimeOut();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokboxStatus === STATUS_TOKBOX.STREAM) {
      clearInterval(this.props.counterId);
    }
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
        alwaysBounceVertical={false}
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
              {!this.props.modalReconnect && (
                <ActivityIndicator size="large" color="white" />
              )}

              <Text style={styles.callerNameText}>
                {I18n.t("contactingLinguist")}
              </Text>
            </Row>

            {/* Call Buttons */}
            <Row style={styles.bottomContainer}>
              <View style={styles.containerButtons}>
                <CallButtonToggle
                  toggle={true}
                  active={this.props.rotate}
                  name="CustomerCamera"
                  icon="switch-camera"
                  iconToggled="switch-camera"
                  ref={this.ref}
                  opacity={0.7}
                  buttonSize={65}
                  iconSize={30}
                />
                <CallButtonToggle
                  toggle={true}
                  active={!this.props.speaker}
                  name="CustomerSpeaker"
                  icon="volume-off"
                  iconToggled="volume-up"
                  opacity={0.7}
                  buttonSize={65}
                  iconSize={30}
                />
                {/* End Call */}
                <CallButton
                  onPress={() => {
                    this.props.closeCall(REASON.CANCEL, true);
                  }}
                  buttonColor="red"
                  toggle={false}
                  icon="call-end"
                />
                <CallButtonToggle
                  toggle={true}
                  active={this.props.mute}
                  name="CustomerMute"
                  icon="mic-off"
                  iconToggled="mic"
                  opacity={0.7}
                  buttonSize={65}
                  iconSize={30}
                />
                <CallButtonToggle
                  toggle={true}
                  active={this.props.video}
                  name="CustomerVideo"
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
  rotate: state.callCustomerSettings.rotate,
  counterId: state.contactLinguist.counterId,
  tokboxStatus: state.tokbox.status,
  modalReconnect: state.contactLinguist.modalReconnect
});

const mD = {};

export default connect(mS, mD)(ContactingLinguist);
