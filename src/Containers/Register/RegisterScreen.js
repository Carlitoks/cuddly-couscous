import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import LinguistHeader from '../CustomerHome/Components/Header';
import { Colors, Metrics } from '../../Themes';
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  modifyAVModePreference
} from "../../Ducks/NewSessionReducer";

import {
  getProfileAsync,
  updateView as updateUserProfile,
  getNativeLang
} from '../../Ducks/UserProfileReducer';
import { checkRecord } from '../../Ducks/OnboardingRecordReducer';
import { logInAsync, haveSession, registerDevice } from '../../Ducks/AuthReducer';

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import {
  clear as clearActiveSession,
  update as customerUpdateSettings
} from "../../Ducks/ActiveSessionReducer";
import { updateSettings } from "../../Ducks/ContactLinguistReducer";
import I18n from "./../../I18n/I18n";
import Permissions from "react-native-permissions";
import { checkRegisterCallPermissions} from "../../Util/Permission";

// Styles
import styles from "./Styles/RegisterScreenStyles";
import { moderateScale } from "../../Util/Scaling";
import SGWaves from "./../../Assets/SVG/SGWaves";
import { help, EMAIL_REGEX, INVALID_NAME_REGEX } from "../../Util/Constants";
import {
  asyncCreateUser,
  asyncUpdateUser
} from "./../../Ducks/CustomerProfileReducer";
import FieldError from "./Components/FieldError";
import metrics from "../../Themes/Metrics";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import fonts from "../../Themes/Fonts";
import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";

