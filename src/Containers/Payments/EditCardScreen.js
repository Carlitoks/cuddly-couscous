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
              navigation.dispatch({ type: "back" });
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

  getTitle () {
    if (!!this.props.user.stripePaymentToken) {
      return I18n.t('payments.editCard');
    }
    return I18n.t('payments.addCard');
  }

  updateCard = async () => {
    const {
      cardInfo,
      updatePayments,
      clearPayments,
      navigation,
      updateUserPaymentDetails,
    } = this.props;

    const params = {
      number: cardInfo.number.replace(/\s/g, ""),
      expMonth: cardInfo.expMonth,
      expYear: cardInfo.expYear,
      cvc: cardInfo.cvc
    };

    updatePayments({ loading: true });
    const stripeResponse = await stripe
      .createTokenWithCard(params)
      .then(({ tokenId }) => {
        return updateUserPaymentDetails({ stripeSourceToken: tokenId });
      })
      .then(() => {
        clearPayments();
        updatePayments({ errors: [] });
        navigation.dispatch({ type: "back" });
      })
      .catch((err) => {
        Alert.alert(I18n.t("error"), translateApiError(err));
      })
      .finally(() => updatePayments({ loading: false }));
  };

  render() {
    const { navigation, user,loading } = this.props;

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
            rightComponent={!!user.stripePaymentToken && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.removePaymentCard()}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("account.package.remove")}</Text>
                </View>
              </TouchableOpacity>
            )}
            navbarTitle={this.getTitle()}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <AddCard type={"cardEdit"} />
            <PaymentButtons navigation={navigation} loading={loading} onPress={() => {
              updatePayments({ loading: true });
              this.updateCard()
              }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  cardInfo: state.payments.cardInfo,
  user: state.account.user,
  loading: state.payments.loading,

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
