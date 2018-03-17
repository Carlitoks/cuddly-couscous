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
  updateSettings as updateContactLinguistSettings,
  resetCounter,
  incrementCounter
} from "../../Ducks/CallLinguistSettings.js";
import { bool, func, number, object, string } from "prop-types";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";
import { View, AppState, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

/**
 * @description Generic call button component
 *
 * Props:
    onPress: PropTypes.func,
    buttonColor: Base button color,
    icon: Base icon name,
    toggle: "True" if icon can be toggled,
    iconToggled: Name of the toggled icon,
    opacity: "True" to set opacity on button
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
  componentDidMount() {
    this.changeIcon(this.props.active);
  }

  changeIcon = value => {
    this.setState({
      iconName: value ? this.props.icon : this.props.iconToggled
    });
  };
  toggleIcon = () => {
    switch (this.props.name) {
      case "CustomerMute":
        setPermission("microphone").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ mute: !this.props.muteCustomer });
            this.changeIcon(this.props.muteCustomer);
          }
        });
        break;
      case "CustomerVideo":
        setPermission("camera").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ video: !this.props.videoCustomer });
            this.changeIcon(this.props.videoCustomer);
          }
        });
        break;
      case "CustomerSpeaker":
        this.props.updateSettings({ speaker: !this.props.speakerCustomer });
        this.changeIcon(this.props.speakerCustomer);
        break;
      case "CustomerCamera":
        if (typeof this.props.ref !== "string") {
          this.props.ref.switchCamera();
          this.props.updateSettings({ rotate: !this.props.rotateCustomer });
          this.changeIcon(this.props.rotateCustomer);
        }
        break;
      case "LinguistVideo":
        console.log("LinguistVideo");
        break;
      case "LinguistSpeaker":
        console.log("LinguistSpeaker");
        break;
      default:
        console.log("Nothing");
        break;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Button
          borderRadius={100}
          containerViewStyle={{
            borderRadius: 100,
            opacity: this.props.opacity
          }}
          backgroundColor={this.props.buttonColor}
          onPress={() => {
            if (this.props.toggle) {
              this.toggleIcon();
            }
          }}
          buttonStyle={{
            height: this.props.buttonSize,
            width: this.props.buttonSize,
            justifyContent: "center",
            borderRadius: 100
          }}
          icon={{
            name: this.state.iconName,
            size: this.props.iconSize,
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
  opacity: number,
  toggle: bool,
  iconToggled: string,
  buttonSize: number,
  iconSize: number,
  active: bool,
  ref: string
};

const mS = state => ({
  muteCustomer: state.callCustomerSettings.mute,
  videoCustomer: state.callCustomerSettings.video,
  speakerCustomer: state.callCustomerSettings.speaker,
  rotateCustomer: state.callCustomerSettings.rotate,
  muteLinguist: state.callLinguistSettings.mute,
  videoLinguist: state.callLinguistSettings.video,
  speakerLinguist: state.callLinguistSettings.speaker
});

const mD = {
  updateSettings,
  updateContactLinguistSettings
};

export default connect(mS, mD)(CallButtonToggle);
