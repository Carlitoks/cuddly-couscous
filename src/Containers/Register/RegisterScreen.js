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
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Colors } from "../../Themes";
import {
  ensureSessionDefaults,
  modifyAVModePreference,
  openSlideMenu,
  updateLocation,
} from "../../Ducks/NewSessionReducer";

import {
  getNativeLang,
  getProfileAsync,
  updateView as updateUserProfile,
} from "../../Ducks/UserProfileReducer";
import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { haveSession, logInAsync, registerDevice } from "../../Ducks/AuthReducer";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import {
  clear as clearActiveSession,
  update as customerUpdateSettings,
} from "../../Ducks/ActiveSessionReducer";
import { updateSettings } from "../../Ducks/ContactLinguistReducer";
import I18n from "../../I18n/I18n";
import Permission from 'react-native-permissions';
// Styles
import styles from "./Styles/RegisterScreenStyles";
import { EMAIL_REGEX, INVALID_NAME_REGEX } from "../../Util/Constants";
import { asyncCreateUser, asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import FieldError from "./Components/FieldError";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import { PrivacyPolicyURI, TermsConditionsURI } from "../../Config/StaticViewsURIS";
import Header from "../CustomerHome/Components/Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { moderateScale } from "../../Util/Scaling";
import analytics from "@segment/analytics-react-native";

const JeenieLogo = require("../../Assets/Images/Landing-Jeenie-TM.png");

class RegisterScreen extends Component {
  componentWillMount = async () => {
    const LocationPermission = await Permission.check('location');
    console.log(LocationPermission);
  };

  componentDidMount () {
    analytics.track("Product Added");
  }

  isValidEmail = (text) => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      updateOnboarding({
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
  };

  validateFirstName = (text) => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(INVALID_NAME_REGEX);
    if (reg.test(text) || text.trim() == "") {
      updateOnboarding({
        isValidFirstName: false,
        errorType: "firstNameFormat",
      });
    } else {
      if (errorType === "firstNameFormat") {
        updateOnboarding({
          isValidFirstName: true,
          errorType: null,
        });
      }
      updateOnboarding({ isValidFirstName: true });
    }
    updateOnboarding({ firstName: text.trim() });
  };

  validatePassword = (text) => {
    const { updateOnboarding } = this.props;
    if (text.length < 5) {
      updateOnboarding({
        isValidPassword: false,
        errorType: "passwordLength",
      });
    } else {
      updateOnboarding({ isValidPassword: true, errorType: null });
    }
    updateOnboarding({ password: text });
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
      makingRequest,
    } = this.props;

    if (!isValidPassword
      || !isValidFirstName
      || !isValidEmail
      || makingRequest
      || (!email || !password)) {
      return null;
    }

    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      const registerDeviceResponse = await registerDevice();
      if (registerDeviceResponse.type !== "networkErrors/error") {
        const registerUserResponse = await asyncCreateUser(
          {
            email,
            password,
          },
          registerDeviceResponse.payload.deviceToken,
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
          const LocationPermission = await Permission.check('location');
          if(LocationPermission === 'undetermined'){
            return navigation.dispatch({ type: "LocationPermissionView" });
          }
          if( Platform.OS !== 'android' ){
            const NotificationPermission = await Permission.check('notification');
            if(NotificationPermission === 'undetermined'){
              navigation.dispatch({ type: "Home" });
            }
          }
          return navigation.dispatch({ type: "Home" });
        }
        this.props.updateOnboarding({ makingRequest: false });
      }
    } catch (err) {
      console.log(err);
      if (err.data.errors[0] != 'cannot access another use') {
        Alert.alert(
          I18n.t('error'),
          translateApiErrorString(err.data.errors[0], 'api.errTemporary'),
          [{ text: I18n.t('ok'), onPress: () => console.log('OK Pressed') }]
        );
        navigation.dispatch({ type: 'OnboardingView' });
      }
      this.props.updateOnboarding({ makingRequest: false });
    }
  };

  renderPrivacyPolicyText = () => {
    const privacyPolicyAndTermsText = I18n.t("customerOnboarding.login.termsAndPrivacyNotice");
    const privacyPolicyText = I18n.t("customerOnboarding.login.privacyPolicy");
    const TermsText = I18n.t("customerOnboarding.login.terms");
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
              .then((supported) => {
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
          <Text style={styles.termsAndConditionsTextLink}>{` ${TermsText}`}</Text>
        </TouchableOpacity>

        <Text style={styles.termsAndConditionsText}>{AndText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={
            () => {
              Linking.canOpenURL(PrivacyPolicyURI)
                .then((supported) => {
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
      password,
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainContainer]}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              locations={[0, 1]}
              style={styles.height}
            >
              <Header navigation={navigation} />

              <View style={styles.registerContainer}>
                <KeyboardAwareScrollView enableOnAndroid>
                <View style={styles.topLogoContainer}>
                  <Image source={JeenieLogo} />
                  {errorType ? <FieldError navigation={navigation} /> : <Text style={styles.titleText}>{I18n.t("customerOnboarding.login.title")}</Text>}
                  <View style={styles.inputContainer}>
                    <View style={styles.inputViewContainer}>
                      {firstName ? (
                        <Text style={styles.labelText}>{I18n.t("firstname")}</Text>
                      ) : (
                        <Text />
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.validateFirstName(text)}
                          value={firstName}
                          placeholder={I18n.t("firstname")}
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          returnKeyType="done"
                        />
                        {errorType === "firstNameFormat" ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="white" size={15} />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>
                    </View>

                    <View style={styles.inputViewContainer}>
                      {email ? <Text style={styles.labelText}>{I18n.t("email")}</Text> : <Text />}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          autoCapitalize="none"
                          style={styles.inputText}
                          onChangeText={text => this.isValidEmail(text)}
                          onBlur={() => this.isValidEmail(email)}
                          value={email}
                          placeholder={I18n.t("email")}
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          keyboardType="email-address"
                          returnKeyType="done"
                        />
                        {errorType === "emailFormat" || errorType === "AlreadyRegistered" ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="#fff" size={15} />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>
                    </View>

                    <View style={styles.inputViewContainer}>
                      {password ? (
                        <Text style={styles.labelText}>
                          {I18n.t("customerOnboarding.register.password")}
                        </Text>
                      ) : (
                        <Text />
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.validatePassword(text)}
                          autoCapitalize="none"
                          value={password}
                          placeholder={I18n.t("customerOnboarding.register.password")}
                          secureTextEntry
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          returnKeyType="done"
                        />
                        {errorType === "passwordLength" ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="#fff" size={15} />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                </KeyboardAwareScrollView>
                <View style={styles.buttonContainer}>
                  {this.renderPrivacyPolicyText()}
                  <View style={styles.buttonWidthContainer}>
                    <TouchableOpacity
                      onPress={() => this.submit()}
                      disabled={
                        !isValidPassword
                        || !isValidFirstName
                        || !isValidEmail
                        || makingRequest
                        || (!email || !password)
                      }
                      style={
                        !isValidPassword
                        || !isValidFirstName
                        || !isValidEmail
                        || makingRequest
                        || (!email || !password)
                          ? styles.signInButtonDisable
                          : styles.registerButton
                      }
                    >
                      <Text style={styles.buttonEnabledText}>{I18n.t("continue")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.createAccountPadding}
                      onPress={() => navigation.dispatch({
                        type: "LoginView",
                      })
                      }
                    >
                      <Text style={styles.transitionButtonText}>
                        {`${I18n.t("alreadyAccount")} ${I18n.t("signIn")} »`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
  isValidPassword: state.onboardingReducer.isValidPassword,
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
  updateOnboarding,
  customerUpdateSettings,
  updateSettings,
  modifyAVModePreference,
};

export default connect(
  mS,
  mD,
)(RegisterScreen);
