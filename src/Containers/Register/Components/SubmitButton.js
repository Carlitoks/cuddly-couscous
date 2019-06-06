import React, { Component } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { updateView as updateUserProfile, getProfileAsync, } from "../../../Ducks/UserProfileReducer";
import I18n, { translateApiError } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/SubmitButtonStyles";
import { update as updateOnboarding, noOnboarding, clear as clearOnboarding } from "../../../Ducks/OnboardingReducer";
import { registerNewUser, logIn } from "../../../Ducks/AuthReducer2";

class SubmitButton extends Component {
  submitLogin = async () => {
    const {
      navigation,
      updateOnboarding,
      email,
      password,
      noOnboarding,
    } = this.props;
    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      await logIn(email, password);
      updateOnboarding({ makingRequest: false });
      noOnboarding();
      navigation.dispatch({ type: "Home" });
    } catch (err) {
      Alert.alert(
        I18n.t("error"),
        translateApiError(err, "api.errTemporary"),
        [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
      );
      console.log(err);
    } finally {
      updateOnboarding({ makingRequest: false });
    }
  };

  submitRegister = async () => {
    const {
      updateUserProfile,
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
    } = this.props;

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
      updateOnboarding({ errorType: null, makingRequest: true });
      await registerNewUser({
        firstName,
        email,
        password,
        nativeLangCode,
      });
      await updateUserProfile({
        isNewUser: true,
      });
      clearOnboarding();
      return navigation.dispatch({ type: "Home" });
    } catch (err) {
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
});

const mD = {
  registerNewUser,
  logIn,
  updateOnboarding,
  updateUserProfile,
  getProfileAsync,
  noOnboarding,
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(SubmitButton);
