import React, { Component } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { connect } from "react-redux";
import { resetPasswordAsync } from "../../Ducks/AuthReducer";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
// Styles
import styles from "./Styles/ForgotPasswordScreenStyles";
import { EMAIL_REGEX } from "../../Util/Constants";
import Header from "../CustomerHome/Components/Header";
import { Auth } from "../../Api";
import { clearForm, updateForm } from "../../Ducks/ForgotPasswordReducer";

class ForgotPasswordScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      error: null
    }
  }
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
      this.setState({loading: true});
      Auth.resetPassword(this.props.email)
        .then(response => {
          Alert.alert(I18n.t("forgotPassword.alertSuccessTitle"), I18n.t("forgotPassword.alertSuccessBody"), [
            { text: I18n.t("actions.ok"), onPress: () => this.props.navigation.dispatch({ type: "IntroView" }) }
          ]);
        })
        .catch(error => {
          if(error.data){
            this.setState({error: translateApiErrorString(error.data.errors[0], "api.errTemporary")});
          }else{
            this.setState({error: I18n.t("api.errTemporary")});
          }
        }).
        finally(() => {
        this.props.clearForm();
        this.setState({loading: false});
      });
  }

  validateEmail = () => {
    const patt = new RegExp(EMAIL_REGEX);
    return !patt.test(this.props.email);
  };

  renderInputStyle = () => {
    if(this.props.formHasErrors && this.props.email.length>0){
      return [styles.emailInput, styles.emailInputError];
    }
    if(this.state.error !== null){
      return [styles.emailInput, styles.emailInputError];
    }
    return styles.emailInput;
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
                <Text style={styles.titleText}>{I18n.t("forgotPassword.title")}</Text>
                <Text style={styles.subtitleText}>{I18n.t("forgotPassword.description")}</Text>
                <TextInput
                  value={email}
                  keyboardType={"email-address"}
                  onChangeText={async text =>  { await updateForm({email: text}); await this.validateForm(); }}
                  placeholderTextColor={"#B6B5BB"}
                  placeholder={I18n.t("fields.email.label")}
                  style={this.renderInputStyle()}
                />
                {( (formHasErrors && email.length) ? <Text style={styles.invalidLabelText}>{emailErrorMessage}</Text> : <React.Fragment />)}
                {(this.state.error && <Text style={styles.invalidLabelText}>{this.state.error}</Text>)}
                <TouchableOpacity
                  onPress={() => this.submit()}
                  disabled={this.validateEmail() && this.state.loading}
                  style={formHasErrors ? styles.resetButtonDisable : styles.resetButton }
                >
                  <Text style={styles.transitionCreateButtonText}>
                    {I18n.t("actions.send")}
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
