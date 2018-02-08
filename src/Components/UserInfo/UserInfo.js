import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

import styles from "./styles";

const UserInfo = ({ text, rating }) => {
  return (
    <View style={styles.containerText}>
      {/* Component used for call history  */}

      <Text style={styles.userName}>{text}.</Text>
      <Text style={styles.iconStyle}>
        {rating ? <Icon name="ios-star" size={18} /> : ""}
      </Text>
      <Text style={styles.iconStyle}>{rating}</Text>
    </View>
  );
};

export default UserInfo;
