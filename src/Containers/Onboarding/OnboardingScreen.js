import React, { Component } from "react";
import { ScrollView, View, Alert } from "react-native";
import LinguistHeader from "../CustomerHome/Components/Header";
import AvatarSection from "../CustomerHome/Components/AvatarSection";
import CallSection from "../CustomerHome/Components/CallSection";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../Themes";
import { connect } from "react-redux";
import SlideUpPanel from "../CustomerHome/Components/Partials/SlideUpPanel";
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults
} from "../../Ducks/NewSessionReducer";
import { getGeolocationCoords } from "../../Util/Helpers";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import FreeMinutesWell from "./Components/FreeMinutesWell";
import { clear as clearOnboarding } from "../../Ducks/OnboardingReducer";

// Styles
import styles from "./Styles/OnboardingScreenStyles";
import OnboardingButtons from "./Components/OnboardingButtons";

class OnboardingScreen extends Component {
  componentWillMount() {
    const {
      navigation,
      isLoggedIn,
      token,
      clearOnboarding,
      updateLocation,
      primaryLangCode,
      ensureSessionDefaults,
      secondaryLangCode
    } = this.props;
    clearOnboarding();
    getGeolocationCoords()
      .then(response => {
        updateLocation({
          location: [response.coords.longitude, response.coords.latitude]
        });
      })
      .catch(err => {
        console.log("GeoLocation error  ", err);
      });

    ensureSessionDefaults({
      primaryLangCode: primaryLangCode ? primaryLangCode : "eng",
      secondaryLangCode: secondaryLangCode ? secondaryLangCode : ""
    });
    if (isLoggedIn && token) {
      navigation.dispatch({ type: "Home" });
    }
  }

  openSlideMenu = type => {
    this.props.openSlideMenu({ type });
  };
  render() {
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={{ height: "100%" }}
          >
            <LinguistHeader
              type={"onboarding"}
              navigation={this.props.navigation}
            />
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              contentContainerStyle={styles.scrollViewFlex}
            >
              <AvatarSection />
              <FreeMinutesWell navigation={this.props.navigation} />
              <CallSection
                navigation={this.props.navigation}
                openSlideMenu={this.openSlideMenu}
                type={"onboarding"}
              />
              <OnboardingButtons navigation={this.props.navigation} />
            </ScrollView>
            <SlideUpPanel />
          </LinearGradient>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding
};

export default connect(
  mS,
  mD
)(OnboardingScreen);
