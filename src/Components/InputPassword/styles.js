import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  viewContainer: {
    width: Dimensions.get("window").width
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 15
  }
});
