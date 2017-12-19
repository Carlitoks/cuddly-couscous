import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

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
            this.props.navigation.dispatch({ type: "CustomerView" });
          }}
        >
          Publisher
        </RkButton>

        <RkButton
          onPress={() => {
            this.props.navigation.dispatch({ type: "LoginView" });
          }}
        >
          Suscriber
        </RkButton>
      </View>
    );
  }
}

export default LandingContainer;
