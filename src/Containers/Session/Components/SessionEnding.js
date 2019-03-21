import React from "react";
import {Text, View, StyleSheet} from "react-native";

export const SessionEnding = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.text }></Text>
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
    paddingTop: "33%",
    backgroundColor: "#5d4cb6",
    zIndex: 9999999,
  }
});
