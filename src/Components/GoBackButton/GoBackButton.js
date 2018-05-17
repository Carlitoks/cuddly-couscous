import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const GoBackButton = ({ navigation, exec }) => {
  return (
    <Col style={styles.container}>
      {/* Back Arrow - Go back button */}
      <Icon
        style={styles.Icon}
        name="chevron-left"
        size={moderateScale(40)}
        onPress={() => {
          if (exec) {
            exec();
          }
          if (navigation.state.routeName == "CustomScenarioView") {
            navigation.dispatch({ type: "Home" });
          } else {
            navigation.dispatch({ type: "back" });
            Keyboard.dismiss();
          }
        }}
      />
    </Col>
  );
};

export default GoBackButton;
