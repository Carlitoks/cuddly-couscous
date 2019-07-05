import React, { Component } from "react";
import {
  Platform, Text, TouchableOpacity, View, Alert,
} from "react-native";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import { updateLocation } from "../../../Ducks/NewSessionReducer";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";
import{createNewSession} from "../../../Ducks/CurrentSessionReducer";
import { SESSION } from "../../../Util/Constants";

// Styles
import styles from "./Styles/PermissionButtonsStyles";
import I18n, {translateApiError} from "../../../I18n/I18n";
import { displayOpenSettingsAlert } from "../../../Util/Permission";

class PermissionButtons extends Component {
  state = {
    createDisabled: false,
    creating: false
  };
  propmtPermission = async (permission) => {
    const { navigation, updateLocation, updateOnboarding } = this.props;
    const currentState = await Permissions.check(`${permission}`);
    if (currentState === "undetermined" || currentState === "denied") {
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
        const currentState = await Permissions.check(`${permission}`);
        console.tron.log(currentState);
        if (currentState === "granted") {
          updateOnboarding({ completedLocation: true });
          if (Platform.OS === "android") {
            updateOnboarding({ completedNotification: true });
            navigation.dispatch({ type: navigation.state.params.redirectTo });
          } else {
            navigation.dispatch({ type: navigation.state.params.redirectTo });
          }
        }
        if (currentState === "restricted" || currentState === "denied") {
          displayOpenSettingsAlert();
        }
      }
      if (permission === "notification") {
        const currentState = await Permissions.check(`${permission}`);
        if (currentState === "granted") {
          updateOnboarding({ completedNotification: true });
          navigation.dispatch({ type: navigation.state.params.redirectTo });
        }
        if (currentState === "restricted" || currentState === "denied") {
          displayOpenSettingsAlert();
        }
      }
    }
  };

  checkPermission = async () => {
    const { check, navigation, updateOnboarding } = this.props;
    const redirectTo = navigation.state.params ? navigation.state.params.redirectTo : "Home";
    if (check === "Location") {
      await this.propmtPermission("location");
      const checkPermissions = await Permissions.check("location");
      if (checkPermissions === "authorized") {
        updateOnboarding({ completedLocation: true });
        if (Platform.OS === "android") {
          updateOnboarding({ completedNotification: true });
          navigation.dispatch({ type: redirectTo });
        } else {
          navigation.dispatch({ type: redirectTo });
        }
      }
    }

    if (check === "Notification") {
      await this.propmtPermission("notification");
      const checkPermissions = await Permissions.check("notification");
      if (checkPermissions === "authorized") {
        updateOnboarding({ completedNotification: true });
        navigation.dispatch({ type: redirectTo });
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
        this.createCall();
      }
    }
  };

  createCall () {
    if (this.state.createDisabled) {
      return;
    }
    this.setState({createDisabled: true, creating: true}, () => {
      this.props.createNewSession({
        ...this.props.session,
        reason: SESSION.START.NORMAL
      })
        .then(() => {
          this.props.navigation.dispatch({type: "CustomerMatchingView"});
        }).catch((e) => {
        this.setState({createDisabled: false, creating: false});
        console.log("error", e)
        Alert.alert(
          I18n.t('error'),
          translateApiError(e, "session.createSessionFailed"),
          [
            {text: 'OK'},
          ],
        );
      });
    });
  }

  renderTitle = () => {
    const { check } = this.props;
    if (check === "Location") {
      return I18n.t("newCustomerOnboarding.location.button");
    }

    if (check === "Notification") {
      return I18n.t("newCustomerOnboarding.notification.button");
    }

    if (check === "CameraMic") {
      return I18n.t("customerHome.sessionPermissions.button");
    }
    return null;
  };

  renderSubButton = () => {
    const { check } = this.props;
    if (check != "CameraMic") {
      return I18n.t("actions.skip");
    }
    return I18n.t("actions.back");
  };

  pressReturn = () => {
    const { navigation, updateOnboarding } = this.props;
    const redirectTo = navigation.state.params ? navigation.state.params.redirectTo : "Home";
    if (navigation.state.routeName === "LocationPermissionView") {
      if (Platform.OS === "android") {
        updateOnboarding({ completedLocation: true });
        return navigation.dispatch({ type: redirectTo });
      }
      return navigation.dispatch({ type: redirectTo });
    }

    if (navigation.state.routeName === "NotificationPermissionView") {
      updateOnboarding({ completedNotification: true });
      return navigation.dispatch({ type: redirectTo });
    }
    return navigation.dispatch({ type: redirectTo });
  };

  render() {
    const { navigation, check } = this.props;
    return (
      <View style={[styles.permissionButtonsContainer]}>
        <View style={styles.checkPermissionContainer}>
          <TouchableOpacity
            onPress={() => this.checkPermission()}
            style={check === "CameraMic" ? styles.checkPermissionButtonCamera : styles.checkPermissionButton}
            disable={this.state.createDisabled || this.state.creating}
          >
            <Text style={check === "CameraMic" ? styles.checkPermissionButtonTextCamera : styles.checkPermissionButtonText}>{this.renderTitle()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity onPress={() => this.pressReturn()} style={styles.skipButton}>
            <Text style={check === "CameraMic" ? styles.skipButtonTextCamera : styles.skipButtonText}>{this.renderSubButton()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  session: state.newSessionReducer.session,
});

const mD = {
  updateLocation,
  updateOnboarding,
  createNewSession
};

export default connect(
  mS,
  mD,
)(PermissionButtons);
