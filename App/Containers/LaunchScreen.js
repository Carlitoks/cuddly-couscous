import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Login } from "../Containers/Login";
import TokBoxTest from "../Components/TokBoxTest";

// Styles
import styles from "./Styles/LaunchScreenStyles";

export default class LaunchScreen extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <View style={styles.container}>
        <Button title="to login" onPress={() => navigate("Login")} />
        <Button
          title="to Customer"
          onPress={() => navigate("CustomerAccount")}
        />
        <TokBoxTest />
      </View>
    );
  }
}
