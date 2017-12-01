import React, { Component } from "react";
import { SelectRoleView } from "../Components/SelectRoleView/SelectRoleView";
import { View, StyleSheet, Dimensions } from "react-native";

export default class SelectRole extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

    return <SelectRoleView navigate={navigate} />;
  }
}
