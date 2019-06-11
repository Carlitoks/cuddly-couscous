import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";

// Styles
import styles from "./Styles/PaymentButtons";

class PaymentButtons extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch({ type: "PaymentsView" })}
          style={styles.addCardButton}
        >
          <Text style={styles.addCardButtonText}>
            {I18n.t("pricingScreen.paymentInfo.linkNoCard")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
});

const mD = {
};

export default connect(
  mS,
  mD
)(PaymentButtons);
