import React, { Component } from "react";
import {
  Platform, Text, TouchableOpacity, View, Alert,
} from "react-native";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import { updateLocation } from "../../../Ducks/NewSessionReducer";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";

// Styles
import styles from "./Styles/PermissionButtonsStyles";
import I18n from "../../../I18n/I18n";

class PermissionButtons extends Component {
  propmtPermission = async (permission) => {
    const { navigation, updateLocation, updateOnboarding } = this.props;
    const currentState = await Permissions.check(`${permission}`);
    if (currentState === "undetermined") {
      await Permissions.request(`${permission}`);
    }
    if (permission === "camera" || permission === "microphone") {
      if (currentState === "restricted" || currentState === "denied") {
        Alert.alert(I18n.t("appPermissions"), I18n.t("acceptAllPermissionsCustomer"), [
          { text: I18n.t("ok") },
        ]);
      }
    } else {
      if (permission === "location") {
        updateOnboarding({ completedLocation: true });
        if (Platform.OS === "android") {
          updateOnboarding({ completedNotification: true });
          navigation.dispatch({ type: "Home" });
        } else {
          navigation.dispatch({ type: "Home" });
        }
      }
      if (permission === "notification") {
        updateOnboarding({ completedNotification: true });
        navigation.dispatch({ type: "Home" });
      }
    }
  };

  checkPermission = async () => {
    const { check, navigation, updateOnboarding } = this.props;
    if (check === "Location") {
      await this.propmtPermission("location");
      const checkPermissions = await Permissions.check("location");
      if (checkPermissions === "authorized") {
        updateOnboarding({ completedLocation: true });
        if (Platform.OS === "android") {
          updateOnboarding({ completedNotification: true });
          navigation.dispatch({ type: "Home" });
        } else {
          navigation.dispatch({ type: "Home" });
        }
      }
    }

    if (check === "Notification") {
      await this.propmtPermission("notification");
      const checkPermissions = await Permissions.check("notification");
      if (checkPermissions === "authorized") {
        updateOnboarding({ completedNotification: true });
        navigation.dispatch({ type: "Home" });
      }
    }

    if (check === "CameraMic") {
      await this.propmtPermission("camera");
      await this.propmtPermission("microphone");
      const checkPermissions = await Permissions.checkMultiple(["camera", "microphone"]);
      if (
        checkPermissions.camera === "authorized"
        && checkPermissions.microphone === "authorized"
      ) {
        updateOnboarding({ completedMicAndCamera: true });
        navigation.dispatch({ type: "CustomerView" });
      }
    }
  };

  renderTitle = () => {
    const { check } = this.props;
    if (check === "Location") {
      return I18n.t("customerOnboarding.location.button");
    }

    if (check === "Notification") {
      return I18n.t("customerOnboarding.notification.button");
    }

    if (check === "CameraMic") {
      return I18n.t("customerHome.sessionPermissions.button");
    }
    return null;
  };

  renderSubButton = () => {
    const { check } = this.props;
    if (check != "CameraMic") {
      return I18n.t("customerOnboarding.location.skip");
    }
    return I18n.t("customerHome.sessionPermissions.back");
  };

  pressReturn = () => {
    const { navigation } = this.props;
    if (navigation.state.routeName === "LocationPermissionView") {
      if (Platform.OS === "android") {
        return navigation.dispatch({ type: "Home" });
      }
      return navigation.dispatch({ type: "Home" });
    }

    if (navigation.state.routeName === "NotificationPermissionView") {
      return navigation.dispatch({ type: "Home" });
    }
    return navigation.dispatch({ type: "Home" });
  };

  render() {
    const { navigation, check } = this.props;
    return (
      <View style={[styles.permissionButtonsContainer]}>
        <View style={styles.checkPermissionContainer}>
          <TouchableOpacity
            onPress={() => this.checkPermission()}
            style={styles.checkPermissionButton}
          >
            <Text style={styles.checkPermissionButtonText}>{this.renderTitle()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity onPress={() => this.pressReturn()} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>{this.renderSubButton()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {
  updateLocation,
  updateOnboarding,
};

export default connect(
  mS,
  mD,
)(PermissionButtons);
