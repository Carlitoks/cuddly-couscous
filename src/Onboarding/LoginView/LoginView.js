import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, Platform, ScrollView, View, Text } from "react-native";
import { Button, FormLabel, Header } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import { clearForm, updateForm } from "../../Ducks/LoginReducer";
import { logInAsync, haveSession } from "../../Ducks/AuthReducer";
import InputPassword from "../../Components/InputPassword/InputPassword";
import InputRegular from "../../Components/InputRegular/InputRegular";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";

import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Colors } from "../../Themes";

// For the moment
import I18n from "../../I18n/I18n";

class LoginView extends Component {
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
        emailErrorMessage: I18n.t("noValidEmail")
      };
      valid = false;
    }

    if (!this.props.email) {
      updates = {
        ...updates,
        emailErrorMessage: I18n.t("emptyEmail")
      };
      valid = false;
    }

    if (!this.props.password) {
      updates = {
        ...updates,
        passwordErrorMessage: I18n.t("emptyPassword")
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
          this.props.navigation.dispatch({ type: "Home" }); 
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
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col>
                  {/* Header - Navigation */}
                  <TopViewIOS/>                  
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />

                  {/* Title */}
                  <Text style={styles.title}>{I18n.t("signIn")}</Text>
                </Col>
              </Row>

              {/* Email */}
              <InputRegular
              containerStyle={styles.formInputContainer}
              placeholder={I18n.t("email")}
              autoCorrect={false}
              onChangeText={text =>
                this.props.updateForm({ email: text, emailErrorMessage: "" })}
              value={this.props.email}
              keyboardType={"email-address"}
              autoFocus={true}
              />

              {/* Password */}
              <InputPassword
                inputStyle={styles.formInput}
                placeholder={I18n.t("password")}
                placeholderTextColor={Colors.placeholderColor}
                onChangeText={text =>
                  this.props.updateForm({
                    password: text,
                    passwordErrorMessage: ""
                  })}
                
                value={this.props.password}
              />

              {/* Forgot Password */}
              <Text
                style={styles.forgotPasswordText}
                onPress={() =>
                  navigation.dispatch({ type: "ForgotPasswordView" })}
              >
                {I18n.t("forgotPassword")}
              </Text>
            </Col>
          </Grid>
        </ScrollView>
        {/* Sign In Button */}
        <BottomButton
          title={I18n.t("signIn")}
          onPress={() => this.submit()}
          bold={true}
          loading={this.props.performingRequest}
          disabled={this.props.performingRequest}
          disabledColor={Colors.primaryColorDisabled}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.login.email,
  emailErrorMessage: state.login.emailErrorMessage,
  password: state.login.password,
  passwordErrorMessage: state.login.passwordErrorMessage,
  formHasErrors: state.login.formHasErrors,
  performingRequest: state.login.performingRequest,
  networkError: state.networkErrors.errors
});

const mD = {
  clearForm,
  updateForm,
  logInAsync,
  haveSession
};

export default connect(mS, mD)(LoginView);
