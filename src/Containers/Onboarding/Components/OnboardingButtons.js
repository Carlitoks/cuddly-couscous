import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

// Styles
import styles from "./Styles/OnboardingButtonsStyles";
import I18n from "../../../I18n/I18n";
import Permission from "react-native-permissions";

class OnboardingButtons extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.callButtonContainer}>
        <View style={styles.callNowButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.dispatch({ type: "RegisterView" }) }
            style={styles.callNowButton}
          >
            <Text style={styles.callNowButtonText}>
            {I18n.t("newCustomerOnboarding.getStarted")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.audioOnlyButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.dispatch({ type: "LoginView" }) }
            style={styles.audioOnlyButton}
          >
            <Text style={styles.audioOnlyButtonText}>
              {`${I18n.t("newCustomerOnboarding.haveAccount")} `}
            </Text>
            <Text style={styles.signInText}>{I18n.t("newCustomerOnboarding.signIn")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD,
)(OnboardingButtons);
