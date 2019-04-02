import React, { Component } from "react";
import { ScrollView, View, Alert, Image, Text } from "react-native";
import { connect } from "react-redux";
import Header from "../CustomerHome/Components/Header";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import AddCard from "./Components/AddCard";
import {
  clearPayments,
  removePayment,
  setPayment,
  updatePayments,
  changePayment,
  updateView
} from "../../Ducks/PaymentsReducer";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import Reactotron from "reactotron-react-native";

class EditCardScreen extends Component {
  componentWillMount() {
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
  }

  safeEditCard = async () => {
    const {
      cardInfo,
      updatePayments,
      updateView,
      removePayment,
      setPayment,
      clearPayments,
      navigation,
      StripePaymentSourceMeta,
      changePayment
    } = this.props;

    const params = {
      number: cardInfo.number.replace(/\s/g, ""),
      expMonth: cardInfo.expMonth,
      expYear: cardInfo.expYear,
      cvc: cardInfo.cvc
    };
    console.log("safeEdition");

    updatePayments({ loading: true });
    removePayment();
    Reactotron.log(params);
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(({ tokenId }) => {
        console.log(tokenId);

        Reactotron.log(tokenId);
        updateView({ stripePaymentToken: tokenId });
        setPayment(tokenId);
      })
      .then(() => {
        console.log("end of edition");
        clearPayments();
        updatePayments({ errors: [] });
        updatePayments({ loading: false });
        navigation.dispatch({ type: "Home" });
      })
      .catch(err => Reactotron.log(err));
  };

  render() {
    const { navigation } = this.props;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <Header navigation={navigation} safeEditCard={this.safeEditCard} />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <AddCard type={"cardEdit"} />
          </ScrollView>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  token: state.auth.token,
  uuid: state.auth.uuid,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  cardInfo: state.payments.cardInfo,
  StripePaymentSourceMeta: state.userProfile.StripePaymentSourceMeta
});

const mD = { updatePayments, clearPayments, setPayment, removePayment, updateView, changePayment };

export default connect(
  mS,
  mD
)(EditCardScreen);
