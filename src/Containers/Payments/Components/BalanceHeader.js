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
    const {
      havePaymentDetails,
      hasUnlimitedUse,
      hasUnlimitedUseUntil,
      minutePackage,
    } = this.props;

    if (!havePaymentDetails && !hasUnlimitedUse) {
      return I18n.t("account.descriptions.noCardNoPackage");
    }
    if (hasUnlimitedUse && !!minutePackage) {
      // return I18n.t("account.descriptions.hasPackageUnlimitedUse", {date: ""});
    }
    if (hasUnlimitedUse && !!hasUnlimitedUseUntil) {
      return I18n.t("account.descriptions.hasUnlimitedUse", {date: hasUnlimitedUseUntil.format("ll")});
    }
    if (havePaymentDetails && !minutePackage) {
      return I18n.t("account.descriptions.hasCardNoPackage");
    }
    if (havePaymentDetails && !!minutePackage && minutePackage.reloadable) {
      return I18n.t("account.descriptions.hasCardHasPackage", {num: minutePackage.reloadAtAmount || 0});
    }

    return null;
  }

  render() {
    const { havePaymentDetails, hasUnlimitedUse, minutes } = this.props;

    return (
      <View style={styles.balanceHeader}>  
        <Text style={styles.balanceTitle}>{I18n.t("packages.success.balance")}</Text>

        {hasUnlimitedUse? 
          <Text style={styles.unlimited}>{I18n.t("account.balanceUnlimited")}</Text>
          :
          <View style={{flexDirection:'row',flexWrap: 'wrap', overflow:"hidden"        }}>

          <Text style={minutes > 10  ? styles.balanceHaveMinutes : 11 > minutes && minutes > 5 ? styles.balanceFewMinutes : styles.balanceMinutes}>{I18n.t("account.balanceNum", {num: minutes})}</Text>
    </View>
         
          }
        <Text style={styles.balanceDescription}>{this.getSubtitleText()}</Text>
    </View>
    );
  }
}
