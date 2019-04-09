import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { moderateScale, moderateFontSize } from "../../../Util/Scaling";
import images from "../../../Themes/Images";
import { isIphoneXorAbove } from "../../../Util/Devices";

export const SessionHeader = ({user}) => {
  return (
    <View style = { styles.container }>
      <View style={styles.avatarImageContainer}>
        <Image style={styles.avatarImage} source={!!user.avatarURL ? {uri: user.avatarURL} : images.avatar} />
      </View>
      <View style={styles.textContainer}>
        <Text style = { styles.text }>{user.firstName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    padding: 15,
    paddingTop: isIphoneXorAbove() ? 45 : 15,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    flexDirection: 'row',
    alignItems: "center"
  },
  avatarImageContainer: {
    marginRight: 20
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "gray"
  },
  textContainer: {},
  text: {
    fontSize: moderateFontSize(20),
    color: "#fff"
  }
});
