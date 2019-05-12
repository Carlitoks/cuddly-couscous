import React from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";

export const SessionEnding = (props) => {
  return (
    <View style = { styles.container }>
      <ActivityIndicator
        size="large"
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    paddingTop: "33%",
    backgroundColor: "#5d4cb6",
    zIndex: 9999999,
  }
});
