import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Images } from "../../Themes";

import styles from "./styles";

const QRIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.dispatch({ type: "ScanScreenView" })}
    >
      <View style={styles.buttonGrid}>
        <Image style={styles.scanQRImage} source={Images.scan_qr_code} />
      </View>
    </TouchableOpacity>
  );
};

export default QRIcon;
