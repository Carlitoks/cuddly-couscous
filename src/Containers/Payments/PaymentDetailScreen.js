import React, { Component } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import RemoveCardButton from "./Components/RemoveCardButton";
import AddCardButton from "./Components/AddCardButton";
import CardItem from "./Components/CardItem";
import NoCardImage from "./Components/NoCardImage";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n, { translateApiError } from "../../I18n/I18n";
import { removeUserPaymentDetails } from "../../Ducks/AccountReducer";

class PaymentDetailScreen extends Component {
  constructor(props) {
    super(props);
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
  }

  removeCard = () => {
    const { removeUserPaymentDetails, navigation } = this.props;
    removeUserPaymentDetails().catch(err => {
      Alert.alert(I18n.t("error"), translateApiError(err, "api.errTemporaryTryAgain"), [
        {
          text: I18n.t("ok")
        }
      ]);
    });
  };

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
            navbarTitle={I18n.t("paymentDetails")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            {stripePaymentToken ? <CardItem navigation={navigation} /> : <NoCardImage />}

            {stripePaymentToken ? <RemoveCardButton removeCard={this.removeCard} /> : <AddCardButton navigation={navigation} />}
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
)(PaymentDetailScreen);
