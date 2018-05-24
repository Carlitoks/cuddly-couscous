import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { TouchableOpacity, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const GoBackButton = ({ navigation, exec }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        if (exec) {
          exec();
        }
        navigation.dispatch({ type: "back" });
        Keyboard.dismiss();
      }}
    >
      {/* Back Arrow - Go back button */}
      <Icon style={styles.Icon} name="chevron-left" size={moderateScale(40)} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
