import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import AddCard from "./Components/AddCard";
import {
  changePayment,
  clearPayments,
  removePayment,
  setPayment,
  updatePayments,
  updateView
} from "../../Ducks/PaymentsReducer";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import Reactotron from "reactotron-react-native";
import PaymentButtons from "./Components/PaymentButtons";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";

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
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            rightComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("cancel")}</Text>
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("payments.editCard")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <AddCard type={"cardEdit"} />
            <PaymentButtons navigation={navigation} safeEditCard={this.safeEditCard} />
          </ScrollView>
        </View>
      </View>
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
