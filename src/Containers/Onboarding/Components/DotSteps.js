import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import Permission from "react-native-permissions";

// Styles
import styles from "./Styles/DotStepsStyles";

class DotSteps extends Component {
  state = {
    hasLocation: true,
    hasNotification: true,
  };

  componentWillMount() {
    Permission.check("location").then((permission) => {
      if (permission === "undetermined") {
        this.setState({ hasLocation: false });
      }
    });
    if (Platform.OS === "android") {
      this.setState({ hasNotification: true });
    } else {
      Permission.check("notification").then((permission) => {
        if (permission === "undetermined") {
          this.setState({ hasNotification: false });
        }
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { hasLocation, hasNotification } = this.state;
    return (
      <View style={styles.callButtonContainer}>
        {(
          (!hasLocation || !hasNotification)
          && <View style={navigation.state.routeName === "IntroView" ? styles.currentStep : styles.otherStep} />)}
        {(!hasLocation && <View style={navigation.state.routeName === "LocationPermissionView" ? styles.currentStep : styles.otherStep} />)}
        { !hasNotification && <View style={navigation.state.routeName === "NotificationPermissionView" ? styles.currentStep : styles.otherStep} />}
      </View>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD,
)(DotSteps);
