import React, { Component } from "react";
import { LoginView } from "../Containers/LoginView/LoginView";

import { View, StyleSheet, Dimensions } from "react-native";

export default class Login extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

    return <LoginView navigate={navigate} />;
  }
}
