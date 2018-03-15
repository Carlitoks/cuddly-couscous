import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncSetPassword } from "../../Ducks/CustomerProfileReducer";
import { logInAsync } from "../../Ducks/AuthReducer";

import { View, Text, ScrollView, Alert, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import _capitalize from "lodash/capitalize";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import InputPassword from "../../Components/InputPassword/InputPassword";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class PasswordCustomerView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    let updates = {};
    let valid = true;

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
      displayFormErrors(updates.passwordErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const {
      navigation,
      id,
      password,
      asyncSetPassword,
      deviceToken,
      logInAsync,
      email
    } = this.props;

    if (this.validateForm()) {
      asyncSetPassword(id, password, deviceToken)
        .then(response => {
          return logInAsync(email, password);
        })
        .then(() => {
          navigation.dispatch({ type: "NameCustomerView" });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          } else {
            console.log(error);
          }
          dispatch(networkError(error));
        });
    }
  }

  isDisabled() {
    return this.props.password.length < 8;
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("linguistPasswordTitle")}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                {/* Password */}
                <InputPassword
                  containerStyle={styles.containerInput}
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
                  autoFocus={true}
                  value={this.props.password}
                />
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
          disabled={this.isDisabled()}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  password: state.registrationCustomer.password,
  email: state.registrationCustomer.email,
  formHasErrors: state.registrationCustomer.formHasErrors,
  id: state.customerProfile.userInfo.id,
  deviceToken: state.registrationCustomer.deviceToken,
  formHasErrors: state.login.formHasErrors
});

const mD = {
  updateForm,
  clearForm,
  asyncSetPassword,
  logInAsync
};

export default connect(mS, mD)(PasswordCustomerView);
