import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Colors } from "../../Themes";

import styles from "./styles";

class InputPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconEye: "visibility-off",
      password: true
    };
  }

  toggleVisibility = () => {
    let newState;
    if (this.state.password) {
      newState = {
        iconEye: "visibility",
        password: false
      };
    } else {
      newState = {
        iconEye: "visibility-off",
        password: true
      };
    }
    this.setState(newState);
  };

  render() {
    return (
      <View style={[styles.viewBorder, !!this.props.sec ? styles.secondary : null]}>
        <FormInput
          {...this.props}
          underlineColorAndroid={Colors.transparent}
          autoCorrect={false}
          secureTextEntry={this.state.password}
          inputStyle={styles.formInput}
          placeholderTextColor={Colors.placeholderColor}
          containerStyle={[styles.container]}
        />
        <Icon
          style={[styles.icon, !!this.props.sec ? styles.iconSecondary : null]}
          name={this.state.iconEye}
          size={25}
          onPress={this.toggleVisibility}
        />
      </View>
    );
  }
}

export default InputPassword;
