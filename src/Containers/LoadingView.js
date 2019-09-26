import React from "react";
import { Image, Platform, View } from "react-native";
// styles
import { connect } from "react-redux";
import Permission from "react-native-permissions";
import styles from "./Styles/LoadingViewStyles";
import { moderateScaleViewports } from "../Util/Scaling";

const logo = require("../Assets/Images/JeenieLoadingLogo.png");

class LoadingView extends React.Component {
  componentDidMount() {
    const {
      auth2, onboardingReducer, account, navigation,
    } = this.props;
    const { completedLocation, completedNotification } = onboardingReducer;
    if (auth2.isLoggedIn && auth2.userJwtToken) {
      // extra check to ensure we have a user, because if not
      // we should just stay on this screen
      if (!account.user) {
        return navigation.dispatch({ type: "IntroView" });
      }

      if (completedLocation) {
        if (completedNotification) {
          return navigation.dispatch({ type: "Home" });
        }
        if (Platform.OS === "android") {
          return navigation.dispatch({ type: "Home" });
        }
        Permission.check("notification").then((permission) => {
          if (permission === "undetermined") {
            return navigation.dispatch({ type: "Home" });
          }
          return navigation.dispatch({ type: "Home" });
        });
      } else {
        return navigation.dispatch({ type: "Home" });
      }
    } else {
      return navigation.dispatch({ type: "IntroView" });
    }
    return null;
  }

  render() {
    return (
      <View style={styles.splashScreenContainer}>
        <Image
          resizeMethod="resize"
          style={{
            width: moderateScaleViewports(270), height: moderateScaleViewports(207), resizeMode: "contain",
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
