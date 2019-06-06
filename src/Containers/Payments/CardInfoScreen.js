import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import AddCard from "./Components/AddCard";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";

class CardInfoScreen extends Component {
  componentWillMount() {
    stripe.setOptions({
      publishableKey: stripePublishableKey,
      androidPayMode: "test" // Android only
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.dispatch({ type: "back" })}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50}/>
                </View>
              </TouchableOpacity>
            }
            rightComponent={
              <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.dispatch({ type: "EditCardScreen" })}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("actions.edit")}</Text>
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("payments.cardInfo")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <AddCard type={"cardInfo"}/>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  token: state.auth2.userJwtToken,
  uuid: state.auth2.userID,
  stripePaymentToken: state.userProfile.stripePaymentToken
});

const mD = {};

export default connect(
  mS,
  mD
)(CardInfoScreen);
