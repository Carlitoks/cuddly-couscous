import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import {
  updateForm as updateCustomer,
  asyncCreateUser
} from "../../Ducks/CustomerProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { updateView } from "../../Ducks/UserProfileReducer";
import { registerDevice, logInAsync } from "../../Ducks/AuthReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, CheckBox } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import _capitalize from "lodash/capitalize";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import InputPassword from "../../Components/InputPassword/InputPassword";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";
import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";
class EmailCustomerView extends Component {
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
        emailErrorMessage: I18n.t("enterEmailField")
      };
      valid = false;
    }

    if (!this.props.password) {
      updates = {
        ...updates,
        passwordErrorMessage: I18n.t("emptyPassword")
      };
      valid = false;
    } else if (this.props.password.length < 8) {
      updates = {
        ...updates,
        passwordErrorMessage: I18n.t("passwordLength")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      displayFormErrors(updates.emailErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  getResponseError = err => err.response.data.errors[0];

  submit() {
    const { registerDevice, navigation } = this.props;

    if (this.validateForm()) {
      const {
        email,
        password,
        deviceToken,
        asyncCreateUser,
        logInAsync,
        checkRecord,
        updateCustomer,
        id,
        updateView
      } = this.props;

      registerDevice()
        .then(response => {
          if (!response || response.type === "networkErrors/error") {
            throw response;
          }

          const { deviceToken } = this.props;

          return asyncCreateUser({ email, password }, deviceToken);
        })
        .then(response => {
          if (response.type !== "networkErrors/error") {
            return logInAsync(email, password);
          } else {
            throw response;
          }
        })
        .then(response => {
          navigation.dispatch({ type: "NameCustomerView" });
        })
        .catch(err => {
          if (!err) {
            if (!this.props.networkModal) {
              displayFormErrors(I18n.t("temporaryError"));
            }
          } else {
            if (this.getResponseError(err) === "user already exists") {
              const record = checkRecord(email);

              if (record) {
                updateCustomer({ userInfo: { id } });
                updateView({ email: email.toLowerCase() });
                navigation.dispatch({ type: record.lastStage });
              } else {
                navigation.dispatch({
                  type: "LoginView"
                });
              }
            }

            const errors = err.payload
              ? err.payload.response.data.errors
              : err.response
                ? err.response.data.errors
                : err;

            displayFormErrors(errors);
          }
        });
    }
  }

  staticLink = ({ title, uri }) => {
    return (
      <Text
        style={[styles.links, styles.textCenter]}
        onPress={() => {
          Keyboard.dismiss();
          this.props.navigation.dispatch({
            type: "StaticView",
            params: {
              uri,
              title
            }
          });
        }}
      >
        {title}
      </Text>
    );
  };

  isDisabled() {
    const patt = new RegExp(EMAIL_REGEX);
    return (
      !patt.test(this.props.email) ||
      this.props.password.length < 8 ||
      !this.props.termsCheck ||
      !this.props.eighteenCheck
    );
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("linguistEmailTitle")}
          navbarType={"Basic"}
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
                <View>
                  {/* Email */}
                  <InputRegular
                    placeholder={I18n.t("linguistEmail")}
                    autoCorrect={false}
                    onChangeText={text =>
                      this.props.updateForm({ email: text })
                    }
                    value={this.props.email}
                    keyboardType={"email-address"}
                    maxLength={64}
                  />
                  <InputPassword
                    inputStyle={styles.formInput}
                    placeholder={I18n.t("linguistPassword")}
                    placeholderTextColor={Colors.placeholderColor}
                    onChangeText={text =>
                      this.props.updateForm({
                        password: text
                      })
                    }
                    autoCorrect={false}
                    maxLength={20}
                    value={this.props.password}
                    sec
                  />
                  {this.props.password != "" &&
                  this.props.password.length < 8 ? (
                    <Text style={styles.passwordValidationText}>
                      {I18n.t("passwordLengthValidation")}
                    </Text>
                  ) : null}
                  <CheckBox
                    title={
                      <View style={styles.marginLeft10}>
                        <Text>
                          {I18n.t("iAgree")}
                          {this.staticLink({
                            title: I18n.t("termsOfUse"),
                            uri: TermsConditionsURI
                          })}

                          {" & "}

                          {this.staticLink({
                            title: I18n.t("privacyPolicy"),
                            uri: PrivacyPolicyURI
                          })}
                        </Text>
                      </View>
                    }
                    checked={this.props.termsCheck}
                    containerStyle={styles.containerTransparent}
                    onPress={() => {
                      this.props.updateForm({
                        termsCheck: !this.props.termsCheck
                      });
                    }}
                  />

                  <CheckBox
                    title={
                      <View style={styles.marginLeft10}>
                        <Text>{I18n.t("iAm18")}</Text>
                      </View>
                    }
                    checked={this.props.eighteenCheck}
                    containerStyle={styles.containerTransparent}
                    onPress={() => {
                      this.props.updateForm({
                        eighteenCheck: !this.props.eighteenCheck
                      });
                    }}
                  />
                </View>
                <View style={styles.mainContainterText}>
                  <Text
                    style={[
                      styles.formText,
                      styles.textCenter,
                      styles.textAbove
                    ]}
                  >
                    {I18n.t("alreadyAccount")}
                  </Text>
                  <Text
                    style={[styles.links]}
                    onPress={() => {
                      Keyboard.dismiss();
                      this.props.navigation.dispatch({ type: "LoginView" });
                    }}
                  >
                    {I18n.t("signIn")}
                  </Text>
                </View>
              </Col>
            </Grid>
          </ScrollView>
          {/* Next Button */}
          <BottomButton
            title={I18n.t("next")}
            onPress={() => this.submit()}
            disabled={this.isDisabled()}
            fill={!this.isDisabled()}
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.registrationCustomer.email,
  termsCheck: state.registrationCustomer.termsCheck,
  eighteenCheck: state.registrationCustomer.eighteenCheck,
  password: state.registrationCustomer.password,
  formHasErrors: state.registrationCustomer.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken,
  id: state.userProfile.id,
  records: state.onboardingRecord.records,
  networkModal: state.networkInfo.networkModal
});

const mD = {
  updateForm,
  clearForm,
  asyncCreateUser,
  registerDevice,
  logInAsync,
  checkRecord,
  updateCustomer,
  updateView
};

export default connect(
  mS,
  mD
)(EmailCustomerView);
