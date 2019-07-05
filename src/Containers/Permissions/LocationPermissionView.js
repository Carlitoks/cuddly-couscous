import React, { Component } from "react";
import {
  View, Text, Image, Platform, ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import { Colors } from "../../Themes";
import { update as updateOnboarding } from "../../Ducks/OnboardingReducer";
import DotSteps from "../Onboarding/Components/DotSteps";

// Styles
import styles from "./Styles/PermissionViewStyles";
import PermissionButtons from "./Components/PermissionButtons";
import I18n from "../../I18n/I18n";

const JeenieLogo = require("../../Assets/Images/Landing-Jeenie-TM.png");
const backgroundImage = require("../../Assets/Images/locationView.png");

class LocationPermissionView extends Component {
  componentWillMount() {
    this.checkCurrentPermissions();
  }

  checkCurrentPermissions = async () => {
    const { navigation, updateOnboarding } = this.props;
    const checkPermissions = await Permissions.check("location");
    if (checkPermissions === "authorized") {
      updateOnboarding({ completedLocation: true });
      if (Platform.OS === "android") {
        updateOnboarding({ completedNotification: true });
        return navigation.dispatch({ type: "Home" });
      }
      const notificationPermission = await Permission.check("notification");
      if (notificationPermission === "undetermined") {
        return navigation.dispatch({ type: "NotificationPermissionView" });
      }
      return navigation.dispatch({ type: "Home" });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.permissionsMainContainer]}>
          <Image style={styles.backgroundImage} source={backgroundImage} />
          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.titleTextnewOnboarding}>{I18n.t("newCustomerOnboarding.location.title")}</Text>
            </View>
            <Text style={styles.subtitleTextnewOnboarding}>
              {I18n.t("newCustomerOnboarding.location.description")}
            </Text>
            <View>
              <DotSteps navigation={navigation} />
              <PermissionButtons navigation={navigation} check="Location" />
            </View>
          </View>
        </View>
      </View>
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
)(LocationPermissionView);
