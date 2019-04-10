import React, { Component } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import I18n from "../../../../I18n/I18n";
// Styles
import styles from "./Styles/HeaderMinutesLeft";

class HeaderMinutesLeft extends Component {
  goToPayments = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: "PaymentsView" });
  };

  render() {
    const { stripeCustomerID, stripePaymentToken, availableMinutes } = this.props;
    return (
      <View style={availableMinutes ? styles.minutesLeftContainer : styles.outOfMinutesContainer}>
        {stripePaymentToken ? <React.Fragment/> :
          <TouchableOpacity onPress={() => this.goToPayments()} style={styles.addCardContainer}>
            <Text style={styles.addCardText}>
              {I18n.t("pricingScreen.paymentInfo.linkNoCard", { minutes: availableMinutes })}
            </Text>
          </TouchableOpacity>}
        <View style={styles.minutesLeftInfoContainer}>
          <Icon name="clock" type="evilicon" containerStyle={styles.clockIcon} color="#fff"/>
          <Text
            style={styles.minutesLeftInfoText}>{I18n.t("minutesAbbreviation", { minutes: availableMinutes })}</Text>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  availableMinutes: state.userProfile.availableMinutes
});

const mD = {};

export default connect(
  mS,
  mD
)(HeaderMinutesLeft);
