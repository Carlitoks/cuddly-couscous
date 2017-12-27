import React, { Component } from "react";
import EN from "../../I18n/en";
import { View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const NextButton = ({ navigation, onPressButton }) => {
  console.log(this.props);
  return (
    <Col style={styles.container}>
      {/* Next Button */}
      <Text
        style={styles.nextText}
        onPress={() => {
          onPressButton
            ? onPressButton()
            : navigation.dispatch({ type: "Home" });
        }}
      >
        {EN["Next"]}
      </Text>
    </Col>
  );
};

export default NextButton;
