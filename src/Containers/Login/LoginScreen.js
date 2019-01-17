import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import LinguistHeader from '../CustomerHome/Components/Header';
import { Colors, Metrics } from '../../Themes';
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults
} from '../../Ducks/NewSessionReducer';

import {
  getProfileAsync,
  updateView as updateUserProfile,
  getNativeLang
} from '../../Ducks/UserProfileReducer';
import { checkRecord } from '../../Ducks/OnboardingRecordReducer';
import { logInAsync, haveSession, registerDevice } from '../../Ducks/AuthReducer';

import ViewWrapper from '../ViewWrapper/ViewWrapper';
import { clear as clearEvents } from '../../Ducks/EventsReducer';
import { clear as clearActiveSession } from '../../Ducks/ActiveSessionReducer';
import I18n from '../../I18n/I18n';

// Styles
import styles from './Styles/LoginScreenStyles';
import SGWaves from '../../Assets/SVG/SGWaves';
import { EMAIL_REGEX } from '../../Util/Constants';
import FieldError from '../Register/Components/FieldError';
import { update as updateOnboarding } from '../../Ducks/OnboardingReducer';

class LoginScreen extends Component {
  isValidEmail = text => {
    const { updateOnboarding } = this.props;
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      updateOnboarding({
        isValidEmail: false,
        errorType: 'emailFormat'
      });
    } else {
      updateOnboarding({ isValidEmail: true, errorType: null });
    }
    updateOnboarding({ email: text });
  };

  submit = async () => {
    const {
      registerDevice,
      logInAsync,
      navigation,
      checkRecord,
      updateCustomer,
      getProfileAsync,
      getNativeLang,
      updateOnboarding,
      email,
      password
    } = this.props;
    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      await registerDevice();
      const logInUserResponse = await logInAsync(email, password);
      const getUserProfile = await getProfileAsync(
        logInUserResponse.payload.uuid,
        logInUserResponse.payload.token
      );
      await updateUserProfile({
        selectedNativeLanguage: getNativeLang(getUserProfile.payload.nativeLangCode)
      });
      const record = await checkRecord(email);
      if (record) {
        updateCustomer({ userInfo: { id: record.id } });
        Alert.alert(I18n.t('finishOnboarding'), I18n.t('finishOnboardingMessage'), [
          {
            text: I18n.t('ok')
          }
        ]);

        updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: record.lastStage });
      } else {
        updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: 'Home' });
      }
    } catch (err) {
      if (err.data.errors[0] === 'Password incorrect') {
        updateOnboarding({
          errorType: 'signInError'
        });
      }

      if (err.data.errors[0] === 'Email not found') {
        updateOnboarding({
          errorType: 'emailNotFound'
        });
      }
      updateOnboarding({
        makingRequest: false
      });
    }
  };

  render() {
    const {
      makingRequest,
      isValidEmail,
      navigation,
      errorType,
      email,
      password,
      updateOnboarding
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainContainer]}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              locations={[0, 1]}
              style={{ height: '100%' }}
            >
              <LinguistHeader type="login" navigation={navigation} />
              <LinearGradient
                colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
                locations={[0, 1]}
                style={{ height: '100%' }}
              >
                <View style={styles.loginContainer}>
                  <View style={styles.inputContainer}>
                    {errorType === 'signInError' ||
                    errorType === 'emailFormat' ||
                    errorType === 'emailNotFound' ? (
                      <FieldError navigation={navigation} />
                    ) : (
                      <View />
                    )}

                    <View style={styles.inputViewContainer}>
                      {email ? <Text style={styles.labelStyle}>{I18n.t('email')}</Text> : <Text />}
                      <View style={styles.inputInternalContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => this.isValidEmail(text)}
                          autoCapitalize="none"
                          onBlur={() => this.isValidEmail(email)}
                          value={email}
                          placeholder={I18n.t('email')}
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          keyboardType="email-address"
                        />
                        {errorType === 'signInError' || errorType === 'emailFormat' ? (
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
                        <Text style={styles.labelStyle}>{I18n.t('password')}</Text>
                      ) : (
                        <Text />
                      )}
                      <View style={styles.inputInternalContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.inputText}
                          onChangeText={text => updateOnboarding({ password: text })}
                          autoCapitalize="none"
                          value={password}
                          placeholder={I18n.t('password')}
                          secureTextEntry
                          placeholderTextColor="rgba(255,255,255,0.5)"
                        />
                        {errorType === 'signInError' ? (
                          <View style={styles.errorIconContainer}>
                            <Icon name="close" type="material-community" color="#fff" size={15} />
                          </View>
                        ) : (
                          <React.Fragment />
                        )}
                      </View>

                      <Text
                        onPress={() =>
                          navigation.dispatch({
                            type: 'ForgotPasswordView'
                          })
                        }
                        style={styles.forgotPasswordLabel}
                      >
                        {I18n.t('customerOnboarding.login.forgotPassword')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <View style={styles.buttonWidthContainer}>
                      <TouchableOpacity
                        onPress={() => this.submit()}
                        disabled={!isValidEmail || makingRequest || (!email || !password)}
                        style={
                          !isValidEmail || makingRequest || (!email || !password)
                            ? styles.signInButtonDisable
                            : styles.signInButtonEnabled
                        }
                      >
                        <Text style={styles.buttonEnabledText}>{I18n.t('signIn')}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.dispatch({
                            type: 'RegisterScreen'
                          })
                        }
                        style={styles.createAccountPadding}
                      >
                        <Text style={styles.transitionButtonText}>
                          {I18n.t('customerOnboarding.register.createAnAccount')} »
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
