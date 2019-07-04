import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");
class BalanceHeader extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };*/
  }

  render() {
    const { StripePaymentSourceMeta, navigation, havePaymentDetails, minutes } = this.props;

    return (
      <View style={styles.balanceHeader}>  
      <View style={styles.balanceMinutesContainer}>  
        <Text style={styles.balanceTitle}>{I18n.t("packages.success.balance")}</Text>

        {havePaymentDetails? 
          <Text style={styles.unlimited}>{I18n.t("account.balanceUnlimited")}</Text>
          : <Text style={styles.balanceMinutes}>{I18n.t("account.balanceNum", {num: minutes})}</Text>}
        <Text style={styles.balanceDescription}>{I18n.t("account.descriptions.noCardNoPackage")}</Text>      
      </View>
    </View>
    );
  }
}

const mS = state => ({
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta
});

const mD = {
};

export default connect(
  mS,
  mD
)(BalanceHeader);
