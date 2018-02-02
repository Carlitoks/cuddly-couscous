import React, { Component } from "react";

import { View } from "react-native";
import { Button } from "react-native-elements";

import styles from "./styles";

const BottomButton = ({ title, onPress }) => {
  return (
    <View style={styles.containerBottom}>
      <Button
        buttonStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        title={title}
        onPress={onPress}
      />
    </View>
  );
};

export default BottomButton;
