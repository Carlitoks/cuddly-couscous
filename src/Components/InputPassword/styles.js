import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  viewContainer: {
    width: width
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 15
  }
});
