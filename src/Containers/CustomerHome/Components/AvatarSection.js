import React, { Component } from "react";
import { Image, Text, View } from "react-native";
// Styles
import styles from "./Styles/AvatarSectionStyles";
import I18n from "../../../I18n/I18n";
import { isIphoneXorAbove } from "../../../Util/Devices";

const Jeenies = require("../../../Assets/Images/J_middle.png");

export default class AvatarSection extends Component {

  getJeenieCount = () => {
    const {targetLang, langCounts} = this.props;
    if (!!langCounts && !!langCounts[targetLang]) {
      return langCounts[targetLang];
    }
    return 0;
  };

  getTitle = () => {
    const { showNum } = this.props;
    const num = this.getJeenieCount();
    if (showNum && num > 0) {
      return I18n.t("newCustomerHome.numLinguists", { num });
    }
    return I18n.t("newCustomerHome.linguists");
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.jeeniesStandingBy}>
          { this.getTitle() }
        </Text>
        <Image style={isIphoneXorAbove() ? styles.imgStyleXAndAbove : styles.imgStyleRegular} source={Jeenies} />
      </View>
    );
  }
}
