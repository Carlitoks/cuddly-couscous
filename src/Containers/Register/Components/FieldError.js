import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/FieldErrorStyles";
import I18n from "./../../../I18n/I18n";

class FieldError extends Component {
  constructor(props) {
    super(props);
  }

  renderEmailFormat = () => (
    <Text style={styles.redErrorAlertText}>
      {I18n.t("emailFormatValidation")}
    </Text>
  );

  renderLettersOnly = () => (
    <Text style={styles.redErrorAlertText}>
      {I18n.t("firstnameFormatValidation")}
    </Text>
  );

  renderMin8Chars = () => (
    <Text style={styles.redErrorAlertText}>{I18n.t("passwordLength")}</Text>
  );

  renderEmailNotFound = () => (
    <Text style={styles.redErrorAlertText}>{I18n.t("api.errNoEmail")}</Text>
  );

  renderAlreadyRegistered = () => (
    <Text
      onPress={() => this.props.navigation.dispatch({ type: "LoginScreen" })}
      style={styles.redErrorAlertText}
    >
      {I18n.t("customerOnboarding.errors.takenEmail")}
    </Text>
  );

  renderSignInError = () => (
    <Text style={styles.redErrorAlertText}>
      {I18n.t("customerOnboarding.errors.emailAndPassword")}
    </Text>
  );

  renderErrorText = () => {
    if (this.props.errorType === "emailFormat") return this.renderEmailFormat();

    if (this.props.errorType === "AlreadyRegistered")
      return this.renderAlreadyRegistered();

    if (this.props.errorType === "signInError") return this.renderSignInError();

    if (this.props.errorType === "firstNameFormat")
      return this.renderLettersOnly();

    if (this.props.errorType === "passwordLength")
      return this.renderMin8Chars();

    if (this.props.errorType === "emailNotFound") return this.renderEmailNotFound();
  };

  render() {
    return (
      <View style={styles.redErrorAlertContainer}>
        <Text style={styles.redErrorAlertText}>{this.renderErrorText()}</Text>
      </View>
    );
  }
}

const mS = state => ({
  errorType: state.onboardingReducer.errorType
});

const mD = {};

export default connect(
  mS,
  mD
)(FieldError);
