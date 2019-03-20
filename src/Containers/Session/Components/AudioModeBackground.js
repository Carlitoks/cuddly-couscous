import React from "react";
import {Text, View, StyleSheet} from "react-native";

export const AudioModeBackground = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.text }>AUDIO MODE BACKGROUND</Text>
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
    backgroundColor: "#f00",
    paddingTop: "33%",
  },
  text: {
    fontSize: 20,
    color: "#fff"
  }
});
