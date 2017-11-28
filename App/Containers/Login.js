import React, { Component } from "react";
import { Text, Button, View } from "react-native";

export default class Login extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <View>
        <Button
          title="To LaunchScreen"
          onPress={() => navigate("LaunchScreen")}
        />
        <Text>Login</Text>
      </View>
    );
  }
}
