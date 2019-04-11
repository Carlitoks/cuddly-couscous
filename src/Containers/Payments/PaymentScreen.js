import React, { Component } from "react";
import { ScrollView, View, Alert, Image, Text } from "react-native";
import { connect } from "react-redux";
import Header from "../CustomerHome/Components/Header";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import PaymentButtons from "./Components/PaymentButtons";
import NoCardImage from "./Components/NoCardImage";
import AddCard from "./Components/AddCard";
import { getProfileAsync } from "../../Ducks/UserProfileReducer";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import metrics from "../../Themes/Metrics";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";

class PaymentScreen extends Component {
  componentWillMount() {
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <Header navigation={navigation} />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <AddCard type={"cardAdd"} />
            <PaymentButtons navigation={navigation} />
          </ScrollView>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  token: state.auth.token,
  uuid: state.auth.uuid,
  stripePaymentToken: state.userProfile.stripePaymentToken
});

const mD = { getProfileAsync };

export default connect(
  mS,
  mD
)(PaymentScreen);
