import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import colors from "../../../Themes/Colors";
import images from "../../../Themes/Images";


export const AudioModeBackground = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatarImage} source={!!user.avatarURL ? user.avatarURL : images.avatar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.backgroundBlue,
    paddingTop: "40%",
    alignItems: "center"
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.white,
    backgroundColor: colors.transparent,
    paddingHorizontal: 25,
    paddingVertical: 25
  },
  avatarImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "gray"
  }
});
