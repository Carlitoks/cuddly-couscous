import React, { Component } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  ScrollView,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Colors, Metrics } from "../../Themes";
import {
  ensureSessionDefaults,
  modifyAVModePreference,
  updateLocation
} from "../../Ducks/NewSessionReducer";

import {
  getNativeLang,
  getProfileAsync,
  updateView as updateUserProfile
} from "../../Ducks/UserProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { haveSession, logInAsync, registerDevice } from "../../Ducks/AuthReducer";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import I18n from "../../I18n/I18n";
import Permission from "react-native-permissions";
// Styles
import styles from "./Styles/RegisterScreenStyles";
import { EMAIL_REGEX, INVALID_NAME_REGEX } from "../../Util/Constants";
import { asyncCreateUser, asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import FieldError from "./Components/FieldError";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import { PrivacyPolicyURI, TermsConditionsURI } from "../../Config/StaticViewsURIS";
import Header from "../CustomerHome/Components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { moderateScale, moderateScaleViewports } from "../../Util/Scaling";
import analytics from "@segment/analytics-react-native";
import RenderPicker from "../CustomerHome/Components/Partials/PickerSelect";
import { openSlideMenu } from "../../Ducks/LogicReducer";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";

const JeenieLogo = require("../../Assets/Images/jeenieLogo.png");
const BG = require("../../Assets/Images/BG.png");

class RegisterScreen extends Component {
  componentWillMount = async () => {
    const LocationPermission = await Permission.check("location");
    //console.log(LocationPermission);
  };

  componentDidMount() {
    analytics.track("Product Added");
  }

  isValidEmail = text => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      updateOnboarding({
        isValidEmail: false,
        errorType: "emailFormat"
      });
    } else {
      if (errorType === "emailFormat") {
        updateOnboarding({ isValidEmail: true, errorType: null });
      }
      updateOnboarding({ isValidEmail: true });
    }
    updateOnboarding({ email: text });
  };

  validateFirstName = text => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(INVALID_NAME_REGEX);
    if (reg.test(text) || text.trim() == "") {
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
    updateOnboarding({ firstName: text.trim() });
  };

  validatePassword = text => {
    const { updateOnboarding } = this.props;
    if (text.length < 5) {
      updateOnboarding({
        isValidPassword: false,
        errorType: "passwordLength"
      });
    } else {
      updateOnboarding({ isValidPassword: true, errorType: null });
    }
    updateOnboarding({ password: text });
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  submit = async () => {
    const {
      asyncCreateUser,
      logInAsync,
      updateUserProfile,
      asyncUpdateUser,
      registerDevice,
      navigation,
      updateOnboarding,
      email,
      password,
      firstName,
      isValidPassword,
      isValidFirstName,
      isValidEmail,
      makingRequest
    } = this.props;

    if (
      !isValidPassword ||
      !isValidFirstName ||
      !isValidEmail ||
      makingRequest ||
      (!email || !password)
    ) {
      return null;
    }

    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      const registerDeviceResponse = await registerDevice();
      if (registerDeviceResponse.type !== "networkErrors/error") {
        const registerUserResponse = await asyncCreateUser(
          {
            email,
            password
          },
          registerDeviceResponse.payload.deviceToken
        );
        if (registerUserResponse.payload.errorType !== "AlreadyRegistered") {
          const logInUserResponse = await logInAsync(email, password);
          await asyncUpdateUser(
            {
              id: registerUserResponse.payload.id,
              firstName
            },
            logInUserResponse.payload.token
          );
          await updateUserProfile({
            isNewUser: true
          });
          this.props.updateOnboarding({ makingRequest: false });
          return navigation.dispatch({ type: "Home" });
        }
        this.props.updateOnboarding({ makingRequest: false });
      }
    } catch (err) {
      console.log(err);
      if (err.data.errors[0] != "cannot access another use") {
        Alert.alert(
          I18n.t("error"),
          translateApiErrorString(err.data.errors[0], "api.errTemporary"),
          [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }]
        );
        navigation.dispatch({ type: "OnboardingView" });
      }
      this.props.updateOnboarding({ makingRequest: false });
    }
  };

  renderPrivacyPolicyText = () => {
    const privacyPolicyAndTermsText = I18n.t("newCustomerOnboarding.register.termsAndPrivacyNotice");
    const privacyPolicyText = I18n.t("newCustomerOnboarding.register.privacyPolicy");
    const TermsText = I18n.t("newCustomerOnboarding.register.terms");
    const continueText = privacyPolicyAndTermsText.split(TermsText)[0];
    const AndText = privacyPolicyAndTermsText.split(TermsText)[1].split(privacyPolicyText)[0];
    return (
      <View style={styles.termsAndConditionsViewContainer}>
        <Text style={styles.termsAndConditionsText}>{continueText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={() => {
            /* Linking.openURL(TermsConditionsURI).catch(err =>
              console.error("An error occurred", err)
            ); */
            Linking.canOpenURL(TermsConditionsURI)
              .then(supported => {
                if (!supported) {
                  console.log(`Can't handle url: ${TermsConditionsURI}`);
                } else {
                  return Linking.openURL(TermsConditionsURI);
                }
                return null;
              })
              .catch(err => console.error("An error occurred", err));
          }}
        >
          <Text style={styles.termsAndConditionsTextLink}>{`${TermsText}`}</Text>
        </TouchableOpacity>

        <Text style={styles.termsAndConditionsText}>{AndText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={
            () => {
              Linking.canOpenURL(PrivacyPolicyURI)
                .then(supported => {
                  if (!supported) {
                    console.log(`Can't handle url: ${PrivacyPolicyURI}`);
                  } else {
                    return Linking.openURL(PrivacyPolicyURI);
                  }
                  return null;
                })
                .catch(err => console.error("An error occurred", err));
            }
            /* Linking.openURL(PrivacyPolicyURI).catch(err =>
              console.error("An error occurred", err)
            ) */
          }
        >
          <Text style={styles.termsAndConditionsTextLink}>{` ${privacyPolicyText}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      makingRequest,
      isValidEmail,
      isValidFirstName,
      isValidPassword,
      navigation,
      errorType,
      firstName,
      email,
      password
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainRegisterContainer]}>
              <Header navigation={navigation} />
              <ScrollView contentContainerStyle={styles.registerContainer}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                  <View style={styles.topLogoContainer}>
                    <ImageBackground resizeMode={"stretch"} source={BG} style={styles.backgroundContainer}>
                      <Image source={JeenieLogo} />
                      <Text style={styles.titleText}>
                        {I18n.t("newCustomerOnboarding.register.title")}
                      </Text>
                    </ImageBackground>
                    <View style={styles.inputContainer}>
                      <View style={firstName ? styles.inputViewContainerValue : styles.inputViewContainer}>
                        {firstName ? (
                          <Text style={[styles.labelText, styles.firstInput]}>{I18n.t("firstname")}</Text>
                        ) : (
                          <Text style={[styles.labelText, styles.firstInput]} />
                        )}
                        <View style={styles.inputsErrorContainer}>
                          <TextInput
                            allowFontScaling={false}
                            style={errorType === "firstNameFormat" ? styles.inputTextInvalid : styles.inputTextValid}
                            onChangeText={text => this.validateFirstName(text)}
                            onSubmitEditing={() => {
                              this.secondTextInput.focus();
                            }}
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

                      <View style={email ? styles.inputViewContainerValue : styles.inputViewContainer}>
                        {email ? <Text style={styles.labelText}>{I18n.t("email")}</Text> : <Text style={styles.labelText} />}
                        <View style={styles.inputsErrorContainer}>
                          <TextInput
                            ref={input => {
                              this.secondTextInput = input;
                            }}
                            allowFontScaling={false}
                            autoCapitalize="none"
                            style={errorType === "emailFormat" ? styles.inputTextInvalid : styles.inputTextValid}
                            onChangeText={text => this.isValidEmail(text)}
                            onBlur={() => this.isValidEmail(email)}
                            onSubmitEditing={() => {
                              this.ThirdTextInput.focus();
                            }}
                            blurOnSubmit={false}
                            value={email}
                            placeholder={I18n.t("email")}
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            keyboardType="email-address"
                            returnKeyType="done"
                          />
                        </View>
                        {errorType === "emailFormat" || errorType === "AlreadyRegistered" ? (
                          <Text style={styles.invalidLabelText}>{I18n.t("noValidEmail")}</Text>
                        ) : (
                          <Text style={styles.invalidLabelText} />
                        )}
                      </View>

                      <View style={password ? styles.inputViewContainerValue : styles.inputViewContainer}>
                        {password ? (
                          <Text style={styles.labelText}>
                            {I18n.t("customerOnboarding.register.password")}
                          </Text>
                        ) : (
                          <Text style={styles.labelText} />
                        )}
                        <View style={styles.inputsErrorContainer}>
                          <TextInput
                            ref={input => {
                              this.ThirdTextInput = input;
                            }}
                            allowFontScaling={false}
                            style={errorType === "passwordLength" ? styles.inputTextInvalid : styles.inputTextValid}
                            onChangeText={text => this.validatePassword(text)}
                            autoCapitalize="none"
                            value={password}
                            placeholder={I18n.t("customerOnboarding.register.password")}
                            secureTextEntry
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            returnKeyType="done"
                          />
                        </View>
                        {errorType === "passwordLength" ? (
                          <Text style={styles.invalidLabelText}>{I18n.t("fields.password.errLength")}</Text>
                        ) : (
                          <Text style={styles.invalidLabelText} />
                        )}
                      </View>

                      <View style={styles.inputViewContainer}>
                        <View style={styles.inputsErrorContainer}>
                          <RenderPicker
                            openSlideMenu={this.openSlideMenu}
                            title={I18n.t("nativeLanguageTitle")}
                            placeholder={I18n.t("nativeLanguageTitle")}
                            type="nativeLang"
                            contentContainerStyle={styles.renderPickerContainer}
                            labelStyle={styles.renderPickerLabelPlaceHolder}
                            showDivider={false}
                            selectedLabelStyle={styles.renderPickerLabelTop}
                            icon={(
                              <Icon
                                color="rgba(0, 0, 0, 0.18)"
                                name="chevron-right"
                                type="evilicon"
                                size={moderateScaleViewports(16)}
                              />
                            )}
                            selectorContainer={styles.renderPickerSelectorContainer}
                          />
                        </View>
                      </View>
                      {this.renderPrivacyPolicyText()}

                      <TouchableOpacity
                        onPress={() => this.submit()}
                        disabled={
                          !isValidPassword ||
                          !isValidFirstName ||
                          !isValidEmail ||
                          makingRequest ||
                          (!email || !password)
                        }
                        style={
                          !isValidPassword ||
                          !isValidFirstName ||
                          !isValidEmail ||
                          makingRequest ||
                          (!email || !password)
                            ? styles.createAccountButtonDisable
                            : styles.createAccountButton
                        }
                      >
                        <Text
                          style={[
                            styles.buttonEnabledText,
                          ]}
                        >
                          {I18n.t("continue")}
                        </Text>
                      </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.dispatch({
                          type: "LoginView"
                        })
                      }
                    >
                      <Text style={styles.transitionButtonText}>
                        {`${I18n.t("alreadyAccount")} ${I18n.t("signIn")} »`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
              </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <SlideUpPanel />
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
  getProfileAsync,
  updateUserProfile,
  logInAsync,
  haveSession,
  registerDevice,
  getNativeLang,
  checkRecord,
  asyncCreateUser,
  asyncUpdateUser,
  updateOnboarding,
  modifyAVModePreference
};

export default connect(
  mS,
  mD
)(RegisterScreen);
