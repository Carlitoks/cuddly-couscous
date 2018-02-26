import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const GoBackButton = ({ navigation }) => {
  return (
    <Col style={styles.container}>
      {/* Back Arrow - Go back button */}
      <Icon
        style={styles.Icon}
        name="chevron-left"
        size={moderateScale(40)}
        onPress={() => navigation.dispatch({ type: "back" })}
      />
    </Col>
  );
};

export default GoBackButton;
