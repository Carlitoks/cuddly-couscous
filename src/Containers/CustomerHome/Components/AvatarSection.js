import React, { Component } from "react";
import { Image, Text, View } from "react-native";
// Styles
import styles from "./Styles/AvatarSectionStyles";
import I18n from "../../../I18n/I18n";
import metrics from "../../../Themes/Metrics";
import { isIphoneXorAbove } from "../../../Util/Devices";

const Jeenies = require("../../../Assets/Images/J_middle.png");

export default class AvatarSection extends Component {
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    const { showNum } = this.props;
    return (
      <React.Fragment>
        <Text style={styles.jeeniesStandingBy}>
          {showNum
            ? I18n.t("newCustomerHome.numLinguists", { num: this.getRandomInt(40, 60) })
            : I18n.t("newCustomerHome.linguists")}
        </Text>
        <Image style={styles.imgStyleRegular} source={Jeenies} />
      </React.Fragment>
    );
  }
}
