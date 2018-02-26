import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView
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
      this.tempDisplayErrors(updates.emailErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const { registerDevice, navigation } = this.props;

    if (this.validateForm()) {
      navigation.dispatch({
        type: "PasswordCustomerView"
      });
    }
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

    Alert.alert(I18n.t("error"), errorStr, [
      { text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }
    ]);
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("linguistEmailTitle")}
          subtitle={I18n.t("linguistEmailSubtitle")}
        >
          <ScrollView
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
                    {I18n.t("emailCustomerText")}
                    <Text
                      style={styles.links}
                      onPress={() => {
                        this.props.navigation.dispatch({
                          type: "StaticView",
                          params: {
                            uri: PrivacyPolicyURI,
                            title: I18n.t("privacyPolicy")
                          }
                        });
                      }}
                    >
                      {I18n.t("termsOfUse")}
                    </Text>{" "}
                    {I18n.t("confirmEighteen")}
                  </Text>
                  <Text style={[styles.formText]}>
                    {I18n.t("alreadyAccount")}
                    <Text
                      style={[styles.links]}
                      onPress={() =>
                        this.props.navigation.dispatch({ type: "LoginView" })
                      }
                    >
                      {" "}
                      {I18n.t("signIn")}
                    </Text>
                  </Text>
                </View>
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton title={I18n.t("next")} onPress={() => this.submit()} />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.registrationCustomer.email,
  formHasErrors: state.registrationCustomer.formHasErrors
});

const mD = {
  updateForm,
  clearForm,
  asyncCreateUser
};

export default connect(mS, mD)(EmailCustomerView);
