import React from "react";
import {Text, View, StyleSheet} from "react-native";

export const AudioModeBackground = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.text }>AUDIO MODE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: "100%",
    backgroundColor: "#3a3"
  },
  text: {
    fontSize: 20,
    color: "#fff"
  }
});
