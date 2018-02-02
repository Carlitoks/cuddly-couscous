import React, { Component } from "react";
import { bool, func, number, object, string } from "prop-types";

import { View, AppState, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import styles from "./styles";

const TileButton = ({
  navigation,
  iconName,
  label,
  iconType = "material-icon",
  onPress
}) => {
  return (
    <View style={styles.tileContainer}>
      <Button
        raised
        textStyle={styles.buttonText}
        borderRadius={10}
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        backgroundColor={Colors.primaryAltFontColor}
        icon={{
          type: iconType,
          name: iconName,
          buttonStyle: styles.someButtonStyle,
          color: Colors.primaryColor,
          size: moderateScale(45)
        }}
        //TODO: Add navigation
        onPress={onPress}
      />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default TileButton;
