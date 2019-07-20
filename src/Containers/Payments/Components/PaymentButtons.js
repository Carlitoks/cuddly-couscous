import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/PaymentButtons";

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

  render() {
    return (
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          disabled={!this.isDisabled()}
          onPress={() => { this.props.onPress() }}
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
};

export default connect(
  mS,
  mD
)(PaymentButtons);
