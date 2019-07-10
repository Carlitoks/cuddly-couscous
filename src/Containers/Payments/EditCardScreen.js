import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import AddCard from "./Components/AddCard";
import {
  changePayment,
  clearPayments,
  updatePayments,
} from "../../Ducks/PaymentsReducer";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import Reactotron from "reactotron-react-native";
import PaymentButtons from "./Components/PaymentButtons";
import { Icon } from "react-native-elements";
import { updateUserPaymentDetails, removeUserPaymentDetails } from "../../Ducks/AccountReducer";
import I18n, { translateApiError } from "../../I18n/I18n";
class EditCardScreen extends Component {
  componentWillMount() {
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
  }

  removePaymentCard = () => {
    const { removeUserPaymentDetails, navigation } = this.props;
    Alert.alert(
      I18n.t("payments.removeCard"),
      I18n.t("payments.removeCardAlert"),
      [
        {
          text: I18n.t("actions.remove"),
          onPress: () => {
            removeUserPaymentDetails()
            .then(() => {
              navigation.dispatch({ type: "AccountDetailsView" });
            })
            .catch(err => {
            Alert.alert(I18n.t("error"), translateApiError(err, "api.errTemporaryTryAgain"),[
              {
                text:I18n.t("ok")
              }
            ])
            });
          }
        },
        {
          text: I18n.t("actions.cancel"),
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  };

  safeEditCard = async () => {
    const {
      cardInfo,
      updatePayments,
      clearPayments,
      navigation,
    } = this.props;

    const params = {
      number: cardInfo.number.replace(/\s/g, ""),
      expMonth: cardInfo.expMonth,
      expYear: cardInfo.expYear,
      cvc: cardInfo.cvc
    };

    updatePayments({ loading: true });
    removePayment();
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(({ tokenId }) => {
        return updateUserPaymentDetails({ stripeSourceToken: tokenId });
      })
      .then(() => {
        clearPayments();
        updatePayments({ errors: [] });
        navigation.dispatch({ type: "Home" });
      })
      .catch((err) => {
        Alert.alert(I18n.t("error"), translateApiError(err));
      })
      .finally(() => updatePayments({ loading: false }));
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
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.removePaymentCard()}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("package.remove")}</Text>
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
  cardInfo: state.payments.cardInfo,
});

const mD = {
  updatePayments,
  clearPayments,
  updateUserPaymentDetails,
  removeUserPaymentDetails,
};

export default connect(
  mS,
  mD
)(EditCardScreen);
