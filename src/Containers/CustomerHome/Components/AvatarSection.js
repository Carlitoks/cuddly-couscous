import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/AvatarSectionStyles";
import I18n from "../../../I18n/I18n";

const Jeenies = require("../../../Assets/Images/J_middle.png");

class AvatarSection extends Component {
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    const { navigation, secondaryLangCode } = this.props;
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.jeeniesStandingBy}>
          {secondaryLangCode
            ? I18n.t("newCustomerHome.numLinguists", { num: this.getRandomInt(40, 60) })
            : I18n.t("newCustomerHome.linguists")}
        </Text>
        <View style={styles.jeenieLogoContainer}>
          <Image style={styles.jeeniesImg} source={Jeenies} />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode
});

const mD = {};

export default connect(
  mS,
  mD
)(AvatarSection);
