import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const TextButton = ({ IconName, StateIcon, onPress, title, color, size }) => {
  return (
    <TouchableOpacity style={styles.buttonText} onPress={onPress}>
      {/* Icon component with text used in rate experience  */}
      <Icon
        style={StateIcon ? { color: color } : { color: "#cdcdcd" }}
        name={IconName}
        size={ size || 60 }
      />
      <Text
        style={
          StateIcon
            ? { color: color, textAlignVertical: "bottom" }
            : { color: "#cdcdcd" }
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
