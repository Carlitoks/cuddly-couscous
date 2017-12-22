import React, { Component } from "react";
import { bool, func, number, object, string } from "prop-types";

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
export class CallButton extends Component {
  state = {
    iconName: this.props.icon,
    isActive: false
  };

  /*componentDidMount() {
    AppState.addEventListener("change", this.toggleIcon);
  }

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
            this.props.onPress();
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
  buttonSize: number,
  iconSize: number
};

CallButton.defaultProps = {
  buttonColor: "#616161",
  labelColor: "white",
  opacity: 1,
  toggle: false,
  buttonSize: 80,
  iconSize: 40
};
