import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  viewContainer: {
    width: Dimensions.get("window").width
  },
  icon: {
    position: "absolute",
    top: 33,
    right: 0
  }
});
