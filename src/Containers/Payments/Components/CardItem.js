import React, { Component } from "react";
import { View, Text, Image } from "react-native";
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
    return (
      <View style={styles.flexEndCenter}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>XXXX XXXX XXXX 1234</Text>
          <Image resizeMode="contain" style={styles.cardIcon} source={Icons.visa} />
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
)(CardItem);
