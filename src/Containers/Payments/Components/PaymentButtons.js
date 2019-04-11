import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator, Platform } from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../../I18n/I18n";
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
import { updateView, getProfileAsync } from "../../../Ducks/UserProfileReducer";

class PaymentButtons extends Component {
  renderButtonStyles = type => {
    if (!this.isDisabled()) {
      return { ...styles.addCardButtonDisable };
    }
    return styles.addCardButton;
  };

  isDisabled = () => {
    const { isValidCC, isValidDate, isValidCVV, loading } = this.props;
    Reactotron.log(isValidCC && isValidDate && isValidCVV);
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
    Reactotron.log(params);
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(response => {
        let tokenId = response.tokenId;
        Reactotron.log(tokenId);
        updateView({ stripePaymentToken: tokenId });
        setPayment(tokenId).then(res => {
          if (res) {
            updatePayments({ loading: false });
            Reactotron.log(res);
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
        Reactotron.log(err);
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
  token: state.auth.token,
  uuid: state.auth.uuid
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