class RegisterScreen extends Component {
  isValidEmail = text => {
    const { updateOnboarding, errorType } = this.props;
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      updateOnboarding({
        isValidEmail: false,
        errorType: 'emailFormat'
      });
    } else {
      if (errorType === 'emailFormat') {
        updateOnboarding({ isValidEmail: true, errorType: null });
      }
      updateOnboarding({ isValidEmail: true });
    }
    updateOnboarding({ email: text });
  };

  checkAvailableMinutes = async () => {
    const {
      navigation,
      customerUpdateSettings,
      updateSettings,
      modifyAVModePreference
    } = this.props;
    updateSettings({
      selectedScenarioId:
        null
    });
    customerUpdateSettings({ video: true });
    modifyAVModePreference({ avModePreference: "video" });

      Permissions.checkMultiple(["camera", "microphone"]).then(
        async response => {
          if (
            response.camera !== "authorized" ||
            response.microphone !== "authorized"
          ) {
            await checkRegisterCallPermissions(valueToUpdate => {
              customerUpdateSettings(valueToUpdate);
              Permissions.checkMultiple(["camera", "microphone"]).then(
                response => {
                  if (
                    response.camera == "authorized" &&
                    response.microphone == "authorized"
                  ) {
                    navigation.dispatch({ type: "CustomerView" });
                  }

                  if(response.camera == "undetermined" ||
                  response.microphone == "undetermined"){
                    ;
                  }else if (
                    response.camera == "restricted" ||
                    response.microphone == "restricted" ||
                    (response.camera == "denied" || response.microphone == "denied")
                  ) {
                    navigation.dispatch({ type: "Home" });

                  }
                }
              );
            });
          }
        }
      );
    };

  validateFirstName = text => {
    const {errorType, updateOnboarding} = this.props;
    let reg = new RegExp(INVALID_NAME_REGEX);
    if (reg.test(text) || text.trim()=="") {
      this.props.updateOnboarding({
        isValidFirstName: false,
        errorType: 'firstNameFormat'
      });
    } else {
      if (errorType === 'firstNameFormat') {
        updateOnboarding({
          isValidFirstName: true,
          errorType: null
        });
      }
      updateOnboarding({ isValidFirstName: true });
    }
    this.props.updateOnboarding({ firstName: text.trim() });
  };

  validatePassword = text => {
    const { updateOnboarding } = this.props;
    if (text.length < 5) {
      updateOnboarding({
        isValidPassword: false,
        errorType: 'passwordLength'
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
      firstName, primaryLangCode,secondaryLangCode
    } = this.props;

    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      const registerDeviceResponse = await registerDevice();
      if (registerDeviceResponse.type !== 'networkErrors/error') {
        const registerUserResponse = await asyncCreateUser(
          {
            email,
            password
          },
          registerDeviceResponse.payload.deviceToken
        );
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

        if(!primaryLangCode || !secondaryLangCode){
          navigation.dispatch({ type: "Home" });
        }else{
          this.checkAvailableMinutes();
        }
      }
    } catch (err) {
      updateOnboarding({ makingRequest: false });
    }
  };

  renderPrivacyPolicyText = () => {
    const privacyPolicyAndTermsText = I18n.t('customerOnboarding.login.termsAndPrivacyNotice');
    const privacyPolicyText = I18n.t('customerOnboarding.login.privacyPolicy');
    const TermsText = I18n.t('customerOnboarding.login.terms');
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
              .catch(err => console.error('An error occurred', err));
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
                .then(supported => {
                  if (!supported) {
                    console.log(`Can't handle url: ${PrivacyPolicyURI}`);
                  } else {
                    return Linking.openURL(PrivacyPolicyURI);
                  }
                  return null;
                })
                .catch(err => console.error('An error occurred', err));
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
          <View style={[styles.mainContainer]}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              locations={[0, 1]}
              style={styles.height}
            >
              <LinguistHeader type="login" navigation={navigation} />
              <LinearGradient
                colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
                locations={[0, 1]}
                style={styles.height}
              >
                <View style={styles.loginContainer}>
                  <View style={styles.inputContainer}>
                    {errorType ? (
                      <FieldError navigation={navigation} />
                    ) : (
                      <Text style={styles.registerAdviseText}>
                        {I18n.t('customerOnboarding.login.provideInformation')}
                      </Text>
                    )}

                    <View style={styles.inputViewContainer}>
                      {firstName ? (
                        <Text style={styles.labelText}>{I18n.t('firstname')}</Text>
                      ) : (
                        <Text />
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.validateFirstName(text)}
                          value={firstName}
                          placeholder={I18n.t('firstname')}
                          placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                        {errorType === 'firstNameFormat' ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="white" size={15} />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>
                    </View>

                    <View style={styles.inputViewContainer}>
                      {email ? <Text style={styles.labelText}>{I18n.t('email')}</Text> : <Text />}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          autoCapitalize="none"
                          style={styles.inputText}
                          onChangeText={text => this.isValidEmail(text)}
                          onBlur={() => this.isValidEmail(email)}
                          value={email}
                          placeholder={I18n.t('email')}
                          placeholderTextColor="rgba(255,255,255,0.7)"
                          keyboardType="email-address"
                        />
                        {errorType === 'emailFormat' || errorType === 'AlreadyRegistered' ? (
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
                          {I18n.t('customerOnboarding.register.password')}
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
                          placeholder={I18n.t('customerOnboarding.register.password')}
                          secureTextEntry
                          placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                        {errorType === 'passwordLength' ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="#fff" size={15} />
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
                          (!email || !password)
                        }
                        style={
                          !isValidPassword ||
                          !isValidFirstName ||
                          !isValidEmail ||
                          makingRequest ||
                          (!email || !password)
                            ? styles.signInButtonDisable
                            : styles.registerButton
                        }
                      >
                        <Text style={styles.buttonEnabledText}>
                          {I18n.t('customerOnboarding.register.createAnAccount')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.createAccountPadding}
                        onPress={() =>
                          navigation.dispatch({
                            type: 'LoginScreen'
                          })
                        }
                      >
                        <Text style={styles.transitionButtonText}>
                          {`${I18n.t('alreadyAccount')} ${I18n.t('signIn')} »`}
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
  updateOnboarding,
  customerUpdateSettings,
  updateSettings,
  modifyAVModePreference
};

export default connect(
  mS,
  mD
)(RegisterScreen);
