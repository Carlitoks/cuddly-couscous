import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import Permission from "react-native-permissions";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import I18n from "../../I18n/I18n";
// Styles
import styles from "./Styles/LoginScreenStyles";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import EmailField from "../Register/Components/EmailField";
import PasswordField from "../Register/Components/PasswordField";
import SubmitButton from "../Register/Components/SubmitButton";
import metrics from "../../Themes/Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {moderateScaleViewports} from "../../Util/Scaling";

const JeenieLogo = require("../../Assets/Images/jeenieLogo.png");
const BG = require("../../Assets/Images/BG.png");

class LoginScreen extends Component {
  changePassword = (text) => {
    const { updateOnboarding } = this.props;
    updateOnboarding({ password: text });
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

  setEmailRef = (ref) => {
    this.emailInput = ref;
  };

  setpasswordRef = (ref) => {
    this.passwordInput = ref;
  };


  gotoPassword = () => {
    this.passwordInput.focus();
  }

  render() {
    const {
      navigation,
    } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} enabled>
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainRegisterContainer]}>
            <ScrollView bounces={false} contentContainerStyle={styles.registerContainer}>
              <View style={styles.topLogoContainer}>
                <ImageBackground
                  resizeMode="stretch"
                  source={BG}
                  imageStyle={styles.backgroundImage}
                  style={styles.backgroundContainer}
                >
                      {(metrics.width > 320 && <Image style={styles.logoImg} source={JeenieLogo} />)}
                      <Text style={styles.titleText}>
                        {I18n.t("appName")}
                      </Text>
                      <Text style={styles.subtitleText}>
                        {I18n.t("languageCommand")}
                      </Text>
                      <View style={styles.bottomMarginContainer}>
                        <View style={styles.inputContainer}>
                          <EmailField setRef={this.setEmailRef} nextInput={this.gotoPassword} />
                          <PasswordField setRef={this.setpasswordRef} type="login" onChange={this.changePassword} />
                          <SubmitButton type="login" navigation={navigation} />
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
                        <View styles={styles.bottomContainer}>
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
                </ImageBackground>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <SlideUpPanel />
      </ViewWrapper>
      </KeyboardAvoidingView>
    );
  }
}

const mS = state => ({});

const mD = {
  updateOnboarding,
};

export default connect(
  mS,
  mD,
)(LoginScreen);
