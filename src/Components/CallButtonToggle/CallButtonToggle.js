import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateSettings,
  AsyncCreateSession,
  incrementTimer,
  resetTimerAsync,
  clearSettings,
  EndCall
} from "../../Ducks/CallCustomerSettings";

import {
  clearSettings as clearCallSettings,
  updateSettings as updateLinguistSettings,
  resetCounter,
  incrementCounter
} from "../../Ducks/CallLinguistSettings.js";
import InCallManager from "react-native-incall-manager";
import { bool, func, number, object, string } from "prop-types";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";
import { View, AppState, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Iphone5 } from "../../Util/Devices";
import Colors from "../../Themes/Colors";

/**
 * @description Generic call button component
 *
 * Props:
    onPress: PropTypes.func,
    buttonColor: Base button color,
    icon: Base icon name,
    toggle: "True" if icon can be toggled,
    iconToggled: Name of the toggled icon,
    active: Initial state of the button
 *
 * @export
 * @class CallButton
 * @extends {Component}
 */
class CallButtonToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconName: this.props.icon
    };
  }

  toggleIcon = () => {
    switch (this.props.name) {
      case "CustomerMute":
        setPermission("microphone").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ mic: !this.props.muteCustomer });
          }
        });
        break;
      case "CustomerVideo":
        setPermission("camera").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ video: !this.props.videoCustomer });
          }
        });
        break;
      case "CustomerSpeaker":
        if (this.props.speakerCustomer) {
          InCallManager.setForceSpeakerphoneOn(false);
        } else {
          InCallManager.setForceSpeakerphoneOn(true);
        }
        this.props.updateSettings({ speaker: !this.props.speakerCustomer });
        break;
      case "CustomerCamera":
        this.props.updateSettings({ rotate: !this.props.rotateCustomer });
        break;
      case "LinguistVideo":
        setPermission("camera").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateLinguistSettings({
              video: !this.props.videoLinguist
            });
          }
        });
        break;
      case "LinguistSpeaker":
        if (this.props.speakerLinguist) {
          InCallManager.setForceSpeakerphoneOn(false);
        } else {
          InCallManager.setForceSpeakerphoneOn(true);
        }
        this.props.updateLinguistSettings({
          speaker: !this.props.speakerLinguist
        });
        break;
      case "LinguistMute":
        setPermission("microphone").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateLinguistSettings({
              mic: !this.props.muteLinguist
            });
          }
        });
        break;
      case "LinguistCamera":
        this.props.updateLinguistSettings({
          rotate: !this.props.rotateLinguist
        });
        break;
    }
  };

  render() {
    const { buttonColor, onPress, active } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Icon.Button
          name={this.state.iconName}
          borderRadius={100}
          containerViewStyle={{
            borderRadius: 100,
            opacity: active ? 0.7 : 0.27,
            textAlign: "center"
          }}
          backgroundColor={
            active ? Colors.primaryColor : "rgba(255,255,255,0.27)"
          }
          onPress={() => {
            {
              onPress && onPress();
            }
            this.toggleIcon();
          }}
          style={{
            height: 47,
            width: 47,
            justifyContent: "center",
            borderRadius: 100
          }}
          iconStyle={{
            marginRight: 0
          }}
          size={32}
          color={active ? Colors.gradientColor.top : Colors.primaryColor}
          textStyle={{ marginLeft: -9.8 }}
        />
      </View>
    );
  }
}
CallButtonToggle.propTypes = {
  buttonColor: string,
  icon: string.isRequired,
  label: string,
  labelColor: string,
  onPress: func,
  toggle: bool,
  iconToggled: string,
  active: bool
};

const mS = state => ({
  muteCustomer: state.callCustomerSettings.mic,
  videoCustomer: state.callCustomerSettings.video,
  speakerCustomer: state.callCustomerSettings.speaker,
  rotateCustomer: state.callCustomerSettings.rotate,
  muteLinguist: state.callLinguistSettings.mic,
  videoLinguist: state.callLinguistSettings.video,
  speakerLinguist: state.callLinguistSettings.speaker,
  rotateLinguist: state.callLinguistSettings.rotate
});

const mD = {
  updateSettings,
  updateLinguistSettings
};

export default connect(mS, mD)(CallButtonToggle);
