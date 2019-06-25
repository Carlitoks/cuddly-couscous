import React, { Component } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
// Styles
import styles from "./Styles/ForgotPasswordScreenStyles";
import { EMAIL_REGEX } from "../../Util/Constants";
import NavBar from "../../Components/NavBar/NavBar";
import api from "../../Config/AxiosConfig";
import { moderateScaleViewports } from "../../Util/Scaling";

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      email: "",
      emailErrorMessage: "",
      formHasErrors: false,
    };
  }

  componentDidMount() {
    this.validateForm();
  }

  reset () {
    this.setState({email: "", emailErrorMessage: "", formHasErrors: false});
  }

  validateForm() {
    const patt = new RegExp(EMAIL_REGEX);
    let updates = {};
    let valid = true;

    if (!patt.test(this.state.email)) {
      updates = {
        ...updates,
        emailErrorMessage: I18n.t("noValidEmail"),
      };
      valid = false;
    }

    if (!this.state.email) {
      updates = {
        ...updates,
        emailErrorMessage: I18n.t("enterEmailField"),
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid,
    };

    this.setState(updates);
    return valid;
  }

  submit() {
    this.setState({ loading: true });
    api.get(`/auth/password-reset/${this.state.email}`)
      .then((response) => {
        Alert.alert(I18n.t("forgotPassword.alertSuccessTitle"), I18n.t("forgotPassword.alertSuccessBody"), [
          { text: I18n.t("actions.ok"), onPress: () => this.props.navigation.dispatch({ type: "IntroView" }) },
        ]);
      })
      .catch((error) => {
        error = error.response;
        if (error.data) {
          Alert.alert(I18n.t("error"), translateApiErrorString(error.data.errors[0], "api.errTemporary"));
        } else {
          Alert.alert(I18n.t("error"), I18n.t("api.errTemporary"));
        }
      })
      .finally(() => {
        this.reset();
        this.setState({ loading: false });
      });
  }

  validateEmail = () => {
    const patt = new RegExp(EMAIL_REGEX);
    return !patt.test(this.state.email);
  };

  renderInputStyle = () => {
    if (this.state.formHasErrors && this.state.email.length > 0) {
      return [styles.emailInput, styles.emailInputError];
    }
    if (this.state.error !== null) {
      return [styles.emailInput, styles.emailInputError];
    }
    return styles.emailInput;
  };

  render() {
    const {
      navigation,
    } = this.props;
    const {
      email,
      formHasErrors,
      emailErrorMessage,
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={moderateScaleViewports(60)} enabled>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainForgotPasswordContainer]}>
            <NavBar
              leftComponent={(
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({ type: "back" })}>
                  <View>
                    <Icon name="chevron-left" type="evilicon" color="#3F1674" size={50} />
                  </View>
                </TouchableOpacity>
              )}
              statusBarBackground="#DBDBDB"
            />
            <View style={styles.forgotPasswordContainer}>
              <View style={styles.topLogoContainer}>
                <Text style={styles.titleText}>{I18n.t("forgotPassword.title")}</Text>
                <Text style={styles.subtitleText}>{I18n.t("forgotPassword.description")}</Text>
                <TextInput
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(text) => { this.setState({ email: text }, () => { this.validateForm(); }) }}
                  placeholderTextColor="#B6B5BB"
                  placeholder={I18n.t("fields.email.label")}
                  style={this.renderInputStyle()}
                />
                {((formHasErrors && email.length) ? <Text style={styles.invalidLabelText}>{emailErrorMessage}</Text> : <React.Fragment />)}
                {(this.state.error && <Text style={styles.invalidLabelText}>{this.state.error}</Text>)}
                <TouchableOpacity
                  onPress={() => this.submit()}
                  disabled={this.validateEmail() || this.state.loading}
                  style={this.validateEmail() || this.state.loading ? styles.resetButtonDisable : styles.resetButton}
                >
                  <Text style={styles.transitionCreateButtonText}>
                    {I18n.t("actions.send")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mS = state => ({
});

const mD = {
};

export default connect(
  mS,
  mD,
)(ForgotPasswordScreen);
