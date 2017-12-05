/* BORRAR, VISTAS DE EJEMPLO */

import React from "react";
import { View, Text, Button } from "react-native";

import { StyleSheet, Dimensions } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

styles = StyleSheet.create({
  Button: {
    borderRadius: 25,
    width: 250
  }
});

const MainView = props => {
  const navigate = props.navigation.navigate;

  return (
    <View>
      <RkButton
        style={styles.Button}
        onPress={() => navigate("Profile", { name: "Jane" })}
      >
        Login
      </RkButton>
    </View>
  );
};

export default MainView;
