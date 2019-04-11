import React, { Component } from "react";
import { ScrollView, View, Alert, Image, Text } from "react-native";
import { connect } from "react-redux";
import Header from "../CustomerHome/Components/Header";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import RemoveCardButton from "./Components/RemoveCardButton";
import AddCardButton from "./Components/AddCardButton";
import CardItem from "./Components/CardItem";
import NoCardImage from "./Components/NoCardImage";
// Styles
import styles from "./Styles/PaymentScreenStyles";
import metrics from "../../Themes/Metrics";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { getProfileAsync } from "../../Ducks/UserProfileReducer";
class PaymentDetailScreen extends Component {
  componentWillMount() {
    const { uuid, token, getProfileAsync } = this.props;
    stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });
    if (uuid !== "" && token !== "") {
      getProfileAsync(uuid, token);
    }
  }

  render() {
    const { navigation, stripePaymentToken } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <Header navigation={navigation} />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            {stripePaymentToken ? <CardItem navigation={navigation} /> : <NoCardImage />}

            {stripePaymentToken ? <RemoveCardButton /> : <AddCardButton navigation={navigation} />}
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
)(PaymentDetailScreen);
