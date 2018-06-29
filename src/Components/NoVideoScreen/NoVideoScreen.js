import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";

const NoVideoScreen = ({ disabledSubscriber, sessionInfoName, image }) =>
  disabledSubscriber && (
    <View style={styles.noVideoContainer}>
      <Text style={styles.noVideoName}>{sessionInfoName}</Text>

      <View style={styles.noVideoAvatarContainer}>
        <Image style={styles.noVideoAvatar} source={image} />
      </View>
    </View>
  );

export default NoVideoScreen;
