import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Images } from "../../Themes";
import {QR} from "../../Assets/SVG";

import styles from "./styles";

const QRIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.dispatch({ type: "ScanScreenView" })}
    >
      <View style={styles.buttonGrid}>
        <QR width={20} height={20} />
      </View>
    </TouchableOpacity>
  );
};

export default QRIcon;
