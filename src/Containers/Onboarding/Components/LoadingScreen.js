import React from "react";
import { View, Image, TextInput, Text, Platform } from "react-native";

//styles
import styles from "./Styles/LoadingScreenStyles";
const loadingLogo = require("../../../Assets/Images/Jlock_col_rev_onpur.png");

const LoadingScreen = props => {
  return (
    <View style={styles.loadingScreenContainer}>
      <View style={styles.imageContainer}>
        <Image resizeMode="contain" source={loadingLogo} />
      </View>
    </View>
  );
};

export default LoadingScreen;
