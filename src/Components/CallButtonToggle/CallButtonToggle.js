import React, { Component } from "react";
import { connect } from "react-redux";
import { update as updateSettings } from "../../Ducks/ActiveSessionReducer";
import InCallManager from "react-native-incall-manager";
import { bool, func, number, object, string } from "prop-types";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";
import { View, AppState, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Iphone5 } from "../../Util/Devices";
import Colors from "../../Themes/Colors";
import Sound from "react-native-sound";

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

  componentDidMount(){
    if (this.props.speaker) {
      InCallManager.setForceSpeakerphoneOn(true);
    } else {
      InCallManager.setForceSpeakerphoneOn(false);
    }
    Sound.setCategory('Playback');
    Sound.setMode('Default');
    Sound.setActive(true);
  }

  componentWillUnmount(){
    Sound.setActive(false);
  }

  toggleIcon = () => {
    switch (this.props.name) {
      case "Mute":
        setPermission("microphone").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ mic: !this.props.mic });
          }
        });
        break;
      case "Video":
        setPermission("camera").then(response => {
          if (response == "denied" || response == "restricted") {
            displayOpenSettingsAlert();
          } else {
            this.props.updateSettings({ video: !this.props.video });
          }
        });
        break;
      case "Speaker":
        if (this.props.speaker) {
          InCallManager.setForceSpeakerphoneOn(false);
        } else {
          InCallManager.setForceSpeakerphoneOn(true);
        }
        this.props.updateSettings({ speaker: !this.props.speaker });
        break;
      case "Camera":
        if (this.props.video) {
          this.props.updateSettings({ rotate: !this.props.rotate });
        }
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
  mic: state.activeSessionReducer.mic,
  video: state.activeSessionReducer.video,
  speaker: state.activeSessionReducer.speaker,
  rotate: state.activeSessionReducer.rotate
});

const mD = {
  updateSettings
};

export default connect(
  mS,
  mD
)(CallButtonToggle);
