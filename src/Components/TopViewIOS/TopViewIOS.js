import React from "react";
import { View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { bool } from "prop-types";
import styles from "./styles";

const TopViewIOS = props => {
  const IphoneX = DeviceInfo.getModel() == "iPhone X";
  return (
    <View>
      {!IphoneX && (
        <View style={[styles.topView, !!props.scanQR ? styles.scanQR : null]} />
      )}
      {IphoneX && (
        <View
          style={[styles.topViewLarge, !!props.scanQR ? styles.scanQR : null]}
        />
      )}
    </View>
  );
};

TopViewIOS.propTypes = {
  large: bool,
  scanQR: bool
};

TopViewIOS.defaultProps = {
  large: false,
  scanQR: false
};

export default TopViewIOS;
