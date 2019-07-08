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
    navigation.dispatch({ type: "PaymentsView" });
  };

  goToPackages = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: "AvailablePackagesView" });
  };

  getPackage () {
    const {autoreloadMinutePackage, subscribedMinutePackage} = this.props;
    if (autoreloadMinutePackage) {
      return autoreloadMinutePackage;
    }
    return subscribedMinutePackage || false;
  }

  render() {
    const {
      navigation,
      user,
      hasUnlimitedUse,
    } = this.props;
    console.log("stripe en AccountDetails", user.stripePaymentToken, user.StripePaymentSourceMeta);
    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.dispatch({ type: "back" })}
              >
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("account.title")}
          />
          <BalanceHeader
            havePaymentDetails={user.stripePaymentToken ? true : false}
            hasUnlimitedUse={hasUnlimitedUse}
            minutes={user.availableMinutes}
            minutePackage={this.getPackage()}
          />

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <CreditCardSection
              addCard={() => {
                this.goToPayments();
              }}
              navigation={navigation}
              haveCard={user.StripePaymentSourceMeta && user.StripePaymentSourceMeta.last4 ? true : false}
            />
            <PackageSection
              addPackage={() => {
                this.goToPackages();
              }}
              navigation={navigation}
              userPackage={this.getPackage()}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  autoreloadMinutePackage: state.account.autoreloadMinutePackage,
  subscribedMinutePackage: state.account.subscribedMinutePackage
});

const mD = { removeUserPaymentDetails };

export default connect(
  mS,
  mD
)(AccountDetailsView);
