import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import Reactotron from "reactotron-react-native";

// Styles
import styles from "./Styles/PaymentButtons";
import stripe from "tipsi-stripe";
import {
  clearPayments,
  removePayment,
  setPayment,
  updatePayments
} from "../../../Ducks/PaymentsReducer";
import { updateView } from "../../../Ducks/UserProfileReducer";

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
  isValidCC: state.payments.isValidCC,
  isValidDate: state.payments.isValidDate,
  isValidCVV: state.payments.isValidCVV,
  loading: state.payments.loading,
  cardInfo: state.payments.cardInfo
});

const mD = {
  updatePayments,
  clearPayments,
  setPayment,
  removePayment,
  updateView
};

export default connect(
  mS,
  mD
)(PaymentButtons);
