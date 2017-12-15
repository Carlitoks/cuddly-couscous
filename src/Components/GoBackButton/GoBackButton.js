import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const GoBackButton = ({ navigation }) => {
  return (
    <Col>
      {/* Back Arrow - Go back button */}
      <Icon
        style={styles.Icon}
        name="arrow-back"
        size={30}
        onPress={() => navigation.dispatch({ type: "back" })}
      />
    </Col>
  );
};

export default GoBackButton;
