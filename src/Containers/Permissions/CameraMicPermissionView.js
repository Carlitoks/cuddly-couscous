import React, { Component } from "react";
import {
  Image, Platform, Text, View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import { Colors } from "../../Themes";
import { ensureSessionDefaults, updateLocation } from "../../Ducks/NewSessionReducer";
import { clear as clearOnboarding } from "../../Ducks/OnboardingReducer";
// Styles
import styles from "./Styles/PermissionViewStyles";
import PermissionButtons from "./Components/PermissionButtons";
import I18n from "../../I18n/I18n";

const JeenieLogo = require("../../Assets/Images/Landing-Jeenie-TM.png");

class CameraMicPermissionView extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    Permissions.checkMultiple(["camera", "microphone"]).then((checkPermissions) => {
      if (checkPermissions.camera === "authorized" && checkPermissions.microphone === "authorized") {
        navigation.dispatch({ type: "Home" });
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={styles.gradientContainer}
          >
            <View style={styles.topLogoContainer}>
              <Image source={JeenieLogo} />
              <Text style={styles.allSet}>
                {I18n.t("customerHome.sessionPermissions.heading")}
              </Text>
            </View>

            <View style={styles.bottomButtonsContainer}>
              <Text style={styles.titleText}>{I18n.t("customerHome.sessionPermissions.title")}</Text>
              <Text style={styles.subtitleText}>
                {I18n.t("customerHome.sessionPermissions.description")}
              </Text>
              <PermissionButtons navigation={navigation} check="CameraMic" />
            </View>
          </LinearGradient>
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
});

const mD = {
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(CameraMicPermissionView);
