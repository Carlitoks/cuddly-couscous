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
} from "react-native";
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ViewWrapper from "../ViewWrapper/ViewWrapper";
import I18n from "../../I18n/I18n";
// Styles
import styles from "./Styles/RegisterScreenStyles";
import Header from "../CustomerHome/Components/Header";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import FirstNameField from "./Components/FirstNameField";
import EmailField from "./Components/EmailField";
import PasswordField from "./Components/PasswordField";
import NativeLangField from "./Components/NativeLangField";
import TermsAndConditions from "./Components/TermsAndConditions";
import SubmitButton from "./Components/SubmitButton";

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

  render() {
    const {
      navigation,
    } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.mainRegisterContainer]}>
            <Header navigation={navigation} />
            <ScrollView contentContainerStyle={styles.registerContainer}>
              <KeyboardAwareScrollView enableOnAndroid>
                <View style={styles.topLogoContainer}>
                  <ImageBackground resizeMode="stretch" source={BG} style={styles.backgroundContainer}>
                    <Image source={JeenieLogo} />
                    <Text style={styles.titleText}>
                      {I18n.t("newCustomerOnboarding.register.title")}
                    </Text>
                  </ImageBackground>
                  <View style={styles.inputContainer}>
                    <FirstNameField />
                    <EmailField />
                    <PasswordField />
                    <NativeLangField />
                    <TermsAndConditions />
                    <SubmitButton />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.handleTouch("LoginView")}
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

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD,
)(RegisterScreen);
