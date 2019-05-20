import React, { Component } from "react";
import { View, Text, Image, Platform, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { Colors } from "../../Themes";
import { updateLocation, ensureSessionDefaults } from "../../Ducks/NewSessionReducer";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearOnboarding, update as updateOnboarding } from "../../Ducks/OnboardingReducer";

// Styles
import styles from "./Styles/PermissionViewStyles";
import PermissionButtons from "./Components/PermissionButtons";
import I18n from "../../I18n/I18n";
import Permissions from "react-native-permissions";
import DotSteps from "../Onboarding/Components/DotSteps";

const JeenieLogo = require("../../Assets/Images/Landing-Jeenie-TM.png");

const backgroundImage = require("../../Assets/Images/NotificationViewBackground.jpg");

class NotificationPermissionView extends Component {
  componentWillMount() {
    this.checkCurrentPermissions();
  }

  checkCurrentPermissions = async () => {
    const { navigation, updateOnboarding } = this.props;
    const checkPermissions = await Permissions.check("notification");
    if (checkPermissions === "authorized") {
      updateOnboarding({ completedNotification: true });
      navigation.dispatch({ type: "Home" });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.permissionsMainContainer]}>
          <Image source={backgroundImage} style={styles.backgroundImage} />
          <View style={styles.bodyContainer}>
            <Text style={styles.titleTextnewOnboarding}>{I18n.t("newCustomerOnboarding.notification.title")}</Text>
            <View>
              <Text style={styles.subtitleTextnewOnboarding}>
                {I18n.t("newCustomerOnboarding.notification.description")}
              </Text>
              <DotSteps navigation={navigation} />
              <PermissionButtons navigation={navigation} check={"Notification"} />
            </View>
          </View>
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
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding,
  updateOnboarding
};

export default connect(
  mS,
  mD
)(NotificationPermissionView);
