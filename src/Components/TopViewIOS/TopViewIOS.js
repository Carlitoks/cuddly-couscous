import React from "react";
import { View } from "react-native";
import DeviceInfo from "react-native-device-info"
import { bool } from "prop-types";
import styles from "./styles";

const TopViewIOS = (props) => {
  const IphoneX = DeviceInfo.getModel() == "iPhone X";
  return (
    <View>
    {!IphoneX && <View style={styles.topView}/>}
    {IphoneX && <View style={styles.topViewLarge}/>}
    </View>
  );
};


TopViewIOS.propTypes = {
  large: bool
};

TopViewIOS.defaultProps = {
  large: false,
  
};

export default TopViewIOS;
