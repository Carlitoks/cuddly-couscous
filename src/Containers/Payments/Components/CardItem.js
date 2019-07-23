import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Icons from "../Icons";
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

  mask(){
    const { StripePaymentSourceMeta } = this.props;

    let last4 = StripePaymentSourceMeta && StripePaymentSourceMeta.last4
    ? StripePaymentSourceMeta.last4 : "XXXX";

    const patter = StripePaymentSourceMeta && StripePaymentSourceMeta.brand == 'Diners Club'
    ? "XXXX XXXX XX" : "XXXX XXXX XXXX ";

    if(StripePaymentSourceMeta && StripePaymentSourceMeta.brand == 'Diners Club' )
      last4 = [last4.slice(0, 2), ' ', last4.slice(2)].join('');

    return `${patter}${last4}`
    
  }

  render() {
    const { StripePaymentSourceMeta, navigation, stylesContainer } = this.props;

    return (
      <View style={stylesContainer ? stylesContainer.flexEndCenter : styles.flexEndCenter}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.dispatch({ type: "EditCardScreen" })}
        >
          <Text style={styles.itemText}>
            {this.mask()}
          </Text>
          <Image
            resizeMode="contain"
            style={styles.cardIcon}
            source={
              StripePaymentSourceMeta && StripePaymentSourceMeta.brand
                ? Icons[StripePaymentSourceMeta.brand.toLowerCase().replace(/\s/g, "-")]
                : null
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta
});

const mD = {
};

export default connect(
  mS,
  mD
)(CardItem);
