import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

const NextButton = ({ navigation, onPressButton }) => {
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
        {I18n.t("next")}
      </Text>
    </Col>
  );
};

export default NextButton;