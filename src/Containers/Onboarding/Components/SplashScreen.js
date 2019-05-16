import React from "react";
import { View, Image, TextInput, Text, Platform, Animated } from "react-native";

//styles
import styles from "./Styles/SplashScreenStyles";
import metrics from "../../../Themes/Metrics";

const logo = require("../../../Assets/Images/JeenieLoadingLogo.png");

class SplashScreen extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1500,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <View style={styles.splashScreenContainer}>
        <Animated.Image resizeMethod={"resize"} style={{opacity: fadeAnim, width: metrics.width * 0.70, height: metrics.height * 0.50, resizeMode: "contain"}} source={logo} />
      </View>);
  }
};

export default SplashScreen;
