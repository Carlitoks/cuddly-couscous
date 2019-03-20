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
    height: 40,
    width: "100%",
    backgroundColor: "#33a"
  },
  text: {
    fontSize: 15,
    color: "#fff"
  }
});
