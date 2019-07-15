import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import I18n from "../../../I18n/I18n";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");

export default class BalanceHeader extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };*/
  }

  getSubtitleText () {
    const {havePaymentDetails, hasUnlimitedUse, minutePackage, minutes} = this.props;
    if (!havePaymentDetails && !hasUnlimitedUse && minutes <= 0) {
      return I18n.t("account.descriptions.noCardNoPackage");
    }
    if (hasUnlimitedUse && !!minutePackage) {
      // return I18n.t("account.descriptions.hasPackageUnlimitedUse", {date: ""});
    }
    if (hasUnlimitedUse) {
      // return I18n.t("account.descriptions.hasUnlimitedUse", {date: ""});
    }
    if (havePaymentDetails && !minutePackage) {
      return I18n.t("account.descriptions.hasCardNoPackage");
    }
    if (havePaymentDetails && !!minutePackage && !!minutePackage.reloadAtAmount) {
      return I18n.t("account.descriptions.hasCardHasPackage", {num: minutePackage.reloadAtAmount});
    }

    return null;
  }

  render() {
    const { havePaymentDetails, hasUnlimitedUse, minutes } = this.props;

    return (
      <View style={styles.balanceHeader}>  
      <View style={styles.balanceMinutesContainer}>
        <Text style={styles.balanceTitle}>{I18n.t("packages.success.balance")}</Text>

        {hasUnlimitedUse? 
          <Text style={styles.unlimited}>{I18n.t("account.balanceUnlimited")}</Text>
          :
          <View
          style={ minutes< 11 ? styles.balanceContainer  : styles.balanceContainerWhite  }
        >
          <View
          style={
            minutes < 6 
              ? styles.outOfMinutesContainer
              : minutes > 5 && minutes < 11
              ? styles.fewMinutesLeftContainer
              : styles.minutesLeftContainer
          }
        >
          <Text style={styles.balanceMinutes}>{I18n.t("account.balanceNum", {num: minutes})}</Text>
      </View>
      </View>

          
          }
        <Text style={styles.balanceDescription}>{this.getSubtitleText()}</Text>
      </View>
    </View>
    );
  }
}
