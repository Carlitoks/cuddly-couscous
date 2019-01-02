import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/FieldErrorStyles";

class FieldError extends Component {
  constructor(props) {
    super(props);
  }

  renderEmailFormat = () => (
    <Text style={styles.redErrorAlertText}>
      Please enter a valid email address
    </Text>
  );

  renderAlreadyRegistered = () => (
    <Text style={styles.redErrorAlertText}>
      An account already exists with the email address you entered. {"\n"}
      {"\n"}
      Please enter a different email or{"\n"}
      <Text
        onPress={() => this.props.navigation.dispatch({ type: "LoginScreen" })}
        style={styles.redErrorAlertUnderlineText}
      >
        sign in to your account.
      </Text>
    </Text>
  );

  renderSignInError = () => (
    <Text style={styles.redErrorAlertText}>
      Incorrect email and password combination.{"\n"}
      Please try again.
    </Text>
  );

  renderErrorText = () => {
    if (this.props.errorType === "emailFormat") return this.renderEmailFormat();

    if (this.props.errorType === "AlreadyRegistered")
      return this.renderAlreadyRegistered();

    if (this.props.errorType === "signInError") return this.renderSignInError();
  };

  render() {
    return (
      <View style={styles.redErrorAlertContainer}>
        <Text style={styles.redErrorAlertText}>{this.props.errorType}</Text>
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
