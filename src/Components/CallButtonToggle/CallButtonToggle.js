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
import Icon from "react-native-vector-icons/MaterialIcons";
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
        console.log("Linguist Speaker ", this.props.speakerLinguist);
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
        <Button
          borderRadius={100}
          containerViewStyle={{
            borderRadius: 100,
            opacity: 0.7
          }}
          backgroundColor={
            active ? Colors.enabledColor : Colors.callButtonColor
          }
          onPress={() => {
            {
              onPress && onPress();
            }
            this.toggleIcon();
          }}
          buttonStyle={{
            height: !Iphone5 ? 65 : 55,
            width: !Iphone5 ? 65 : 55,
            justifyContent: "center",
            borderRadius: 100
          }}
          icon={{
            name: this.state.iconName,
            size: !Iphone5 ? 30 : 23,
            color: "white",
            buttonStyle: { textAlign: "center", right: 10 }
          }}
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
