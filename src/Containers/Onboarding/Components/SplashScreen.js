import React from "react";
import { View } from "react-native";
// styles
import styles from "./Styles/SplashScreenStyles";

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.splashScreenContainer} />
    );
  }
}

export default SplashScreen;
