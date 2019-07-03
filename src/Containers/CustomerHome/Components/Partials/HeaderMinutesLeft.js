import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import I18n from "../../../../I18n/I18n";
// Styles
import styles from "./Styles/HeaderMinutesLeft";

class HeaderMinutesLeft extends Component {
  goToPayments = () => {
    const { navigation } = this.props;
    navigation.dispatch({ type: "AvailablePackagesView" });
  };

  renderMinutesLeft = () => {
    const { user, hasUnlimitedUse } = this.props;

    if (hasUnlimitedUse) {
      return null;
    }

    return (
      <View style={styles.minutesLeftContainer}>
        {user.stripePaymentToken ? (
          <React.Fragment />
        ) : (
          <TouchableOpacity onPress={() => this.goToPayments()} style={styles.addCardContainer}>
            <Text style={styles.addCardText}>
              {I18n.t("pricingScreen.paymentInfo.linkNoCard", { minutes: user.availableMinutes })}
            </Text>
          </TouchableOpacity>
        )}
        {(user.stripePaymentToken && user.availableMinutes > 0) || !user.stripePaymentToken ? (
          <View
            style={
              user.availableMinutes === 0
                ? styles.outOfMinutesContainer
                : user.availableMinutes > 0 && user.availableMinutes < 6
                ? styles.fewMinutesLeftContainer
                : styles.minutesLeftInfoContainer
            }
          >
            <Icon name="clock" type="evilicon" containerStyle={styles.clockIcon} color="#fff" />
            <Text style={styles.minutesLeftInfoText}>
              {I18n.t("minutesAbbreviation", { minutes: user.availableMinutes })}
            </Text>
          </View>
        ) : (
          <React.Fragment />
        )}
      </View>
    );
  };

  render() {
    return this.renderMinutesLeft();
  }
}

const mS = state => ({
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  user: state.account.user,
});

const mD = {};

export default connect(
  mS,
  mD
)(HeaderMinutesLeft);
