import React, { Component } from "react";
import {
  Image, Platform, Text, View, StatusBar, ScrollView
} from "react-native";
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import { updateLocation } from "../../Ducks/NewSessionReducer";
import { clearOnboarding } from "../../Ducks/OnboardingReducer";
import { CUSTOMER_FREE_MINUTES as customer_free_minutes } from "../../Util/Constants";
// Styles
import styles from "./Styles/OnboardingScreenStyles";
import OnboardingButtons from "./Components/OnboardingButtons";
import I18n, { localizePrice } from "../../I18n/I18n";
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
      completedLocation,
      completedNotification,
      registerDevice,
      deviceToken,
      user,
    } = this.props;

    this.state = {
      rate: localizePrice(props.rate)
    };
    
    clearOnboarding();

    // TODO: after the navigation refactor, we shouldn't need logic for redircting
    // views.  That should be determined during app startup.
    if (isLoggedIn && token) {
      // extra check to ensure we have a user, because if not
      // we should just stay on this screen
      if (!user) {
        console.log("no user, staying on IntroView");
        return;
      }

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
    const { rate } = this.state;

    if (isLoggedIn && token) {
      return <SplashScreen animation={false} />;
    }
    return (
      <View style={styles.wrapperContainer}>
        <ScrollView alwaysBounceVertical={false} style={styles.scroll}>
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
              {I18n.t("newCustomerOnboarding.intro.descriptionRate", { rate })}
            </Text>
            <View>
              <DotSteps navigation={navigation} />
              <OnboardingButtons navigation={navigation} />
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth2.userJwtToken,
  isLoggedIn: state.auth2.isLoggedIn,
  completedLocation: state.onboardingReducer.completedLocation,
  completedNotification: state.onboardingReducer.completedNotification,
  rate: state.appConfigReducer.payAsYouGoRate,
});

const mD = {
  updateLocation,
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(OnboardingScreen);
