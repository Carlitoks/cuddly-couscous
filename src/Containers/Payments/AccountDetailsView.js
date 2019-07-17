import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import CreditCardSection from "./Components/CreditCardSection";
import PackageSection from "./Components/PackageSection";
import BalanceHeader from "./Components/BalanceHeader";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";
// Styles
import styles from "./Styles/AccountDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n, { translateApiError } from "../../I18n/I18n";
import { removeUserPaymentDetails } from "../../Ducks/AccountReducer";

import Close from "../../Components/Close/Close";

class AccountDetailsView extends Component {
  constructor(props) {
    super(props);
  }

  goToPayments = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: "EditCardScreen" });
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
      hasUnlimitedUseUntil,
    } = this.props;
    console.log("stripe en AccountDetails", user.stripePaymentToken, user.StripePaymentSourceMeta);
    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.dispatch({ type: "Home" })}
              >
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            rightComponent={
              <Close
                action={() => {
                  this.props.navigation.dispatch({ type: "Home" });
                }}
              />
            }              
            navbarTitle={I18n.t("account.title")}
          />
          <BalanceHeader
            havePaymentDetails={user.stripePaymentToken ? true : false}
            hasUnlimitedUse={hasUnlimitedUse}
            hasUnlimitedUseUntil={hasUnlimitedUseUntil}
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
          {this.getPackage() && 
            <TextBlockButton
                text = "account.package.more" // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {{}} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {styles.buttonViewPackagesContainer} // main container style, component should provide some defaults, like width at 100%
                textStyle = {styles.buttonText} // optional text styles, component should provide defaults
                onPress = {() => navigation.dispatch({ type: "AvailablePackagesView" })} // function to call when pressed
            />}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  hasUnlimitedUseUntil: state.account.hasUnlimitedUseUntil,
  autoreloadMinutePackage: state.account.autoreloadMinutePackage,
  subscribedMinutePackage: state.account.subscribedMinutePackage
});

const mD = { removeUserPaymentDetails };

export default connect(
  mS,
  mD
)(AccountDetailsView);
