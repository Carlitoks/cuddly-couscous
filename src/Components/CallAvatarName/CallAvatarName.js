import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";

import TopViewIOS from "../TopViewIOS/TopViewIOS";

const CallAvatarName = ({ imageSource, sessionInfoName }) => {
  return (
    <View style={styles.avatarNameContainer}>
      <TopViewIOS />
      <View style={styles.avatarContainer}>
        <Image style={styles.smallAvatar} source={imageSource} />
      </View>
      <Text style={styles.callerNameText}>{sessionInfoName}</Text>
    </View>
  );
};

export default CallAvatarName;
