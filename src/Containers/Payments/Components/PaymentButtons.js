import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/PaymentButtons";
import stripe from "tipsi-stripe";
import {
  clearPayments,
  updatePayments
} from "../../../Ducks/PaymentsReducer";

import {
  updateUserPaymentDetails,
} from "../../../Ducks/AccountReducer";

class PaymentButtons extends Component {
  renderButtonStyles = type => {
    if (!this.isDisabled()) {
      return { ...styles.addCardButtonDisable };
    }
    return styles.addCardButton;
  };

  isDisabled = () => {
    const { isValidCC, isValidDate, isValidCVV, loading } = this.props;
    return (isValidCC && isValidDate && isValidCVV) || loading;
  };

  createTokenWithCard = async () => {
    const {
      cardInfo,
      updatePayments,
      clearPayments,
      navigation,
      updateUserPaymentDetails
    } = this.props;

    const params = {
      number: cardInfo.number.replace(/\s/g, ""),
      expMonth: cardInfo.expMonth,
      expYear: cardInfo.expYear,
      cvc: cardInfo.cvc
    };

    updatePayments({ loading: true });
    Reactotron.log(params);
    console.log("CALLING STRIPE");
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(response => {
        console.log("STRIPE RES");
        let tokenId = response.tokenId;
        Reactotron.log(tokenId);
        console.log("got stuff", tokenId);
        return updateUserPaymentDetails({stripePaymentToken: tokenId});
      })
      .then(() => {
        clearPayments();
        updatePayments({ errors: [] });
        navigation.dispatch({ type: "Home" });
      })
      .catch(err => {
        console.log("ERR");
        Reactotron.log(err);
        Alert.alert(I18n.t("error"), translateApiError(err));
      })
      .finally(() => {
        updatePayments({ loading: false });
      });
  };

  render() {
    return (
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          disabled={!this.isDisabled()}
          onPress={() => this.createTokenWithCard()}
          style={this.renderButtonStyles()}
        >
          <Text
            style={!this.isDisabled() ? styles.addCardButtonDisabled : styles.addCardButtonText}
          >
            {I18n.t("save")}
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
  cardInfo: state.payments.cardInfo,
});

const mD = {
  updatePayments,
  clearPayments,
  updateUserPaymentDetails,
};

export default connect(
  mS,
  mD
)(PaymentButtons);
