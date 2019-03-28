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
      date: ""
    };
  }

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
    //console.log(validCC(card).card);
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
    return (
      <View style={styles.flexEndCenter}>
        <CreditCardNumber
          creditCard={this.props.cardInfo.number}
          onChange={this.onChange}
          creditCardIcon={this.state.creditCardIcon}
          isValidCC={this.state.isValidCC}
        />
        <View style={styles.addCardBottomInputs}>
          <ExpirationDate date={this.state.date} onDateChange={this.onDateChange} />
          <CVV CVV={this.props.cardInfo.cvc} onChangeCVV={this.onChangeCVV} />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  token: state.auth.token,
  cardInfo: state.payments.cardInfo
});

const mD = {
  updatePayments
};

export default connect(
  mS,
  mD
)(AddCard);
