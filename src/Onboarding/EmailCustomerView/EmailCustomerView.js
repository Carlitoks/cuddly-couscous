import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";
import { registerDevice } from "../../Ducks/AuthReducer";

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
import { Button, FormInput, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import _capitalize from "lodash/capitalize";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
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
      registerDevice()
        .then(response => {
          if (response.type === "networkErrors/error") {
            throw response;
          }

          const { email, deviceToken, asyncCreateUser } = this.props;
          return asyncCreateUser({ email }, deviceToken);
        })
        .then(response => {
          if (response.type !== "networkErrors/error") {
            navigation.dispatch({
              type: "PasswordCustomerView"
            });
          } else {
            throw response;
          }
        })
        .catch(err => {
          if (this.getResponseError(err) === "user already exists") {
            navigation.dispatch({
              type: "LoginView"
            });
          }

          const errors = err.payload
            ? err.payload.response.data.errors
            : err.response ? err.response.data.errors : err;

          displayFormErrors(errors);
        });
    }
  }

  isDisabled() {
    const patt = new RegExp(EMAIL_REGEX);
    return !patt.test(this.props.email);
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("linguistEmailTitle")}
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
                    containerStyle={styles.containerInput}
                    placeholder={I18n.t("linguistEmail")}
                    autoCorrect={false}
                    onChangeText={text =>
                      this.props.updateForm({ email: text })
                    }
                    value={this.props.email}
                    keyboardType={"email-address"}
                    maxLength={64}
                    autoFocus={true}
                  />
                  <Text style={styles.formText}>
                    {I18n.t("checkYourEmailOnBoarding")}
                  </Text>
                  <View style={styles.mainContainterText}>
                    <Text style={styles.textCenter}>
                      {I18n.t("emailCustomerText")}
                    </Text>
                    <Text
                      style={[styles.links, styles.textCenter]}
                      onPress={() => {
                        Keyboard.dismiss();
                        this.props.navigation.dispatch({
                          type: "StaticView",
                          params: {
                            uri: TermsConditionsURI,
                            title: I18n.t("termsOfUse")
                          }
                        });
                      }}
                    >
                      {I18n.t("termsOfUse")}
                    </Text>
                  </View>
                  <View style={styles.mainContainterText}>
                    <Text style={styles.textCenter}> {I18n.t("and")} </Text>
                    <Text
                      style={[styles.links, styles.textCenter]}
                      onPress={() => {
                        Keyboard.dismiss();
                        this.props.navigation.dispatch({
                          type: "StaticView",
                          params: {
                            uri: PrivacyPolicyURI,
                            title: I18n.t("privacyPolicy")
                          }
                        });
                      }}
                    >
                      {I18n.t("privacyPolicy")}
                    </Text>
                    <Text style={styles.textCenter}>
                      {", "}
                      {I18n.t("confirmEighteen1")}
                    </Text>
                    <Text style={styles.textCenter}>
                      {I18n.t("confirmEighteen2")}
                    </Text>
                  </View>
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
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          disabled={this.isDisabled()}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.registrationCustomer.email,
  formHasErrors: state.registrationCustomer.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken
});

const mD = {
  updateForm,
  clearForm,
  asyncCreateUser,
  registerDevice
};

export default connect(mS, mD)(EmailCustomerView);
