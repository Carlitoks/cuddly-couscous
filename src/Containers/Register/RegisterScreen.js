import React, { Component } from "react";
import {
  ScrollView,
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Linking
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
import styles from "./Styles/RegisterScreenStyles";
import { moderateScale } from "../../Util/Scaling";
import SGWaves from "./../../Assets/SVG/SGWaves";
import { help, EMAIL_REGEX, ONLY_LETTER_REGEX } from "../../Util/Constants";
import {
  asyncCreateUser,
  asyncUpdateUser
} from "./../../Ducks/CustomerProfileReducer";
import FieldError from "./Components/FieldError";
import { Icon } from "react-native-elements";
import metrics from "../../Themes/Metrics";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import fonts from "../../Themes/Fonts";
import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";
class RegisterScreen extends Component {
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

  validateFirstName = text => {
    let reg = new RegExp(ONLY_LETTER_REGEX);
    if (!reg.test(text)) {
      this.props.updateOnboarding({
        isValidFirstName: false,
        errorType: "firstNameFormat"
      });
    } else {
      if (this.props.errorType === "firstNameFormat") {
        this.props.updateOnboarding({
          isValidFirstName: true,
          errorType: null
        });
      }
      this.props.updateOnboarding({ isValidFirstName: true });
    }
    this.props.updateOnboarding({ firstName: text });
  };

  validatePassword = text => {
    if (text.length < 5) {
      this.props.updateOnboarding({
        isValidPassword: false,
        errorType: "passwordLength"
      });
    } else {
      this.props.updateOnboarding({ isValidPassword: true, errorType: null });
    }
    this.props.updateOnboarding({ password: text });
  };

  submit = async () => {
    const { registerDevice, navigation } = this.props;
    const {
      email,
      password,
      deviceToken,
      asyncCreateUser,
      logInAsync,
      checkRecord,
      updateCustomer,
      id,
      updateView,
      updateUserProfile,
      asyncUpdateUser
    } = this.props;

    try {
      this.props.updateOnboarding({ errorType: null, makingRequest: true });
      const registerDeviceResponse = await registerDevice();
      if (registerDeviceResponse.type !== "networkErrors/error") {
        const registerUserResponse = await asyncCreateUser(
          {
            email: this.props.email,
            password: this.props.password
          },
          registerDeviceResponse.payload.deviceToken
        );
        const logInUserResponse = await logInAsync(
          this.props.email,
          this.props.password
        );
        const updateUserResponse = await asyncUpdateUser(
          {
            id: registerUserResponse.payload.id,
            firstName: this.props.firstName
          },
          logInUserResponse.payload.token
        );
        const updateUserProfileResponse = await updateUserProfile({
          isNewUser: true
        });
        navigation.dispatch({ type: "Home" });
      }
    } catch (err) {
      this.props.updateOnboarding({ makingRequest: false });
    }
  };

  renderPrivacyPolicyText = () => {
    const privacyPolicyAndTermsText = I18n.t(
      "customerOnboarding.login.termsAndPrivacyNotice"
    );
    const privacyPolicyText = I18n.t("customerOnboarding.login.privacyPolicy");
    const TermsText = I18n.t("customerOnboarding.login.terms");
    const continueText = privacyPolicyAndTermsText.split(TermsText)[0];
    const AndText = privacyPolicyAndTermsText
      .split(TermsText)[1]
      .split(privacyPolicyText)[0];
    return (
      <View style={styles.termsAndConditionsViewContainer}>
        <Text style={styles.termsAndConditionsText}>{continueText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={() => {
            /* Linking.openURL(TermsConditionsURI).catch(err =>
              console.error("An error occurred", err)
            );*/
            Linking.canOpenURL(TermsConditionsURI)
              .then(supported => {
                if (!supported) {
                  console.log("Can't handle url: " + TermsConditionsURI);
                } else {
                  return Linking.openURL(TermsConditionsURI);
                }
              })
              .catch(err => console.error("An error occurred", err));
          }}
        >
          <Text
            style={{
              ...styles.termsAndConditionsText,
              fontFamily: fonts.BoldFont,
              textDecorationLine: "underline",
              lineHeight: 20
            }}
          >
            {` ${TermsText}`}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsAndConditionsText}>{AndText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={
            () => {
              Linking.canOpenURL(PrivacyPolicyURI)
                .then(supported => {
                  if (!supported) {
                    console.log("Can't handle url: " + PrivacyPolicyURI);
                  } else {
                    return Linking.openURL(PrivacyPolicyURI);
                  }
                })
                .catch(err => console.error("An error occurred", err));
            }
            /* Linking.openURL(PrivacyPolicyURI).catch(err =>
              console.error("An error occurred", err)
            )*/
          }
        >
          <Text
            style={{
              ...styles.termsAndConditionsText,
              fontFamily: fonts.BoldFont,
              textDecorationLine: "underline",
              lineHeight: 20
            }}
          >
            {` ${privacyPolicyText}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {
      makingRequest,
      isValidEmail,
      isValidFirstName,
      isValidPassword
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainContainer]}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              locations={[0, 1]}
              style={{ height: "100%" }}
            >
              <LinguistHeader
                type={"login"}
                navigation={this.props.navigation}
              />
              <LinearGradient
                colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
                locations={[0, 1]}
                style={{ height: "100%" }}
              >
                <View style={styles.loginContainer}>
                  <View style={styles.inputContainer}>
                    {this.props.errorType ? (
                      <FieldError navigation={this.props.navigation} />
                    ) : (
                      <Text style={styles.registerAdviseText}>
                        {I18n.t("customerOnboarding.login.provideInformation")}
                      </Text>
                    )}

                    <View style={styles.inputViewContainer}>
                      {this.props.firstName ? (
                        <Text style={styles.labelText}>
                          {I18n.t("firstname")}
                        </Text>
                      ) : (
                        <Text> </Text>
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.validateFirstName(text)}
                          value={this.props.firstName}
                          placeholder={I18n.t("firstname")}
                          placeholderTextColor={"rgba(255,255,255,0.7)"}
                        />
                        {this.props.errorType === "firstNameFormat" ? (
                          <View style={styles.errorIconContainer}>
                            <Icon
                              name={"close"}
                              type={"material-community"}
                              color={"white"}
                              size={15}
                            />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>
                    </View>

                    <View style={styles.inputViewContainer}>
                      {this.props.email ? (
                        <Text style={styles.labelText}>{I18n.t("email")}</Text>
                      ) : (
                        <Text> </Text>
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          autoCapitalize={"none"}
                          style={styles.inputText}
                          onChangeText={text => this.isValidEmail(text)}
                          onBlur={() => this.isValidEmail(this.props.email)}
                          value={this.props.email}
                          placeholder={I18n.t("email")}
                          placeholderTextColor={"rgba(255,255,255,0.7)"}
                          keyboardType={"email-address"}
                        />
                        {this.props.errorType === "emailFormat" ||
                        this.props.errorType === "AlreadyRegistered" ? (
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
                      {this.props.password ? (
                        <Text style={styles.labelText}>
                          {I18n.t("customerOnboarding.register.password")}
                        </Text>
                      ) : (
                        <Text> </Text>
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.validatePassword(text)}
                          autoCapitalize={"none"}
                          value={this.props.password}
                          placeholder={I18n.t(
                            "customerOnboarding.register.password"
                          )}
                          secureTextEntry={true}
                          placeholderTextColor={"rgba(255,255,255,0.7)"}
                        />
                        {this.props.errorType === "passwordLength" ? (
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

                    {this.renderPrivacyPolicyText()}
                  </View>
                  <View style={styles.buttonContainer}>
                    <View style={styles.buttonWidthContainer}>
                      <TouchableOpacity
                        onPress={() => this.submit()}
                        disabled={
                          !isValidPassword ||
                          !isValidFirstName ||
                          !isValidEmail ||
                          makingRequest ||
                          (!this.props.email || !this.props.password)
                        }
                        style={
                          !isValidPassword ||
                          !isValidFirstName ||
                          !isValidEmail ||
                          makingRequest ||
                          (!this.props.email || !this.props.password)
                            ? styles.signInButtonDisable
                            : styles.registerButton
                        }
                      >
                        <Text style={styles.buttonEnabledText}>
                          {I18n.t(
                            "customerOnboarding.register.createAnAccount"
                          )}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.createAccountPadding}
                        onPress={() =>
                          this.props.navigation.dispatch({
                            type: "LoginScreen"
                          })
                        }
                      >
                        <Text style={styles.transitionButtonText}>
                          {`${I18n.t("alreadyAccount")} ${I18n.t("signIn")} »`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <SGWaves height={51} width={Metrics.width} />
                  </View>
                </View>
              </LinearGradient>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
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
  deviceToken: state.registrationCustomer.deviceToken,
  errorType: state.onboardingReducer.errorType,
  makingRequest: state.onboardingReducer.makingRequest,
  isValidEmail: state.onboardingReducer.isValidEmail,
  email: state.onboardingReducer.email,
  password: state.onboardingReducer.password,
  firstName: state.onboardingReducer.firstName,
  isValidFirstName: state.onboardingReducer.isValidFirstName,
  isValidPassword: state.onboardingReducer.isValidPassword
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
  asyncCreateUser,
  asyncUpdateUser,
  updateOnboarding
};

export default connect(
  mS,
  mD
)(RegisterScreen);
