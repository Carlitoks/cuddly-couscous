import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Platform, ScrollView, Text, View } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { clearForm, updateForm } from "../../Ducks/LoginReducer";
import { logInAsync, haveSession } from "../../Ducks/AuthReducer";

import InputPassword from "../../Components/InputPassword/InputPassword";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";

// For the moment
import EN from "../../I18n/en";

class LoginView extends Component {
  componentWillMount() {
    //
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    const patt = new RegExp(EMAIL_REGEX);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.email)) {
      updates = {
        ...updates,
        emailErrorMessage: "Not A Valid Email"
      };
      valid = false;
    }

    if (!this.props.email) {
      updates = {
        ...updates,
        emailErrorMessage: "Empty Email"
      };
      valid = false;
    }

    if (!this.props.password) {
      updates = {
        ...updates,
        passwordErrorMessage: "Empty Password"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.emailErrorMessage,
        updates.passwordErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    this.props.updateForm({ performingRequest: true });

    if (this.validateForm()) {
      this.props.logInAsync(this.props.email, this.props.password).then(() => {
        if (!this.props.formHasErrors) {
          console.log("Navegando a Home");
          // navigation.dispatch({ type: "Home" });
        } else {
          if (this.props.formHasErrors) {
            this.tempDisplayErrors(
              this.props.emailErrorMessage,
              this.props.passwordErrorMessage
            );
          }
        }
      });
    }

    this.props.updateForm({ performingRequest: false });
  }

  // Will be changed according the designs
  tempDisplayErrors(...errors) {
    const errorStr = errors.reduce((last, current) => {
      curr = "";
      if (current) {
        curr = `- ${current}\n`;
      }
      return last.concat(curr);
    }, "");

    Alert.alert("Errors", errorStr, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <Grid>
          <Col>
            {/* Go Back Component */}
            <GoBackButton navigation={this.props.navigation} />

            {/* Title */}
            <Text style={styles.title}>{EN["signIn"]}</Text>

            {/* Email */}
            <FormInput
              style={styles.FormInput}
              placeholder={EN["email"]}
              autoCorrect={false}
              onChangeText={text =>
                this.props.updateForm({ email: text, emailErrorMessage: "" })
              }
              value={this.props.email}
              keyboardType={"email-address"}
            />

            {/* Password */}
            <InputPassword
              style={styles.InputPassword}
              placeholder={EN["password"]}
              onChangeText={text =>
                this.props.updateForm({
                  password: text,
                  passwordErrorMessage: ""
                })
              }
              value={this.props.password}
            />

            {/* Sign In Button */}
            <Button
              buttonStyle={styles.Button}
              onPress={() => this.submit()}
              title={EN["signIn"]}
              loading={this.props.performingRequest}
              disabled={this.props.performingRequest}
              disabledStyle={styles.ButtonDisabled}
            />

            {/* Forgot Password */}
            <Text
              style={styles.forgotPasswordText}
              onPress={() =>
                navigation.dispatch({ type: "ForgotPasswordView" })
              }
            >
              {EN["forgotPassword"]}
            </Text>
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  email: state.login.email,
  emailErrorMessage: state.login.emailErrorMessage,
  password: state.login.password,
  passwordErrorMessage: state.login.passwordErrorMessage,
  formHasErrors: state.login.formHasErrors,
  performingRequest: state.login.performingRequest
});

const mD = {
  clearForm,
  updateForm,
  logInAsync,
  haveSession
};

export default connect(mS, mD)(LoginView);
