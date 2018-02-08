import React, { Component } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import { Images } from "../../Themes";

const TileButton = ({
  navigation,
  iconName,
  label,
  iconType = "material-icon",
  onPress
}) => {
  return (
    <View style={styles.tileContainer}>
      <TouchableOpacity style={[styles.buttonStyle]} onPress={onPress}>
        <Image style={styles.backgroundImage} source={Images[iconName]} />
      </TouchableOpacity>

      {/* <Text style={styles.title}>{label}</Text> */}
    </View>
  );
};

export default TileButton;
