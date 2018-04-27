import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Platform,
  ScrollView,
  View,
  Text,
  Keyboard
} from "react-native";
import { Button, FormLabel, Header } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import { clearForm, updateForm } from "../../Ducks/LoginReducer";
import {
  logInAsync,
  haveSession,
  registerDevice
} from "../../Ducks/AuthReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { updateForm as updateCustomer } from "../../Ducks/CustomerProfileReducer";

import InputPassword from "../../Components/InputPassword/InputPassword";
import InputRegular from "../../Components/InputRegular/InputRegular";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
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
      displayFormErrors(
        updates.emailErrorMessage,
        updates.passwordErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const {
      updateForm,
      registerDevice,
      logInAsync,
      email,
      password,
      formHasErrors,
      navigation,
      emailErrorMessage,
      passwordErrorMessage,

      checkRecord,
      updateCustomer
    } = this.props;

    updateForm({ performingRequest: true });

    if (this.validateForm()) {
      registerDevice().then(() => {
        logInAsync(email, password)
          .then(() => {
            if (!formHasErrors) {
              const record = checkRecord(email);

              Keyboard.dismiss();

              if (record) {
                updateCustomer({ userInfo: { id: record.id } });

                Alert.alert(
                  I18n.t("finishOnboarding"),
                  I18n.t("finishOnboardingMessage"),
                  [
                    {
                      text: I18n.t("ok")
                    }
                  ]
                );
                navigation.dispatch({ type: record.lastStage });
              } else {
                navigation.dispatch({ type: "Home" });
              }
            } else {
              if (formHasErrors) {
                displayFormErrors(emailErrorMessage, passwordErrorMessage);
              }
              updateForm({ performingRequest: false });
            }
          })
          .catch(error => {
            console.log(error);
            console.log(error.data);
            error.data
              ? displayFormErrors(error.data.errors)
              : displayFormErrors(error);
          });
      });
    } else {
      updateForm({ performingRequest: false });
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <Text style={styles.titleCall}>{I18n.t("signIn")}</Text>
          }
          NoWaves
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                {/* Email */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("email")}
                  autoCorrect={false}
                  onChangeText={text =>
                    this.props.updateForm({
                      email: text,
                      emailErrorMessage: ""
                    })
                  }
                  value={this.props.email}
                  keyboardType={"email-address"}
                  autoFocus={true}
                />

                {/* Password */}
                <InputPassword
                  containerStyle={styles.containerInput}
                  inputStyle={styles.formInput}
                  placeholder={I18n.t("password")}
                  placeholderTextColor={Colors.placeholderColor}
                  onChangeText={text =>
                    this.props.updateForm({
                      password: text,
                      passwordErrorMessage: ""
                    })
                  }
                  value={this.props.password}
                  sec
                />

                {/* Forgot Password */}
                <Text
                  style={styles.forgotPasswordText}
                  onPress={
                    !this.props.performingRequest
                      ? () =>
                          navigation.dispatch({ type: "ForgotPasswordView" })
                      : null
                  }
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
            disabled={!this.props.email || !this.props.password}
            fill={this.props.email && this.props.password}
          />
        </HeaderView>
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
  haveSession,
  registerDevice,
  checkRecord,
  updateCustomer
};

export default connect(mS, mD)(LoginView);
