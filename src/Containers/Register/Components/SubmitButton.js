import React, { Component } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { updateView as updateUserProfile } from "../../../Ducks/UserProfileReducer";
import { logInAsync, registerDevice } from "../../../Ducks/AuthReducer";
import I18n, { translateApiErrorString } from "../../../I18n/I18n";
// Styles
import styles from "./Styles/SubmitButtonStyles";
import { asyncCreateUser, asyncUpdateUser } from "../../../Ducks/CustomerProfileReducer";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";

class SubmitButton extends Component {
  submitLogin = async () => {
    const {
      registerDevice,
      logInAsync,
      navigation,
      checkRecord,
      updateCustomer,
      getProfileAsync,
      getNativeLang,
      updateOnboarding,
      email,
      password,
      noOnboarding,
    } = this.props;
    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      await registerDevice();
      const logInUserResponse = await logInAsync(email, password);
      const getUserProfile = await getProfileAsync(
        logInUserResponse.payload.uuid,
        logInUserResponse.payload.token,
      );
      await updateUserProfile({
        selectedNativeLanguage: getNativeLang(getUserProfile.payload.nativeLangCode),
      });
      const record = await checkRecord(email);
      if (record) {
        updateCustomer({ userInfo: { id: record.id } });
        Alert.alert(I18n.t("finishOnboarding"), I18n.t("finishOnboardingMessage"), [
          {
            text: I18n.t("ok"),
          },
        ]);

        updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: record.lastStage });
      } else {
        updateOnboarding({ makingRequest: false });
        noOnboarding();
        navigation.dispatch({ type: "Home" });
      }
    } catch (err) {
      if (err.data.errors[0] === "Password incorrect") {
        updateOnboarding({
          errorType: "signInError",
        });
      }

      if (err.data.errors[0] === "Email not found") {
        updateOnboarding({
          errorType: "emailNotFound",
        });
      }

      if (err.data.errors[0]) {
        Alert.alert(
          I18n.t("error"),
          translateApiErrorString(err.data.errors[0], "api.errTemporary"),
          [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
        );
      }
    } finally {
      updateOnboarding({ makingRequest: false });
    }
  };

  submitRegister = async () => {
    const {
      asyncCreateUser,
      logInAsync,
      updateUserProfile,
      asyncUpdateUser,
      registerDevice,
      navigation,
      updateOnboarding,
      email,
      password,
      firstName,
      isValidPassword,
      isValidFirstName,
      isValidEmail,
      makingRequest,
      nativeLangCode,
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
      const registerDeviceResponse = await registerDevice();
      if (registerDeviceResponse.type !== "networkErrors/error") {
        const registerUserResponse = await asyncCreateUser(
          {
            email,
            password,
          },
          registerDeviceResponse.payload.deviceToken,
        );
        if (registerUserResponse.payload.errorType !== "AlreadyRegistered") {
          const logInUserResponse = await logInAsync(email, password);
          await asyncUpdateUser(
            {
              id: registerUserResponse.payload.id,
              firstName,
              nativeLangCode,
            },
            logInUserResponse.payload.token,
          );
          await updateUserProfile({
            isNewUser: true,
          });
          updateOnboarding({ makingRequest: false });
          return navigation.dispatch({ type: "Home" });
        }
        updateOnboarding({ makingRequest: false });
      }
    } catch (err) {
      if (err.data.errors[0]) {
        Alert.alert(
          I18n.t("error"),
          translateApiErrorString(err.data.errors[0], "api.errTemporary"),
          [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
        );
      }
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
          {I18n.t("continue")}
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
  updateOnboarding,
  asyncCreateUser,
  registerDevice,
  logInAsync,
  asyncUpdateUser,
  updateUserProfile,
};

export default connect(
  mS,
  mD,
)(SubmitButton);
