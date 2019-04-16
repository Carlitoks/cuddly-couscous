import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm } from "../../Ducks/RegistrationCustomerReducer";
import { record } from "../../Ducks/OnboardingRecordReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";

import { View, Text, ScrollView, Alert, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Alerts";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";
import {
  onlyLetters,
  is500Response,
  displayTemporaryErrorAlert
} from "../../Util/Helpers";

import { ONLY_LETTER_REGEX } from "../../Util/Constants";
class NameCustomerView extends Component {
  navigate = this.props.navigation.navigate;

  componentWillMount() {
    const { id, token, email, record } = this.props;

    record({
      lastStage: "NameCustomerView",
      token,
      email: email.toLowerCase(),
      id
    });
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.firstname) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!onlyLetters(this.props.firstname)) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (!onlyLetters(this.props.lastname)) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (!this.props.lastname) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      displayFormErrors(
        updates.FirstnameErrorMessage,
        updates.LastnameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const {
      id,
      asyncUpdateUser,
      firstname,
      lastname,
      preferredName,
      token,
      checkRecord,
      email
    } = this.props;

    if (this.validateForm()) {
      const record = checkRecord(email);
      const storedToken = record ? record.token : token;
      const storedId = record ? record.id : id;

      const payload = {
        id: storedId === undefined ? id : storedId,
        firstname,
        lastname,
        preferredName
      };
      asyncUpdateUser(payload, storedToken === undefined ? token : storedToken)
        .then(response => {
          this.props.navigation.dispatch({ type: "NativeLanguageView" });
          Keyboard.dismiss();
        })
        .catch(error => {
          error.response
            ? is500Response(error)
              ? displayTemporaryErrorAlert()
              : null
            : displayFormErrors(error.response.data);
        });
    }
  }

  getSubtitle = () => {
    let subtitle = `${I18n.t("youWillBeKnown")}.... ${I18n.t(
      "toOthersOnPlatform"
    )} `;
    if (this.props.firstname && this.props.lastname) {
      subtitle = `${I18n.t("youWillBeKnown")} ${
        this.props.firstname
      } ${this.props.lastname.charAt(0)}. ${I18n.t("toOthersOnPlatform")}`;
      return subtitle;
    } else {
      return subtitle;
    }
  };

  isDisabled() {
    return !this.props.firstname || !this.props.lastname;
  }

  setErrorMessage() {
    const patt = new RegExp(ONLY_LETTER_REGEX);

    if (!patt.test(this.props.firstname) && this.props.firstname != "") {
      return (
        <Text style={styles.validationText}>
          {I18n.t("firstnameFormatValidation")}
        </Text>
      );
    }

    if (!patt.test(this.props.lastname) && this.props.lastname != "") {
      return (
        <Text style={styles.validationText}>
          {I18n.t("lastnameFormatValidation")}
        </Text>
      );
    }
  }

  render() {
    const initialLastName = `${this.props.lastname.charAt(0)}.`;
    const { preferredName, mainTitle, lastname } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          // headerLeftComponent={
          //   <GoBackButton navigation={this.props.navigation} />
          // }
          navbarTitle={
            preferredName
              ? `${preferredName}`
              : mainTitle || lastname
                ? `${mainTitle} ${lastname}`
                : I18n.t("letsGoToKwon")
          }
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
                  {/* Name */}
                  <InputRegular
                    containerStyle={styles.containerInput}
                    placeholder={I18n.t("linguistName")}
                    onChangeText={text => {
                      if (onlyLetters(text) || text == "") {
                        this.props.updateForm({
                          firstname: text,
                          mainTitle: text
                        });
                      }
                    }}
                    maxLength={20}
                    value={this.props.firstname}
                    autoFocus={true}
                  />
                </View>

                {/* Last Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistLastName")}
                  onChangeText={text => {
                    if (onlyLetters(text) || text == "") {
                      this.props.updateForm({
                        lastname: text
                      });
                    }
                  }}
                  maxLength={20}
                  value={this.props.lastname}
                  sec
                />

                {/* Prefered Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("preferredName")}
                  value={this.props.preferredName}
                  onChangeText={text => {
                    if (onlyLetters(text) || text == "") {
                      this.props.updateForm({
                        preferredName: text
                      });
                    }
                  }}
                  maxLength={20}
                  sec
                />
                {this.setErrorMessage()}
              </Col>
            </Grid>
          </ScrollView>
          {/* Next Button */}
          <BottomButton
            title={I18n.t("next")}
            onPress={() => this.submit()}
            bold={false}
            disabled={this.isDisabled()}
            fill={!this.isDisabled()}
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  id: state.customerProfile.userInfo.id,
  firstname: state.registrationCustomer.firstname,
  email: state.registrationCustomer.email,
  lastname: state.registrationCustomer.lastname,
  formHasErrors: state.registrationCustomer.formHasErrors,
  preferredName: state.registrationCustomer.preferredName,
  mainTitle: state.registrationCustomer.mainTitle,
  token: state.auth.token
});

const mD = {
  updateForm,
  asyncUpdateUser,
  record,
  checkRecord
};

export default connect(
  mS,
  mD
)(NameCustomerView);
