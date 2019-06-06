import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/PaymentButtons";
import stripe from "tipsi-stripe";
import {
  clearPayments,
  removePayment,
  setPayment,
  updatePayments
} from "../../../Ducks/PaymentsReducer";
import { getProfileAsync, updateView } from "../../../Ducks/UserProfileReducer";

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
      updateView,
      setPayment,
      clearPayments,
      navigation,
      uuid,
      token,
      getProfileAsync
    } = this.props;

    const params = {
      number: cardInfo.number.replace(/\s/g, ""),
      expMonth: cardInfo.expMonth,
      expYear: cardInfo.expYear,
      cvc: cardInfo.cvc
    };

    updatePayments({ loading: true });
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(response => {
        let tokenId = response.tokenId;
        updateView({ stripePaymentToken: tokenId });
        setPayment(tokenId).then(res => {
          if (res) {
            updatePayments({ loading: false });
            Alert.alert(I18n.t("error"), translateApiError(res), [
              {
                text: I18n.t("ok")
              }
            ]);
          } else {
            clearPayments();
            updatePayments({ errors: [] });
            updatePayments({ loading: false });
            navigation.dispatch({ type: "Home" });
          }
        });
      })
      .catch(err => {
        Alert.alert(I18n.t("error"), translateApiError(err), [
          {
            text: I18n.t("ok")
          }
        ]);
        /*Alert.alert(I18n.t("api.errTemporaryTryAgain"), "", [
          {
            text: I18n.t("ok"),
            onPress: () => {
              navigation.dispatch({
                type: "Home"
              });
            }
          }
        ]);*/
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
  token: state.auth2.userJwtToken,
  uuid: state.auth2.userID
});

const mD = {
  updatePayments,
  clearPayments,
  setPayment,
  removePayment,
  updateView,
  getProfileAsync
};

export default connect(
  mS,
  mD
)(PaymentButtons);
