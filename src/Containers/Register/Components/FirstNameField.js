import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/FirstNameFieldStyles";
import I18n from "../../../I18n/I18n";
import { INVALID_NAME_REGEX } from "../../../Util/Constants";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";

class FirstNameField extends Component {
  validateFirstName = (text) => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(INVALID_NAME_REGEX);
    if (reg.test(text)) {
      updateOnboarding({
        isValidFirstName: false,
        errorType: "firstNameFormat"
      });
    } else {
      if (errorType === "firstNameFormat") {
        updateOnboarding({
          isValidFirstName: true,
          errorType: null
        });
      }
      updateOnboarding({ isValidFirstName: true });
    }
    updateOnboarding({ firstName: text.split('  ').filter(n => n.trim() != "" ? n.trim() : null).join(' ') });
  };

  render() {
    const { firstName, errorType, setRef, nextInput } = this.props;
    return (
      <View style={firstName ? styles.inputViewContainerValue : styles.inputViewContainer}>
        {firstName ? (
          <Text style={[styles.labelText, styles.firstInput]}>{I18n.t("firstname")}</Text>
        ) : (
          <Text style={[styles.labelText, styles.firstInput]} />
        )}
        <View style={styles.inputsErrorContainer}>
          <TextInput
            ref={(ref) => { setRef(ref); }}
            allowFontScaling={false}
            style={errorType === "firstNameFormat" ? styles.inputTextInvalid : styles.inputTextValid}
            onChangeText={text => this.validateFirstName(text)}
            onSubmitEditing={() => nextInput()}
            blurOnSubmit={false}
            value={firstName}
            placeholder={I18n.t("firstname")}
            placeholderTextColor="rgba(0, 0, 0, 0.54)"
            returnKeyType="done"
          />
        </View>
        {errorType === "firstNameFormat" ? (
          <Text style={styles.invalidLabelText}>{I18n.t("fields.firstName.errInvalid")}</Text>
        ) : (
          <Text style={styles.invalidLabelText} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  errorType: state.onboardingReducer.errorType,
  firstName: state.onboardingReducer.firstName,
  isValidFirstName: state.onboardingReducer.isValidFirstName,
});

const mD = {
  updateOnboarding,
};

export default connect(
  mS,
  mD,
)(FirstNameField);
