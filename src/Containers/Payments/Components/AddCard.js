import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { number as validCC } from "card-validator";
import CreditCardNumber from "./Partials/CreditCardNumber";
import ExpirationDate from "./Partials/ExpirationDate";
import CVV from "./Partials/CVV";
import Icons from "../Icons";
import Reactotron from "reactotron-react-native";
import moment from "moment";
import { updatePayments } from "../../../Ducks/PaymentsReducer";
// Styles
import styles from "./Styles/AddCardStyles";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };
  }
  onTooltipPress = () => {
    this.setState({
      currentTooltipIcon:
        this.state.currentTooltipIcon === Icons.info_cvv_pressed
          ? Icons.info_cvv
          : Icons.info_cvv_pressed
    });
  };

  onDateChange = date => {
    this.setState({ date });
    if (date.length >= 5 && moment(date, "MM/YY").isValid()) {
      const userDate = date.split("/");
      const updatedCard = {
        ...this.props.cardInfo,
        expYear: parseInt(userDate[1]),
        expMonth: parseInt(userDate[0])
      };
      this.props.updatePayments({ cardInfo: updatedCard, isValidDate: true });
    }
  };

  onChangeCVV = cvv => {
    const updatedCard = { ...this.props.cardInfo, cvc: cvv };
    this.props.updatePayments({ cardInfo: updatedCard });
    if (cvv.length >= 3) {
      this.props.updatePayments({ isValidCVV: true });
    }
  };

  onChange = card => {
    const updatedCard = { ...this.props.cardInfo, number: card };
    this.props.updatePayments({ cardInfo: updatedCard });

    let currentIcon = validCC(card).card ? Icons[validCC(card).card.type] : Icons.placeholder;
    if (validCC(card).isPotentiallyValid) {
      if (validCC(card).isValid) {
        this.props.updatePayments({ isValidCC: true });
        this.setState({ creditCardIcon: currentIcon });
      } else {
        this.props.updatePayments({ isValidCC: false });
        this.setState({ creditCardIcon: currentIcon });
      }
    } else {
      this.props.updatePayments({ isValidCC: false });
      this.setState({ creditCardIcon: currentIcon });
    }
  };

  render() {
    const { type, StripePaymentSourceMeta } = this.props;
    let creditCardNumber;
    let creditCardIcon;
    if (type === "cardInfo" && StripePaymentSourceMeta) {
      creditCardNumber = "XXXX-XXXX-XXXX-" + StripePaymentSourceMeta.last4.toString();
      creditCardIcon = Icons[StripePaymentSourceMeta.brand.toLowerCase()];
    }
    return (
      <View style={styles.flexEndCenter}>
        <CreditCardNumber
          type={"cardInfo"}
          creditCard={
            type === "cardInfo" && StripePaymentSourceMeta
              ? creditCardNumber
              : this.props.cardInfo.number
          }
          onChange={type ? null : this.onChange}
          creditCardIcon={
            type === "cardInfo" && StripePaymentSourceMeta
              ? creditCardIcon
              : this.state.creditCardIcon
          }
          isValidCC={this.state.isValidCC}
        />
        <View style={styles.addCardBottomInputs}>
          <ExpirationDate date={this.state.date} onDateChange={type ? null : this.onDateChange} />
          <CVV
            CVV={this.props.cardInfo.cvc}
            onChangeCVV={type ? null : this.onChangeCVV}
            onTooltipPress={this.onTooltipPress}
            currentTooltipIcon={this.state.currentTooltipIcon}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  token: state.auth.token,
  cardInfo: state.payments.cardInfo,
  StripePaymentSourceMeta: state.userProfile.StripePaymentSourceMeta
});

const mD = {
  updatePayments
};

export default connect(
  mS,
  mD
)(AddCard);
