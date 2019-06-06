import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Icons from "../Icons";

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
    const { StripePaymentSourceMeta, navigation } = this.props;

    return (
      <View style={styles.flexEndCenter}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.dispatch({ type: "CardInfoScreen" })}
        >
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
                : null
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
  token: state.auth2.userJwtToken,
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
