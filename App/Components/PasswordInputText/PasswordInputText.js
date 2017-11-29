import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RkTextInput } from "react-native-ui-kitten";
import { View, StyleSheet, Dimensions } from "react-native";
export default class PasswordInputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icEye: "visibility-off",
      password: true
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: "visibility",
        password: false
      };
    } else {
      newState = {
        icEye: "visibility-off",
        password: true
      };
    }
    this.setState(newState);
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <RkTextInput
          {...this.props}
          autoCorrect={false}
          secureTextEntry={this.state.password}
        />
        <Icon
          style={styles.icon}
          name={this.state.icEye}
          size={25}
          onPress={this.changePwdType}
        />
      </View>
    );
  }
}
const width = Dimensions.get("window").width - 20;
export const styles = StyleSheet.create({
  viewContainer: {
    width: width
  },
  icon: {
    position: "absolute",
    top: 33,
    right: 0
  }
});
