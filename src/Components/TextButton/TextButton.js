import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";
import Colors from "../../Themes/Colors";

const TextButton = ({ IconName, StateIcon, onPress, title }) => {
  return (
    <TouchableOpacity style={styles.buttonText} onPress={onPress}>
      {/* Icon component with text used in rate experience  */}
      <Icon
        style={
          StateIcon
            ? { color: Colors.gradientColorButton.middle }
            : { color: Colors.disabledIcons }
        }
        name={IconName}
        size={40}
      />
      <Text
        style={
          StateIcon
            ? {
                color: Colors.gradientColorButton.middle,
                textAlignVertical: "bottom"
              }
            : { color: Colors.disabledIcons }
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;