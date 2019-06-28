import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
// Styles
import styles from "./Styles/PackageDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";

class PaymentPackageDetails extends Component {
  componentWillMount() {
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
  }

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
            navbarTitle={I18n.t("packages.checkout.title")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <View style={styles.billView}>
            <View style={styles.row}>
                <Text style={styles.itemText}>
                {"XXXX"}
              </Text>
              <Text style={styles.itemText}>
                {"yyyy"}
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

const mD = { };

export default connect(
  mS,
  mD
)(PaymentPackageDetails);
