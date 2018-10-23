import React, { Component } from "react";
import { View, Image, Text, StatusBar } from "react-native";
import styles from "./styles";

import TopViewIOS from "../TopViewIOS/TopViewIOS";

const CallAvatarName = ({ disabledSubscriber, imageSource, sessionInfoName }) =>
  !disabledSubscriber && (
    <View style={styles.avatarNameContainer}>
      <StatusBar hidden={true} />
      <TopViewIOS />
      <View style={styles.avatarContainer}>
        <Image style={styles.smallAvatar} source={imageSource} />
      </View>
      <Text numberOfLines={3} style={styles.callerNameText}>
        {sessionInfoName}
      </Text>
    </View>
  );

export default CallAvatarName;
