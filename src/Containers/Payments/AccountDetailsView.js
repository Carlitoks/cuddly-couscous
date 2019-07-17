import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";
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
import { removeAutoreloadMinutePackage, removeUserPaymentDetails } from "../../Ducks/AccountReducer";

import Close from "../../Components/Close/Close";

class AccountDetailsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
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
  remove(){
    Alert.alert(
      I18n.t("removePayment"),
      I18n.t("logOutConfirmation"),
      [
        {
          text: I18n.t("actions.confirm"),
          onPress: () => {
            this.setState({loading: true});
            this.props.removeAutoreloadMinutePackage()
            .then(() => {
              this.setState({loading: false});
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
  }

  render() {
    const {
      navigation,
      user,
      hasUnlimitedUse,
    } = this.props;
    console.log("autoreloadMinutePackage en AccountDetails", this.props.autoreloadMinutePackage);
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
            {this.state.loading ? 
              <ActivityIndicator size="large" color="purple" style={{ zIndex: 100000, top: 150 }} />  
            :
              <PackageSection
                addPackage={() => {
                  this.goToPackages();
                }}
                navigation={navigation}
                userPackage={this.getPackage()}
                remove={() => this.remove()}
              />
            }
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
  autoreloadMinutePackage: state.account.autoreloadMinutePackage,
  subscribedMinutePackage: state.account.subscribedMinutePackage
});

const mD = { 
  removeUserPaymentDetails,
  removeAutoreloadMinutePackage,
 };

export default connect(
  mS,
  mD
)(AccountDetailsView);
