import React, { Component } from "react";
import EN from "../../I18n/en";
import { View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const NextButton = ({ navigation }) => {
  return (
    <Col style={styles.container}>
      {/* Next Button */}
      <Text
        style={styles.nextText}
        onPress={() => navigation.dispatch({ type: "Home" })}
      >
        {EN["Next"]}
      </Text>
    </Col>
  );
};

export default NextButton;
