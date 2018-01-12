import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const SettingButton = ({ navigation }) => {
  return (
    <Col style={styles.container}>
      {/* Setting Button */}
      <Icon
        style={styles.Icon}
        name="settings"
        size={moderateScale(30)}
        onPress={() => navigation.dispatch({ type: "CallSettingsCustomer" })} 
      />
    </Col>
  );
};

export default SettingButton;
