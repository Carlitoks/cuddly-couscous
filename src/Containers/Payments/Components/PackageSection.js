import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");
class PackageSection extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };*/
  }

  render() {
    const { StripePaymentSourceMeta, navigation } = this.props;

    return (
      <View style={styles.packageContainer}>  
      <View style={styles.row}>  
      <Text style={styles.creditCardTitle}>{I18n.t("account.card.title")}</Text>
      <View style={styles.buttonContainer}>  
      <TouchableOpacity
        onPress={() => {}}
        style={styles.addCardButton }
      >
        <Text
          style={styles.addCarduttonText}
        >
          {I18n.t("newCustomerHome.addCard")}
        </Text>
      </TouchableOpacity>
      </View>

      </View>
      <View style={styles.rowDescription}>  
        <Image style={styles.backgroundImage} source={packageImage} />
        <Text
          style={styles.description}
        >
          {I18n.t("account.card.description", { rate: "US$1" })}
        </Text>
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
)(PackageSection);
