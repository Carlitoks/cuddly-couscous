import React from "react";
import { Animated, View } from "react-native";
// styles
import styles from "./Styles/SplashScreenStyles";
import { moderateScaleViewports } from "../../../Util/Scaling";

const logo = require("../../../Assets/Images/JeenieLoadingLogo.png");

class SplashScreen extends React.Component {
  state = {
    fadeAnim: new Animated.Value(this.props.animation ? 0 : 1), // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing( // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1500, // Make it take a while
      },
    ).start(); // Starts the animation
  }

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

export default SplashScreen;
