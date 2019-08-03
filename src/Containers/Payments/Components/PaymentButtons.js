import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/PaymentButtons";

class PaymentButtons extends Component {

  renderButtonStyles = type => {
    if (this.props.loading || !this.isDisabled() ) {
      return { ...styles.addCardButtonDisable };
    }
    return styles.addCardButton;
  };

  isDisabled = () => {
    const { isValidCC, isValidDate, isValidCVV } = this.props;
    return (isValidCC && isValidDate && isValidCVV) ;
  };

  render() {
    const {loading } = this.props;
    return (
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          disabled={loading || !this.isDisabled()}
          onPress={() =>{ 
              this.props.onPress();
          }}
          style={this.renderButtonStyles()}
        >
          <Text
            style={loading || !this.isDisabled() ? styles.addCardButtonDisabled : styles.addCardButtonText}
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
  cardInfo: state.payments.cardInfo,
});

const mD = {
};

export default connect(
  mS,
  mD
)(PaymentButtons);
