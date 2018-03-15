import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import RateIcons from "../RateIcons/RateIcons";
import styles from "./styles";
import { Colors, Images } from "../../Themes";

const TextButton = ({ IconName, StateIcon, onPress, title }) => {
  return (
    <TouchableOpacity style={styles.buttonText} onPress={onPress}>
      {/* Icon component with text used in rate experience  */}
      <RateIcons icon={IconName} active={StateIcon} />
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