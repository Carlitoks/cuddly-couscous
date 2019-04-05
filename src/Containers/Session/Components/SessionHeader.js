import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { moderateScale } from "../../../Util/Scaling";
import images from "../../../Themes/Images";

export const SessionHeader = ({user}) => {
  return (
    <View style = { styles.container }>
      <Image style={styles.avatarImage} source={!!user.avatarURL ? {uri: user.avatarURL} : {uri: images.avatar}} />
      <Text style = { styles.text }>{user.firstName}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    flexDirection: 'row',
    alignItems: "center"
  },
  avatarImage: {
    height: 40,
    width: 40,
    marginRight: 20,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "gray"
  },
  text: {
    fontSize: moderateScale(20, 0),
    color: "#fff"
  }
});
