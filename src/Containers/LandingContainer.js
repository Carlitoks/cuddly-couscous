import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

class LandingContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Splash Screen Around Here
    // Check if there is an active session and redirect to the appropiate view
  }

  render() {
    return (
      <View>
        <RkButton
          style={styles.Button}
          onPress={() => {
            this.props.navigation.dispatch({ type: "Login" });
          }}
        >
          Login
        </RkButton>

        <RkButton
          style={styles.Button}
          onPress={() => {
            this.props.navigation.dispatch({ type: "Profile" });
          }}
        >
          Profile
        </RkButton>
      </View>
    );
  }
}

export default LandingContainer;
