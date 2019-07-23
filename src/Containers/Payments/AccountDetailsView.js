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
      hasUnlimitedUseUntil,
      rate
    } = this.props;
    console.log("autoreloadMinutePackage en AccountDetails", this.props.autoreloadMinutePackage);
    return (
      <View style={styles.wrapperContainer}>
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
              rate={rate}
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
          </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  hasUnlimitedUseUntil: state.account.hasUnlimitedUseUntil,
  autoreloadMinutePackage: state.account.autoreloadMinutePackage,
  subscribedMinutePackage: state.account.subscribedMinutePackage,
  rate: state.appConfigReducer.payAsYouGoRate,
});

const mD = { 
  removeUserPaymentDetails,
  removeAutoreloadMinutePackage,
 };

export default connect(
  mS,
  mD
)(AccountDetailsView);
