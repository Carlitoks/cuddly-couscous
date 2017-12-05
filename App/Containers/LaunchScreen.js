import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Login } from "../Containers/Login";
import { SelectRole } from "../Containers/SelectRole";
import TokBoxTest from "../Components/TokBoxTest";

// Styles
import styles from "./Styles/LaunchScreenStyles";

export default class LaunchScreen extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <View style={styles.container}>
        <Button
          title="to Customer"
          onPress={() => navigate("CustomerAccount")}
        />
        <Button
          title="LinguistAccount"
          onPress={() => navigate("LinguistAccount")}
        />
        <Button
          title="CustomerProfile"
          onPress={() => navigate("CustomerProfile")}
        />
        <Button
          title="LinguistProfile"
          onPress={() => navigate("LinguistProfile")}
        />
        <Button title="Select a role" onPress={() => navigate("SelectRole")} />
        <Button title="Call History" onPress={() => navigate("CallHistory")} />
      </View>
    );
  }
}
