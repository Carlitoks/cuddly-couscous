import React, { Component } from "react";
import { bool, func, number, object, string } from "prop-types";

import { View, AppState, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Iphone5 } from "../../Util/Devices";

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
export default class CallButton extends Component {
  state = {
    iconName: this.props.icon,
    isActive: false
  };

  componentDidMount() {
    if (this.props.active) {
      this.toggleIcon();
    }
  }

  /*
  componentWillUnmount() {
    AppState.removeEventListener("change", this.toggleIcon);
  }*/

  toggleIcon = () => {
    this.setState(prevState => {
      return {
        isActive: !prevState.isActive,
        iconName: prevState.isActive ? this.props.icon : this.props.iconToggled
      };
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          bottom: -12.25,
          marginLeft: 5,
          marginRight: 5
        }}
      >
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
            } else {
              if (!this.state.isActive) {
                this.props.onPress();
                this.setState({ ...this.state, isActive: true });
              }
            }
          }}
          buttonStyle={{
            height: 71.5,
            width: 71.5,
            justifyContent: "center",
            borderRadius: 100
          }}
          icon={{
            name: this.state.iconName,
            size: 31.3,
            color: "white",
            buttonStyle: { textAlign: "center", right: 10 }
          }}
          textStyle={{ marginLeft: -9.8 }}
        />
        {this.props.label && (
          <Text
            style={{
              color: this.props.labelColor,
              backgroundColor: "rgba(0,0,0,0)"
            }}
          >
            {this.props.label}
          </Text>
        )}
      </View>
    );
  }
}

CallButton.propTypes = {
  buttonColor: string,
  icon: string.isRequired,
  label: string,
  labelColor: string,
  onPress: func.isRequired,
  opacity: number,
  toggle: bool,
  iconToggled: string,
  active: bool
};

CallButton.defaultProps = {
  buttonColor: "#616161",
  labelColor: "white",
  opacity: 1,
  toggle: false,
  active: false
};
