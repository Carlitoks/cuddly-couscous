import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const SettingButton = ({ navigation }) => {
  return (
    <Col style={styles.container}>
      {/* Setting Button */}
      <Icon
        style={styles.Icon}
        name="settings"
        size={30}
        onPress={() => navigation.dispatch({ type: "back" })}
      />
    </Col>
  );
};

export default SettingButton;
