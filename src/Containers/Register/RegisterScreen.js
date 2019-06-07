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
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import I18n from "../../I18n/I18n";
// Styles
import styles from "./Styles/RegisterScreenStyles";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import FirstNameField from "./Components/FirstNameField";
import EmailField from "./Components/EmailField";
import PasswordField from "./Components/PasswordField";
import NativeLangField from "./Components/NativeLangField";
import TermsAndConditions from "./Components/TermsAndConditions";
import SubmitButton from "./Components/SubmitButton";
import metrics from "../../Themes/Metrics";

const JeenieLogo = require("../../Assets/Images/jeenieLogo.png");
const BG = require("../../Assets/Images/BG.png");

class RegisterScreen extends Component {
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

  setFirstNameRef = (ref) => {
    this.firstNameInput = ref;
  };

  setEmailRef = (ref) => {
    this.emailInput = ref;
  };

  setpasswordRef = (ref) => {
    this.passwordInput = ref;
  };

  gotoEmail = () => {
    this.emailInput.focus();
  }

  gotoPassword = () => {
    this.passwordInput.focus();
  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} enabled>
        <View style={styles.wrapperContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.mainRegisterContainer]}>
              <ScrollView bounce={false} contentContainerStyle={styles.registerContainer}>
                <View style={styles.topLogoContainer}>
                  <ImageBackground resizeMode="stretch" source={BG} imageStyle={styles.backgroundImage} style={styles.backgroundContainer}>
                    <View style={styles.backgroundContainer}>
                      {(metrics.width > 320 && <Image style={styles.logoImg} source={JeenieLogo} />)}
                      <Text style={styles.titleText}>
                        {I18n.t("newCustomerOnboarding.register.title")}
                      </Text>
                      <View styles={styles.bottomMarginContainer}>
                        <View style={styles.inputContainer}>
                          <FirstNameField setRef={this.setFirstNameRef} nextInput={this.gotoEmail} />
                          <EmailField setRef={this.setEmailRef} nextInput={this.gotoPassword} />
                          <PasswordField setRef={this.setpasswordRef} />
                          <NativeLangField />
                          <TermsAndConditions />
                          <SubmitButton navigation={navigation} />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.handleTouch("LoginView")}
                          style={{ justifyContent: "center", alignItems: "center" }}
                        >
                          <View style={styles.textContainerRow}>
                          <Text style={styles.transitionButtonText}>
                            {`${I18n.t("alreadyAccount")} `}
                          </Text>
                          <Text style={styles.transitionButtonSginInText}>
                            {`${I18n.t("signIn")} `}
                          </Text>
                        </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
          <SlideUpPanel navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD,
)(RegisterScreen);
