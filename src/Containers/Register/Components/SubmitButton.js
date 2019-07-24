import React, { Component } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/SubmitButtonStyles";
import { update as updateOnboarding, noOnboarding, clear as clearOnboarding } from "../../../Ducks/OnboardingReducer";
import { registerNewUser, logIn } from "../../../Ducks/AuthReducer2";
import { displayNoNetworkConnectionAlert } from "../../../Util/Alerts";

class SubmitButton extends Component {
  submitLogin = async () => {
    const {
      navigation,
      updateOnboarding,
      email,
      password,
      noOnboarding,
      logIn,
      hasNetworkConnection,
    } = this.props;

    if (!hasNetworkConnection) {
      displayNoNetworkConnectionAlert();
      return;
    }

    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      await logIn(email, password);
      updateOnboarding({ makingRequest: false });
      noOnboarding();
      navigation.dispatch({ type: "Home" });
    } catch (err) {
      console.log(err);
      Alert.alert(
        I18n.t("error"),
        translateApiError(err, "api.errTemporary"),
        [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
      );
    } finally {
      updateOnboarding({ makingRequest: false });
    }
  };

  submitRegister = async () => {
    const {
      navigation,
      clearOnboarding,
      updateOnboarding,
      email,
      password,
      firstName,
      isValidPassword,
      isValidFirstName,
      isValidEmail,
      makingRequest,
      nativeLangCode,
      registerNewUser,
      hasNetworkConnection,
      installUrlParams,
      openUrlParams,
    } = this.props;

    if (!hasNetworkConnection) {
      displayNoNetworkConnectionAlert();
      return;
    }

    if (
      !isValidPassword
      || !isValidFirstName
      || !isValidEmail
      || makingRequest
      || (!email || !password)
    ) {
      return null;
    }

    try {
      let referralID = null;
      if (installUrlParams && installUrlParams.referralID) {
        referralID = installUrlParams.referralID;
      }
      if (openUrlParams && openUrlParams.referralID) {
        referralID = openUrlParams.referralID;
      }
      updateOnboarding({ errorType: null, makingRequest: true });
      await registerNewUser({
        firstName,
        email,
        password,
        nativeLangCode,
        referralID,
      }).catch((err) => {
        Alert.alert(
          I18n.t("error"),
          translateApiError(err, "api.errTemporary"),
          [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
        );
      });

      clearOnboarding();
      return navigation.dispatch({ type: "Home" });
    } catch (err) {
      console.log(err);
      Alert.alert(
        I18n.t("error"),
        translateApiError(err, "api.errTemporary"),
        [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
      );
    } finally {
      updateOnboarding({ makingRequest: false });
    }
  };

  renderLogin = () => {
    const {
      isValidEmail, makingRequest, email, password,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.submitLogin()}
        disabled={!isValidEmail || makingRequest || (!email || !password)}
        style={
          !isValidEmail || makingRequest || (!email || !password)
            ? styles.createAccountButtonDisable
            : styles.createAccountButton
        }
      >
        <Text
          style={[
            styles.buttonEnabledText,
          ]}
        >
          {I18n.t("signIn")}
        </Text>
      </TouchableOpacity>
    );
  };

  renderRegister = () => {
    const {
      isValidPassword, isValidFirstName, isValidEmail, makingRequest, email, password,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.submitRegister()}
        disabled={
          !isValidPassword
          || !isValidFirstName
          || !isValidEmail
          || makingRequest
          || (!email || !password)
        }
        style={
          !isValidPassword
          || !isValidFirstName
          || !isValidEmail
          || makingRequest
          || (!email || !password)
            ? styles.createAccountButtonDisable
            : styles.createAccountButton
        }
      >
        <Text
          style={[
            styles.buttonEnabledText,
          ]}
        >
          {I18n.t("customerOnboarding.login.createAccountTitle")}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { type } = this.props;
    if (type === "login") {
      return this.renderLogin();
    }
    return this.renderRegister();
  }
}

const mS = state => ({
  nativeLangCode: state.onboardingReducer.nativeLangCode,
  errorType: state.onboardingReducer.errorType,
  makingRequest: state.onboardingReducer.makingRequest,
  email: state.onboardingReducer.email,
  password: state.onboardingReducer.password,
  firstName: state.onboardingReducer.firstName,
  isValidEmail: state.onboardingReducer.isValidEmail,
  isValidFirstName: state.onboardingReducer.isValidFirstName,
  isValidPassword: state.onboardingReducer.isValidPassword,
  hasNetworkConnection: state.appState.hasNetworkConnection,
  installUrlParams: state.appState.installUrlParams,
  openUrlParams: state.appState.openUrlParams,
});

const mD = {
  registerNewUser,
  logIn,
  updateOnboarding,
  noOnboarding,
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(SubmitButton);
