import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { number as validCC } from "card-validator";
import CreditCardNumber from "./Partials/CreditCardNumber";
import ExpirationDate from "./Partials/ExpirationDate";
import CVV from "./Partials/CVV";
import Icons from "../Icons";
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
      currentTooltipIcon: Icons.info_cvv,
      cvvFocus: false,
      expirationDateFocus: false, 
      cardNumberFocus: false,
    };
  }

  onFocusChange = (type) => {
    console.log("some change", type);
    let state = {...this.state};
    switch (type) {
      case 'cvvFocus':
        state = {
          cvvFocus: true,
          expirationDateFocus: false, 
          cardNumberFocus: false,
        };
        break;
      case 'expirationDateFocus':
        state = {
            cvvFocus: false,
            expirationDateFocus: true, 
            cardNumberFocus: false,
          };
        break;
      case 'cardNumberFocus':
        state = {
            cvvFocus: false,
            expirationDateFocus: false, 
            cardNumberFocus: true,
          };        break;
      default:
          state = {
            cvvFocus: false,
            expirationDateFocus: false, 
            cardNumberFocus: false,
          };
    }
    this.setState(state);
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
    }else{
      this.props.updatePayments({
        isValidDate: false,
      });
    }
  };

  onChangeCVV = cvv => {
    const updatedCard = { ...this.props.cardInfo, cvc: cvv };
    this.props.updatePayments({ cardInfo: updatedCard });
    const card = validCC(updatedCard.number);
    if(card && card.card.type == 'american-express'){
      if(cvv.length >=4){
        this.props.updatePayments({ isValidCVV: true });
      }else{
        this.props.updatePayments({ isValidCVV: false });
      }
    } else {
      if (cvv.length >= 3) {
        this.props.updatePayments({ isValidCVV: true });
      }else{
        this.props.updatePayments({ isValidCVV: false });
      }
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

  generateCardInfo = cardInfo => {
    const { type, StripePaymentSourceMeta } = this.props;
    if (type === "cardInfo" && StripePaymentSourceMeta) {
      cardInfo.creditCardNumber = "XXXX-XXXX-XXXX-" + StripePaymentSourceMeta.last4.toString();
      cardInfo.creditCardIcon = Icons[StripePaymentSourceMeta.brand.toLowerCase()];
      if (StripePaymentSourceMeta.expMonth.toString().length > 1) {
        cardInfo.expDate =
          StripePaymentSourceMeta.expMonth.toString() +
          "/" +
          StripePaymentSourceMeta.expYear.toString().substring(2);
      } else {
        cardInfo.expDate =
          "0" +
          StripePaymentSourceMeta.expMonth.toString() +
          "/" +
          StripePaymentSourceMeta.expYear.toString().substring(2);
      }
    }
    return cardInfo;
  };
  render() {
    const { type, StripePaymentSourceMeta, loading } = this.props;
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };
    cardInfo = this.generateCardInfo(cardInfo);
    return (
      <View style={styles.flexEndCenter}>
        {loading ? (
          <ActivityIndicator size="large" color="purple" style={styles.loaderStyle} />
        ) : (
          <React.Fragment />
        )}
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
          isValidCC={this.props.isValidCC}
          onFocus ={this.onFocusChange}
          cardNumberFocus={this.state.cardNumberFocus}
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
            isValidDate={this.props.isValidDate}
            onFocus ={this.onFocusChange}
            expirationDateFocus={this.state.expirationDateFocus}
          />
          <CVV
            type={type}
            brand={
              this.props.cardInfo.number && validCC(this.props.cardInfo.number).card
                ? validCC(this.props.cardInfo.number).card.type
                : null
            }
            CVV={this.props.cardInfo.cvc}
            onChangeCVV={this.onChangeCVV}
            onTooltipPress={this.onTooltipPress}
            currentTooltipIcon={this.state.currentTooltipIcon}
            onFocus ={this.onFocusChange}
            cvvFocus={this.state.cvvFocus}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  isValidDate: state.payments.isValidDate,
  loading: state.payments.loading,
  isValidCC: state.payments.isValidCC,
  cardInfo: state.payments.cardInfo,
  expDate: state.payments.expDate,
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta
});

const mD = {
  updatePayments
};

export default connect(
  mS,
  mD
)(AddCard);
