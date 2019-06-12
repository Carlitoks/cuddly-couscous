import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";

// Styles
import styles from "./Styles/PaymentButtons";
import { removeUserPaymentDetails } from "../../../Ducks/AccountReducer";

class PaymentButtons extends Component {
  isDisabled = () => {
    const { isValidCC, isValidDate, isValidCVV, loading } = this.props;
    return (isValidCC && isValidDate && isValidCVV) || loading;
  };

  removePaymentCard = () => {
    const { removePayment } = this.props;
    Alert.alert(
      I18n.t("payments.removeCard"),
      I18n.t("payments.removeCardAlert"),
      [
        {
          text: I18n.t("actions.remove"),
          onPress: () => {
            removePayment();
          }
        },
        {
          text: I18n.t("actions.cancel"),
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity onPress={() => this.removePaymentCard()} style={styles.removeCardButton}>
          <Text style={styles.addCardButtonText}>{I18n.t("payments.removeCard")}</Text>
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
  removeUserPaymentDetails,
};

export default connect(
  mS,
  mD
)(PaymentButtons);
