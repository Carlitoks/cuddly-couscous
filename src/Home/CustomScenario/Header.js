import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text } from "react-native";
import { Header as NativeHeader } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Colors } from "../../Themes";

const Header = ({ leftComponent, rightComponent, mainTitle }) => {
  return (
    <View>
      {/* Linear Gradient */}
      <LinearGradient
        colors={[
          Colors.gradientColor.top,
          Colors.gradientColor.middle,
          Colors.gradientColor.bottom
        ]}
        style={styles.linearGradient}
      />
      {/* Header - Navigation */}
      <TopViewIOS/> 
      <NativeHeader
        outerContainerStyles={styles.header}
        backgroundColor="transparent"
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      <View style={styles.userContainer}>
        <Text style={styles.title}>{mainTitle}</Text>
      </View>
    </View>
  );
};

export default Header;
