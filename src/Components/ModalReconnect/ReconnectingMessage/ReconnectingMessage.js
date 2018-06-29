import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../../Themes";

const ReconnectingMessage = ({ message }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.connectingMessageContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.selectedOptionMenu}
          style={styles.modalSpinner}
        />
        <Text style={styles.connectingMessage}>{message}</Text>
      </View>
    </View>
  );
};

export default ReconnectingMessage;
