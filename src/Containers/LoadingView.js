import React from "react";
import { Animated, Platform, View } from "react-native";
// styles
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import styles from "./Styles/LoadingViewStyles";
import { moderateScaleViewports } from "../Util/Scaling";

const logo = require("../Assets/Images/JeenieLoadingLogo.png");

class LoadingView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(this.props.animation ? 0 : 1), // Initial value for opacity: 0
  };

  constructor(props) {
    super(props);
    const {
      auth2, onboardingReducer, account
    } = this.props;
    const { completedLocation, completedNotification } = onboardingReducer;
    if (auth2.isLoggedIn && auth2.userJwtToken) {
      // extra check to ensure we have a user, because if not
      // we should just stay on this screen
      if (!account.user) {
        return this.navigateWithDelay("IntroView");
      }

      if (completedLocation) {
        if (completedNotification) {
          return this.navigateWithDelay("Home");
        }
        if (Platform.OS === "android") {
          return this.navigateWithDelay("Home");
        }
        Permission.check("notification").then((permission) => {
          if (permission === "undetermined") {
            return this.navigateWithDelay("Home");
          }
          return this.navigateWithDelay("Home");
        });
      } else {
        Permission.check("location").then((permission) => {
          if (permission === "undetermined") {
            return this.navigateWithDelay("LocationPermissionView");
          }
          return this.navigateWithDelay("Home");
        });
      }
    } else {
      return this.navigateWithDelay("IntroView");
    }
  }

  componentDidMount() {
    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1500, // Make it take a while
      },
    ).start(); // Starts the animation
  }

  navigateWithDelay = (routeName) => {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.dispatch({ type: routeName });
    }, 1500);
  };

  render() {
    const { fadeAnim } = this.state;
    return (
      <View style={styles.splashScreenContainer}>
        <Animated.Image
          resizeMethod="resize"
          style={{
            opacity: fadeAnim, width: moderateScaleViewports(270), height: moderateScaleViewports(207), resizeMode: "contain",
          }}
          source={logo}
        />
      </View>
    );
  }
}

const mS = state => ({
  auth2: state.auth2,
  appState: state.appState,
  onboardingReducer: state.onboardingReducer,
  account: state.account,
  newSessionReducer: state.newSessionReducer,
});

export default connect(mS, null)(LoadingView);
