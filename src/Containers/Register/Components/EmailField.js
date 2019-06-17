import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
// Styles
import styles from "./Styles/EmailFieldStyles";
import I18n from "../../../I18n/I18n";
import { EMAIL_REGEX } from "../../../Util/Constants";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";


class EmailField extends Component {
  isValidEmail = (text) => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(EMAIL_REGEX);

    // debounce to not show error message while user is typing
    const debounced = debounce((e) => {
      updateOnboarding(e);
    }, 2000);

    if (text) {
      if (!reg.test(text) && text.length > 4) {
        debounced({
          isValidEmail: false,
          errorType: "emailFormat",
        });
      } else {
        if (errorType === "emailFormat") {
          updateOnboarding({ isValidEmail: true, errorType: null });
        }
        updateOnboarding({ isValidEmail: true });
      }
      updateOnboarding({ email: text });
    }
  };

  render() {
    const { email, errorType, setRef, nextInput, isValidEmail } = this.props;
    return (
      <View style={email ? styles.inputViewContainerValue : styles.inputViewContainer}>
        {email ? <Text style={styles.labelText}>{I18n.t("email")}</Text> : <Text style={styles.labelText} />}
        <View style={styles.inputsErrorContainer}>
          <TextInput
            ref={(input) => {
              setRef(input);
            }}
            allowFontScaling={false}
            autoCapitalize="none"
            style={errorType === "emailFormat" ? styles.inputTextInvalid : styles.inputTextValid}
            onChangeText={text => this.isValidEmail(text)}
            onBlur={() => this.isValidEmail(email)}
            onSubmitEditing={() => nextInput()}
            blurOnSubmit={false}
            value={email}
            placeholder={I18n.t("email")}
            placeholderTextColor="rgba(0, 0, 0, 0.54)"
            keyboardType="email-address"
            returnKeyType="done"
          />
        </View>
        {(!isValidEmail || errorType === "AlreadyRegistered") && (email && email.length > 6) ? (
          <Text style={styles.invalidLabelText}>{I18n.t("noValidEmail")}</Text>
        ) : (
          <Text style={styles.invalidLabelText} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  errorType: state.onboardingReducer.errorType,
  email: state.onboardingReducer.email,
  isValidEmail: state.onboardingReducer.isValidEmail,
});

const mD = {
  updateOnboarding,
};

export default connect(
  mS,
  mD,
)(EmailField);
