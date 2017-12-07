import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

import InputPassword from "../Components/InputPassword/InputPassword";

class LandingContainer extends Component {
  componentDidMount() {
    // Splash Screen Around Here
    // Check if there is an active session and redirect to the appropiate view
  }

  render() {
    return (
      <View>
        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "LoginView" });
          }}
        >
          Login
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "ForgotPasswordView" });
          }}
        >
          ForgotPasswordView
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "CustomerAccount" });
          }}
        >
          CustomerAccount
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "SelectRoleView" });
          }}
        >
          SelectRoleView
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "IncomingCallView" });
          }}
        >
          IncomingCallView
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "Home" });
          }}
        >
          Home
        </RkButton>
      </View>
    );
  }
}

export default LandingContainer;
