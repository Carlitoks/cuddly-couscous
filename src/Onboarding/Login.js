import React from "react";
import { View, Text, Button } from "react-native";

import { StyleSheet, Dimensions } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

styles = StyleSheet.create({
  Button: {
    borderRadius: 25,
    width: 250
  }
});

const Login = props => {
  return (
    <View>
      <Text>Login View</Text>
      <RkButton
        style={styles.Button}
        onPress={() => {
          props.navigation.dispatch({ type: "Profile" });
        }}
      >
        Profile
      </RkButton>
    </View>
  );
};

export default Login;
