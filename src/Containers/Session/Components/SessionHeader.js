import React from "react";
import {Text, View, StyleSheet} from "react-native";

export const SessionHeader = (props) => {
  return (
    <View style = { styles.container }>
      <Text style = { styles.text }>{props.user.firstName}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.33)"
  },
  text: {
    fontSize: 20,
    color: "#fff"
  }
});
