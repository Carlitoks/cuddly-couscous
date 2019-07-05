import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import TextBlockButton from "../../../Components/Widgets/TextBlockButton";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");
class PackageSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { StripePaymentSourceMeta, navigation, userPackage } = this.props;

    return (
      <View style={styles.packageContainer}>
        {!userPackage && (
          <View style={styles.row}>
            <Text style={styles.creditCardTitle}>{I18n.t("account.package.title")}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.addPackage();
                }}
                style={styles.addCardButton}
              >
                <Text style={styles.addCardButtonText}>{I18n.t("account.package.add")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!userPackage && (
          <View style={styles.rowDescription}>
            <Image style={styles.backgroundImage} source={packageImage} />
            <Text style={styles.description}>
              {I18n.t("account.package.description", { rate: "US$1" })}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mS = state => ({
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta
});

const mD = {};

export default connect(
  mS,
  mD
)(PackageSection);
