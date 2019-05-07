import React, { Component } from "react";
import {
  Alert,
  Image, ImageBackground,
  Keyboard, Platform, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ensureSessionDefaults,
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
import I18n, { translateApiErrorString, translateApiError } from "../../I18n/I18n";
// Styles
import styles from "./Styles/LoginScreenStyles";
import { EMAIL_REGEX } from "../../Util/Constants";
import { noOnboarding, update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import Header from "../CustomerHome/Components/Header";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import { moderateScaleViewports } from "../../Util/Scaling";
import Permission from "react-native-permissions";

const JeenieLogo = require("../../Assets/Images/jeenieLogo.png");
const BG = require("../../Assets/Images/BG.png");

class LoginScreen extends Component {
  isValidEmail = (text) => {
    const { updateOnboarding } = this.props;
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      updateOnboarding({
        isValidEmail: false,
        errorType: "emailFormat",
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
      password,
      noOnboarding,
    } = this.props;
    try {
      updateOnboarding({ errorType: null, makingRequest: true });
      await registerDevice();
      const logInUserResponse = await logInAsync(email, password);
      const getUserProfile = await getProfileAsync(
        logInUserResponse.payload.uuid,
        logInUserResponse.payload.token,
      );
      await updateUserProfile({
        selectedNativeLanguage: getNativeLang(getUserProfile.payload.nativeLangCode),
      });
      const record = await checkRecord(email);
      if (record) {
        updateCustomer({ userInfo: { id: record.id } });
        Alert.alert(I18n.t("finishOnboarding"), I18n.t("finishOnboardingMessage"), [
          {
            text: I18n.t("ok"),
          },
        ]);

        updateOnboarding({ makingRequest: false });
        navigation.dispatch({ type: record.lastStage });
      } else {
        updateOnboarding({ makingRequest: false });
        noOnboarding();
        navigation.dispatch({ type: "Home" });
      }
    } catch (err) {
      if (!!err.data && !!err.data.errors && !!err.data.errors[0]) {
        switch (err.data.errors[0]) {
          case "Email not found": updateOnboarding({errorType: "emailNotFound"}); break;
          case "Password incorrect": updateOnboarding({errorType: "signInError"}); break;
        }
      } else {
        Alert.alert(I18n.t('error'), translateApiError(err), 'api.errTemporaryTryAgain');
      }
      updateOnboarding({
        makingRequest: false,
      });
    }
  };

  handleTouch = async (goto) => {
    const { navigation } = this.props;
    const LocationPermission = await Permission.check("location");
    if (LocationPermission === "undetermined" || LocationPermission === "denied") {
      return navigation.dispatch({ type: "LocationPermissionView", params: { redirectTo: goto } });
    }
    if (Platform.OS !== "android") {
      const NotificationPermission = await Permission.check("notification");
      if (NotificationPermission === "undetermined" || NotificationPermission === "denied") {
        return navigation.dispatch({ type: "Home", params: { redirectTo: goto } });
      }
    }
    return navigation.dispatch({ type: goto });
  };

  render() {
    const {
      makingRequest,
      isValidEmail,
      navigation,
      errorType,
      email,
      password,
      updateOnboarding,
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainRegisterContainer]}>
            <Header navigation={navigation} />
            <ScrollView contentContainerStyle={styles.registerContainer}>
                <View style={styles.topLogoContainer}>
                  <ImageBackground resizeMode="stretch" source={BG} style={styles.backgroundContainer}>
                    <Image source={JeenieLogo} />
                    <Text style={styles.titleText}>
                      {I18n.t("appName")}
                    </Text>

                    <Text style={styles.subtitleText}>
                      {I18n.t("languageCommand")}
                    </Text>
                  </ImageBackground>
                  <View style={styles.inputContainer}>
                    <View style={email ? styles.inputViewContainerValue : styles.inputViewContainer}>
                      {email ? (
                        <Text style={styles.labelText}>{I18n.t("fields.email.label")}</Text>
                      ) : (
                        <Text style={[styles.labelText, styles.firstInput]} />
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={errorType === "signInError" || errorType === "emailFormat" || errorType === "emailNotFound" ? styles.inputTextInvalid : styles.inputTextValid}
                          onChangeText={text => this.isValidEmail(text)}
                          autoCapitalize="none"
                          onBlur={() => this.isValidEmail(email)}
                          blurOnSubmit={false}
                          value={email}
                          placeholder={I18n.t("email")}
                          placeholderTextColor="rgba(0, 0, 0, 0.54)"
                          keyboardType="email-address"
                        />
                      </View>
                      { errorType === "signInError" || errorType === "emailFormat" ? (
                        <Text style={styles.invalidLabelText}>{I18n.t("fields.email.errInvalid")}</Text>
                      ) : errorType === "emailNotFound" ? <Text style={styles.invalidLabelText}>{I18n.t("api.errNoEmail")}</Text> : (
                        <Text style={styles.invalidLabelText} />
                      )}
                    </View>

                    <View style={password ? styles.inputViewContainerValue : styles.inputViewContainer}>
                      {password ? (
                        <Text style={styles.labelText}>
                          {I18n.t("fields.password.label")}
                        </Text>
                      ) : (
                        <Text style={styles.labelText} />
                      )}
                      <View style={styles.inputsErrorContainer}>
                        <TextInput
                          allowFontScaling={false}
                          style={errorType === "passwordLength" ? styles.inputTextInvalid : styles.inputTextValid}
                          onChangeText={text => updateOnboarding({ password: text })}
                          autoCapitalize="none"
                          value={password}
                          placeholder={I18n.t("fields.password.label")}
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

                    <TouchableOpacity
                      onPress={() => this.submit()}
                      disabled={!isValidEmail || makingRequest || (!email || !password)}
                      style={
                        !isValidEmail || makingRequest || (!email || !password)
                          ? styles.createAccountButtonDisable
                          : styles.createAccountButton
                      }
                    >
                      <Text
                        style={[
                          styles.buttonEnabledText,
                        ]}
                      >
                        {I18n.t("signIn")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.dispatch({
                      type: "ForgotPasswordView",
                    })
                    }
                  >
                    <Text style={styles.transitionButtonText}>
                      {I18n.t("newCustomerOnboarding.login.forgotPassword")}
                    </Text>
                  </TouchableOpacity>

                  <View styles={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
                    <View style={styles.dividerContainer}>
                      <Divider style={styles.divider} />
                      <Text style={styles.dividerText}>Or</Text>
                      <Divider style={styles.divider} />
                    </View>
                    <TouchableOpacity
                      onPress={() => this.handleTouch("RegisterView")}
                      style={styles.createAccountButtonTransition}
                    >
                      <Text style={styles.transitionCreateButtonText}>
                        {I18n.t("customerOnboarding.register.createAnAccount")}
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>
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
  email: state.onboardingReducer.email,
  password: state.onboardingReducer.password,
  errorType: state.onboardingReducer.errorType,
  makingRequest: state.onboardingReducer.makingRequest,
  isValidEmail: state.onboardingReducer.isValidEmail,
});

const mD = {
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
  updateOnboarding,
  noOnboarding,
};

export default connect(
  mS,
  mD,
)(LoginScreen);
