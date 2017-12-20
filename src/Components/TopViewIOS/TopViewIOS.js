import React from "react";
import { View } from "react-native";

import { bool } from "prop-types";
import styles from "./styles";

const TopViewIOS = (props) => {
  return (
    <View>
    {!props.large && <View style={styles.topView}/>}
    {props.large && <View style={styles.topViewLarge}/>}
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
