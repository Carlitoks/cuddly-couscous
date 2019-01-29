import React from "react";
import {Text, View} from "react-native";

export const Session = (props) => {
  return (
    <View>
      <Text>Session</Text>
      { props.children }
    </View>);
};