import React, { Component } from "react";
import {
  Image, Platform, Text, View, StatusBar
} from "react-native";
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import { ensureSessionDefaults, updateLocation } from "../../Ducks/NewSessionReducer";
import { clearOnboarding } from "../../Ducks/OnboardingReducer";
import { CUSTOMER_FREE_MINUTES as customer_free_minutes } from "../../Util/Constants";
// Styles
import styles from "./Styles/OnboardingScreenStyles";
import OnboardingButtons from "./Components/OnboardingButtons";
import I18n from "../../I18n/I18n";
import { isIphoneXorAbove } from "../../Util/Devices";
import DotSteps from "./Components/DotSteps";
import SplashScreen from "./Components/SplashScreen";

const JeenieLogo = require("../../Assets/Images/Landing-Jeenie-TM.png");

const backgroundImage = () => {
  if (isIphoneXorAbove()) {
    return require("../../Assets/Images/iPhoneXintroView.png");
  }
  if (Platform.OS === "ios") {
    return require("../../Assets/Images/iPhone8introView.png");
  }
  return require("../../Assets/Images/samsunggalaxys8introView.png");
};

class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    const {
      navigation,
      isLoggedIn,
      token,
      clearOnboarding,
      primaryLangCode,
      ensureSessionDefaults,
      secondaryLangCode,
      completedLocation,
      completedNotification,
    } = this.props;
    clearOnboarding();
    ensureSessionDefaults({
      primaryLangCode: primaryLangCode || "eng",
      secondaryLangCode: secondaryLangCode || "",
    });


    if (isLoggedIn && token) {
      if (completedLocation) {
        if (completedNotification) {
          navigation.dispatch({ type: "Home" });
        }
        if (Platform.OS === "android") {
          navigation.dispatch({ type: "Home" });
        } else {
          Permission.check("notification").then((permission) => {
            if (permission === "undetermined") {
              navigation.dispatch({ type: "Home" });
            } else {
              navigation.dispatch({ type: "Home" });
            }
          });
        }
      }
      Permission.check("location").then((permission) => {
        if (permission === "undetermined") {
          navigation.dispatch({ type: "LocationPermissionView" });
        } else {
          navigation.dispatch({ type: "Home" });
        }
      });
    }
  }

  render() {
    const { navigation, isLoggedIn, token } = this.props;
    // if (isLoggedIn && token) {
    //   return <SplashScreen animation={false} />;
    // }
    return (
      <View style={styles.wrapperContainer}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          hidden={false}
          backgroundColor={"transparent"}
        />
        <View style={[styles.mainOnboardingContainer]} collapsable={false}>
          <Image style={styles.backgroundImage} source={backgroundImage()} />
          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.titleText}>{I18n.t("newCustomerOnboarding.intro.title")}</Text>
            </View>
            <Text style={styles.subtitleText}>
              {I18n.t("newCustomerOnboarding.intro.description")}
            </Text>
            <View>
              <DotSteps navigation={navigation} />
              <OnboardingButtons navigation={navigation} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth2.userJwtToken,
  isLoggedIn: state.auth2.isLoggedIn,
  completedLocation: state.onboardingReducer.completedLocation,
  completedNotification: state.onboardingReducer.completedNotification,
});

const mD = {
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(OnboardingScreen);
