import React, { Component } from "react";
import {
  ScrollView,
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import LinguistHeader from "../CustomerHome/Components/Header";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Metrics, Fonts } from "../../Themes";
import { connect } from "react-redux";
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults
} from "../../Ducks/NewSessionReducer";

import {
  getProfileAsync,
  updateView as updateUserProfile,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import {
  logInAsync,
  haveSession,
  registerDevice
} from "../../Ducks/AuthReducer";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
import I18n from "./../../I18n/I18n";

// Styles
import styles from "./Styles/LoginScreenStyles";
import { moderateScale } from "../../Util/Scaling";
import SGWaves from "./../../Assets/SVG/SGWaves";
import { help, EMAIL_REGEX } from "../../Util/Constants";
import metrics from "../../Themes/Metrics";
import { Icon } from "react-native-elements";
import FieldError from "../Register/Components/FieldError";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  isValidEmail = text => {
    let reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      this.props.updateOnboarding({
        isValidEmail: false,
        errorType: "emailFormat"
      });
    } else {
      if (this.props.errorType === "emailFormat") {
        this.props.updateOnboarding({ isValidEmail: true, errorType: null });
      }
      this.props.updateOnboarding({ isValidEmail: true });
    }
    this.props.updateOnboarding({ email: text });
  };

  submit = async () => {
    const {
      registerDevice,
      logInAsync,
      navigation,
      checkRecord,
      updateCustomer,
      getProfileAsync,
      getNativeLang
    } = this.props;
    try {
      this.props.updateOnboarding({ errorType: null, makingRequest: true });
      const registerDeviceResponse = await registerDevice();
      const logInUserResponse = await logInAsync(
        this.props.email,
        this.props.password
      );
      const getUserProfile = await getProfileAsync(
        logInUserResponse.payload.uuid,
        logInUserResponse.payload.token
      );
      const updateUserProfileResponse = await updateUserProfile({
        selectedNativeLanguage: getNativeLang(
          getUserProfile.payload.nativeLangCode
        )
      });
      const record = await checkRecord(this.props.email);
      if (record) {
        updateCustomer({ userInfo: { id: record.id } });
        Alert.alert(
          I18n.t("finishOnboarding"),
          I18n.t("finishOnboardingMessage"),
          [
            {
              text: I18n.t("ok")
            }
          ]
        );

        this.props.updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: record.lastStage });
      } else {
        this.props.updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: "Home" });
      }
    } catch (err) {
      if (err.data.errors[0] === "Password incorrect") {
        this.props.updateOnboarding({
          errorType: "signInError"
        });
      }

      if (err.data.errors[0] === "Email not found") {
        this.props.updateOnboarding({
          errorType: "emailNotFound"
        });
      }
      this.props.updateOnboarding({
        makingRequest: false
      });
    }
  };
  render() {
    const { makingRequest, isValidEmail } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={{ height: "100%" }}
          >
            <LinguistHeader type={"login"} navigation={this.props.navigation} />
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              locations={[0, 1]}
              style={{ height: "100%" }}
            >
              <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                  {this.props.errorType === "signInError" ||
                  this.props.errorType === "emailFormat" ||
                  this.props.errorType === "emailNotFound" ? (
                    <FieldError navigation={this.props.navigation} />
                  ) : (
                    <View />
                  )}

                  <View style={styles.inputViewContainer}>
                    <Text style={styles.labelStyle}>{I18n.t("email")}</Text>
                    <View style={styles.inputInternalContainer}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.inputText}
                        onChangeText={text => this.isValidEmail(text)}
                        onChange={text => this.isValidEmail(text)}
                        autoCapitalize={"none"}
                        onBlur={() => this.isValidEmail(this.props.email)}
                        value={this.props.email}
                        placeholder={I18n.t("email")}
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                        keyboardType={"email-address"}
                      />
                      {this.props.errorType === "signInError" ||
                      this.props.errorType === "emailFormat" ? (
                        <View style={styles.errorIconContainer}>
                          <Icon
                            name={"close"}
                            type={"material-community"}
                            color={"#fff"}
                            size={15}
                          />
                        </View>
                      ) : (
                        <React.Fragment />
                      )}
                    </View>
                  </View>

                  <View style={styles.inputViewContainer}>
                    <Text style={styles.labelStyle}>{I18n.t("password")}</Text>
                    <View style={styles.inputInternalContainer}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.inputText}
                        onChangeText={text =>
                          this.props.updateOnboarding({ password: text })
                        }
                        autoCapitalize={"none"}
                        value={this.props.password}
                        placeholder={I18n.t("password")}
                        secureTextEntry={true}
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                      />
                      {this.props.errorType === "signInError" ? (
                        <View style={styles.errorIconContainer}>
                          <Icon
                            name={"close"}
                            type={"material-community"}
                            color={"#fff"}
                            size={15}
                          />
                        </View>
                      ) : (
                        <React.Fragment />
                      )}
                    </View>

                    <Text
                      onPress={() =>
                        this.props.navigation.dispatch({
                          type: "ForgotPasswordView"
                        })
                      }
                      style={styles.forgotPasswordLabel}
                    >
                      {I18n.t("customerOnboarding.login.forgotPassword")}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonWidthContainer}>
                    <TouchableOpacity
                      onPress={() => this.submit()}
                      disabled={
                        !isValidEmail ||
                        makingRequest ||
                        (!this.props.email || !this.props.password)
                      }
                      style={
                        !isValidEmail ||
                        makingRequest ||
                        (!this.props.email || !this.props.password)
                          ? styles.signInButtonDisable
                          : styles.signInButtonEnabled
                      }
                    >
                      <Text style={styles.buttonEnabledText}>
                        {I18n.t("signIn")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.dispatch({
                          type: "RegisterScreen"
                        })
                      }
                      style={styles.createAccountPadding}
                    >
                      <Text style={styles.transitionButtonText}>
                        {I18n.t("customerOnboarding.register.createAnAccount")}{" "}
                        »
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <SGWaves height={51} width={Metrics.width} />
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  isSlideUpMenuVisible: state.newSessionReducer.isSlideUpMenuVisible,
  session: state.newSessionReducer.session,
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  uuid: state.auth.uuid,
  isNewUser: state.userProfile.isNewUser,
  email: state.onboardingReducer.email,
  password: state.onboardingReducer.password,
  errorType: state.onboardingReducer.errorType,
  makingRequest: state.onboardingReducer.makingRequest,
  isValidEmail: state.onboardingReducer.isValidEmail
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  clearActiveSession,
  getProfileAsync,
  updateUserProfile,
  logInAsync,
  haveSession,
  registerDevice,
  getNativeLang,
  checkRecord,
  updateOnboarding
};

export default connect(
  mS,
  mD
)(LoginScreen);
