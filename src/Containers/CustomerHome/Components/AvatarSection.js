import React, { Component } from "react";
import { Image, Text, View } from "react-native";
// Styles
import styles from "./Styles/AvatarSectionStyles";
import I18n from "../../../I18n/I18n";

const Jeenies = require("../../../Assets/Images/Jeenies.png");

export default class AvatarSection extends Component {
  render() {
    const {
      navigation,
    } = this.props;
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.jeeniesStandingBy}>{I18n.t("newCustomerHome.numLinguists", { num: 54 })}</Text>
        <Image style={styles.jeeniesImg} source={Jeenies} />
      </View>
    );
  }
}
