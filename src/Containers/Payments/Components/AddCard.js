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
    this.props.updatePayments({
      expDate: ""
    });
    if (date.length >= 5 && moment(date, "MM/YY").isValid()) {
      if (moment(date, "MM/YY").unix() >= moment(new Date(), "MM/YY").unix()) {
        const userDate = date.split("/");
        const updatedCard = {
          ...this.props.cardInfo,
          expYear: parseInt(userDate[1]),
          expMonth: parseInt(userDate[0])
        };
        this.props.updatePayments({
          cardInfo: updatedCard,
          isValidDate: true,
          expDate: this.state.date
        });
      } else {
        this.setState({ date: "" });
      }
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
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };

    if (type === "cardInfo" && StripePaymentSourceMeta) {
      cardInfo.creditCardNumber = "XXXX-XXXX-XXXX-" + StripePaymentSourceMeta.last4.toString();
      cardInfo.creditCardIcon = Icons[StripePaymentSourceMeta.brand.toLowerCase()];
      cardInfo.expDate =
        StripePaymentSourceMeta.expMonth.toString() +
        "/" +
        StripePaymentSourceMeta.expYear.toString();
    }
    return (
      <View style={styles.flexEndCenter}>
        <CreditCardNumber
          type={type}
          creditCard={
            type === "cardInfo" && StripePaymentSourceMeta
              ? cardInfo.creditCardNumber
              : this.props.cardInfo.number
          }
          onChange={this.onChange}
          creditCardIcon={
            type === "cardInfo" && StripePaymentSourceMeta
              ? cardInfo.creditCardIcon
              : this.state.creditCardIcon
          }
          isValidCC={this.state.isValidCC}
        />
        <View style={styles.addCardBottomInputs}>
          <ExpirationDate
            type={type}
            date={
              type === "cardInfo" && StripePaymentSourceMeta
                ? cardInfo.expDate
                : this.state.date != ""
                ? this.state.date
                : this.props.expDate
            }
            onDateChange={this.onDateChange}
          />
          <CVV
            type={type}
            CVV={this.props.cardInfo.cvc}
            onChangeCVV={this.onChangeCVV}
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
  expDate: state.payments.expDate,
  StripePaymentSourceMeta: state.userProfile.StripePaymentSourceMeta
});

const mD = {
  updatePayments
};

export default connect(
  mS,
  mD
)(AddCard);
