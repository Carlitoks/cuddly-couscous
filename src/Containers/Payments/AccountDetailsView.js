import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
// Styles
import styles from "./Styles/AccountDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n, { translateApiError } from "../../I18n/I18n";
import { removeUserPaymentDetails } from "../../Ducks/AccountReducer";

const creditCardImage = require("../../Assets/Images/creditCardLeft.png");
const packageImage = require("../../Assets/Images/packageImage.png");

class AccountDetailsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, stripePaymentToken } = this.props;
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
          <View style={styles.balanceHeader}>  
          <View style={styles.balanceMinutesContainer}>  
          <Text style={styles.balanceTitle}>{I18n.t("packages.success.balance")}</Text>
          <Text style={styles.balanceMinutes}>{I18n.t("pricingScreen.balance.min")}</Text>
          <Text style={styles.balanceDescription}>{I18n.t("account.descriptions.noCardNoPackage")}</Text>      
          </View>
          </View>

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
          <View style={styles.creditCardContainer}>  
            <View style={styles.row}>  
            <Text style={styles.creditCardTitle}>{I18n.t("account.card.title")}</Text>
            <View style={styles.buttonContainer}>  
            <TouchableOpacity
              onPress={() => {}}
              style={styles.addCardButton }
            >
              <Text
                style={styles.addCarduttonText}
              >
                {I18n.t("newCustomerHome.addCard")}
              </Text>
            </TouchableOpacity>
            </View>

            </View>
            <View style={styles.rowDescription}>  
              <Image style={styles.backgroundImage} source={creditCardImage} />
              <Text
                style={styles.description}
              >
                {I18n.t("account.card.description", { rate: "US$1" })}
              </Text>
            </View>
          </View>

          <View style={styles.packageContainer}>  
            <View style={styles.row}>  
            <Text style={styles.creditCardTitle}>{I18n.t("account.package.title")}</Text>
            <View style={styles.buttonContainer}>  
            <TouchableOpacity
              onPress={() => {}}
              style={styles.addCardButton }
            >
              <Text
                style={styles.addCarduttonText}
              >
                {I18n.t("account.package.add")}
              </Text>
            </TouchableOpacity>
            </View>

            </View>
            <View style={styles.rowDescription}>  
              <Image style={styles.backgroundImage} source={packageImage} />
              <Text
                style={styles.description}
              >
                {I18n.t("account.package.description")}
              </Text>
            </View>
          </View>


          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  stripePaymentToken: state.account.user.stripePaymentToken
});

const mD = { removeUserPaymentDetails };

export default connect(
  mS,
  mD
)(AccountDetailsView);
