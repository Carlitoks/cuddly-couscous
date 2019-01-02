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
import styles from "./Styles/RegisterScreenStyles";
import { moderateScale } from "../../Util/Scaling";
import SGWaves from "./../../Assets/SVG/SGWaves";
import { help, EMAIL_REGEX } from "../../Util/Constants";
import {
  asyncCreateUser,
  asyncUpdateUser
} from "./../../Ducks/CustomerProfileReducer";
import FieldError from "./Components/FieldError";
import { Icon } from "react-native-elements";
import metrics from "../../Themes/Metrics";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      password: "",
      valid: false
    };
  }

  isValidEmail = text => {
    let reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(this.props.email)) {
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
                  {this.props.errorType ? (
                    <FieldError navigation={this.props.navigation} />
                  ) : (
                    <Text style={styles.registerAdviseText}>
                      Provide your name, email and a password so that you can
                      access your account in the future.
                    </Text>
                  )}

                  <View style={styles.inputViewContainer}>
                    <Text
                      style={styles.labelText}
                    >
                      First Name
                    </Text>
                    <View
                      style={styles.inputsErrosContainer}
                    >
                      <TextInput
                        style={styles.inputText}
                        onChangeText={text =>
                          this.props.updateOnboarding({ firstName: text })
                        }
                        value={this.props.firstName}
                        placeholder={"First Name"}
                        placeholderTextColor={"rgba(255,255,255,0.7)"}
                      />
                    </View>
                  </View>

                  <View style={styles.inputViewContainer}>
                    <Text
                      style={styles.labelText}
                    >
                      Email
                    </Text>
                    <View
                      style={styles.inputsErrosContainer}
                    >
                      <TextInput
                        style={styles.inputText}
                        onChangeText={text => this.isValidEmail(text)}
                        onChange={text => this.isValidEmail(text)}
                        onBlur={() => this.isValidEmail(this.props.email)}
                        value={this.props.email}
                        placeholder={"Email"}
                        placeholderTextColor={"rgba(255,255,255,0.7)"}
                        keyboardType={"email-address"}
                      />
                      {this.props.errorType === "emailFormat" ||
                      this.props.errorType === "AlreadyRegistered" ? (
                        <View
                          style={styles.errorIconContainer}
                        >
                          <Icon
                            name={"close"}
                            type={"evilicon"}
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
                    <Text
                      style={styles.labelText}
                    >
                      Create Password
                    </Text>
                    <View
                      style={styles.inputsErrosContainer}
                    >
                      <TextInput
                        style={styles.inputText}
                        onChangeText={text =>
                          this.props.updateOnboarding({ password: text })
                        }
                        value={this.props.password}
                        placeholder={"Create Password"}
                        secureTextEntry={true}
                        placeholderTextColor={"rgba(255,255,255,0.7)"}
                      />
                    </View>
                  </View>
                  <Text style={styles.termsAndConditionsText}>
                    By continuing, you agree to our Terms and Privacy Policy.
                  </Text>
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
                          : styles.registerButton
                      }
                    >
                      <Text style={styles.buttonEnabledText}>
                        Create Account
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.createAccountPadding}
                      onPress={() =>
                        this.props.navigation.dispatch({ type: "LoginScreen" })
                      }
                    >
                      <Text style={styles.buttonEnabledText}>
                        Already have an account? Sign In »
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
  deviceToken: state.registrationCustomer.deviceToken,
  errorType: state.onboardingReducer.errorType,
  makingRequest: state.onboardingReducer.makingRequest,
  isValidEmail: state.onboardingReducer.isValidEmail,
  email: state.onboardingReducer.email,
  password: state.onboardingReducer.password,
  firstName: state.onboardingReducer.firstName
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
