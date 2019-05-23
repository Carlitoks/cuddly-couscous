import React, { Component } from "react";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/PasswordFieldStyles";
import I18n from "../../../I18n/I18n";
import { EMAIL_REGEX } from "../../../Util/Constants";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";
import RegisterIcons from "./RegisterIcon";
class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTooltipIcon: RegisterIcons.info
    };
  }
  validatePassword = text => {
    const { updateOnboarding } = this.props;
    if (text.length < 7) {
      updateOnboarding({
        isValidPassword: false,
        errorType: "passwordLength"
      });
    } else {
      updateOnboarding({ isValidPassword: true, errorType: null });
    }
    updateOnboarding({ password: text });
  };
  onTooltipPress = () => {
    this.setState({
      currentTooltipIcon:
        this.state.currentTooltipIcon === RegisterIcons.info_pressed
          ? RegisterIcons.info
          : RegisterIcons.info_pressed
    });
  };
  render() {
    const { password, errorType, onChange, type, setRef } = this.props;

    return (
      <View style={password ? styles.inputViewContainerValue : styles.inputViewContainer}>
        {password ? (
          <Text style={styles.labelText}>{I18n.t("customerOnboarding.register.password")}</Text>
        ) : (
          <Text style={styles.labelText} />
        )}
        <View style={styles.inputsErrorContainer}>
          <TextInput
            ref={input => {
              setRef(input);
            }}
            allowFontScaling={false}
            style={errorType === "passwordLength" ? styles.inputTextInvalid : styles.inputTextValid}
            onChangeText={text => (onChange ? onChange(text) : this.validatePassword(text))}
            autoCapitalize="none"
            value={password}
            placeholder={
              type === "login"
                ? I18n.t("fields.password.label")
                : I18n.t("fields.password.labelCreate")
            }
            secureTextEntry
            placeholderTextColor="rgba(0, 0, 0, 0.54)"
            returnKeyType="done"
          />
          {type === "login" ? null : (
            <TouchableOpacity style={styles.CVVIconContainer} onPress={this.onTooltipPress}>
              <Image
                resizeMode="contain"
                style={styles.CVVIcon}
                source={this.state.currentTooltipIcon}
              />
            </TouchableOpacity>
          )}
          {type !== "login" && this.state.currentTooltipIcon === RegisterIcons.info_pressed ? (
            <View style={styles.tooltipContainerStyle}>
              <View style={styles.triangle} />
              <Text style={styles.tooltipTextStyle}>{I18n.t("fields.password.tooltip")}</Text>
            </View>
          ) : null}
        </View>
        {errorType === "passwordLength" ? (
          <Text style={styles.invalidLabelText}>{I18n.t("fields.password.errLength")}</Text>
        ) : (
          <Text style={styles.invalidLabelText} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  errorType: state.onboardingReducer.errorType,
  password: state.onboardingReducer.password,
  isValidPassword: state.onboardingReducer.isValidPassword
});

const mD = {
  updateOnboarding
};

export default connect(
  mS,
  mD
)(PasswordField);
