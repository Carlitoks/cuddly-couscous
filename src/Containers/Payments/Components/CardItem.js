import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { number as validCC } from "card-validator";
import Icons from "../Icons";
import Reactotron from "reactotron-react-native";

import { updatePayments } from "../../../Ducks/PaymentsReducer";
// Styles
import styles from "./Styles/PaymentDetailStyles";

class CardItem extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };*/
  }

  render() {
    const { StripePaymentSourceMeta } = this.props;
    console.log(StripePaymentSourceMeta);
    return (
      <View style={styles.flexEndCenter}>
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemText}>
            XXXX XXXX XXXX{" "}
            {StripePaymentSourceMeta && StripePaymentSourceMeta.last4
              ? StripePaymentSourceMeta.last4
              : "XXXX"}
          </Text>
          <Image
            resizeMode="contain"
            style={styles.cardIcon}
            source={
              StripePaymentSourceMeta && StripePaymentSourceMeta.brand
                ? Icons[StripePaymentSourceMeta.brand.toLowerCase()]
                : Icons.cvc
            }
          />
        </TouchableOpacity>
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
)(CardItem);
