import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import CreditCardSection from "./Components/CreditCardSection";
import PackageSection from "./Components/PackageSection";
import BalanceHeader from "./Components/BalanceHeader";
// Styles
import styles from "./Styles/AccountDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n, { translateApiError } from "../../I18n/I18n";
import { removeUserPaymentDetails } from "../../Ducks/AccountReducer";
class AccountDetailsView extends Component {
  constructor(props) {
    super(props);
  }

  goToPayments = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: "PaymentDetailScreen" });
  };

  render() {
    const { navigation, stripePaymentToken, StripePaymentSourceMeta, user } = this.props;
    console.log("stripe en AccountDetails", stripePaymentToken, StripePaymentSourceMeta);
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
            navbarTitle={I18n.t("account.title")}
          />
          <BalanceHeader havePaymentDetails={stripePaymentToken? true : false } minutes={user.availableMinutes}/>

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
          <CreditCardSection addCard={()=> {this.goToPayments()}} haveCard={StripePaymentSourceMeta && StripePaymentSourceMeta.last4 ? true : false}/> 
          <PackageSection/> 
          

          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  stripePaymentToken: state.account.user.stripePaymentToken,
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta,
  user: state.account.user,

});

const mD = { removeUserPaymentDetails };

export default connect(
  mS,
  mD
)(AccountDetailsView);
