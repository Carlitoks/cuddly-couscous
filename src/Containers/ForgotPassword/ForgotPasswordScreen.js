import React, { Component } from "react";
import {
  Alert,
  Image, ImageBackground,
  Keyboard, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ensureSessionDefaults,
  updateLocation,
} from "../../Ducks/NewSessionReducer";

import {
  getNativeLang,
  getProfileAsync,
  updateView as updateUserProfile,
} from "../../Ducks/UserProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { haveSession, logInAsync, registerDevice, resetPasswordAsync } from "../../Ducks/AuthReducer";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
// Styles
import styles from "./Styles/ForgotPasswordScreenStyles";
import { EMAIL_REGEX } from "../../Util/Constants";
import { noOnboarding, update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import Header from "../CustomerHome/Components/Header";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import { moderateScaleViewports } from "../../Util/Scaling";
import { displayFormErrors } from "../../Util/Alerts";
import { Auth } from "../../Api";
import { clearForm, updateForm } from "../../Ducks/ForgotPasswordReducer";
import InputRegular from "../../Components/InputRegular/InputRegular";

class ForgotPasswordScreen extends Component {
  componentWillMount() {
    this.validateForm();
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
        emailErrorMessage: I18n.t("enterEmailField")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      //displayFormErrors(updates.emailErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      Auth.resetPassword(this.props.email)
        .then(response => {
          //console.log("Response ", response); // TODO HANDLE ERRORS
        })
        .catch(error => {
          //console.log("Error ", error); // TODO HANDLE ERRORS
        });

      this.props.navigation.dispatch({ type: "CheckYourEmailView" });
      this.props.clearForm();
    }
  }

  validateEmail = () => {
    const patt = new RegExp(EMAIL_REGEX);
    return !patt.test(this.props.email);
  };
  render() {
    const {
      updateForm,
      navigation,
      email,
      formHasErrors,
      emailErrorMessage
    } = this.props;
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainForgotPasswordContainer]}>
            <Header navigation={navigation} />
            <ScrollView contentContainerStyle={styles.forgotPasswordContainer}>
              <View style={styles.topLogoContainer}>
                <Text style={styles.titleText}>Forgot Your Password?</Text>
                <Text style={styles.subtitleText}>No worries. We’ll send you a link to reset your password at the email address below.</Text>
                <TextInput
                  value={email}
                  keyboardType={"email-address"}
                  onChangeText={async text =>  { await updateForm({email: text}); await this.validateForm(); }}
                  placeholderTextColor={"#B6B5BB"}
                  placeholder={I18n.t("email")}
                  style={styles.emailInput}
                />
                {( (formHasErrors && email.length) ? <Text style={styles.invalidLabelText}>{emailErrorMessage}</Text> : <React.Fragment />)}
                <TouchableOpacity
                  onPress={() => this.submit()}
                  disabled={this.validateEmail()}
                  style={formHasErrors ? styles.resetButtonDisable : styles.resetButton }
                >
                  <Text style={styles.transitionCreateButtonText}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const mS = state => ({
  email: state.forgotPassword.email,
  formHasErrors: state.forgotPassword.formHasErrors,
  emailErrorMessage: state.forgotPassword.emailErrorMessage,
});

const mD = {
  clearForm,
  updateForm,
  resetPasswordAsync
};

export default connect(
  mS,
  mD,
)(ForgotPasswordScreen);
