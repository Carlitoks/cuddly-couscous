import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  nextText: {
    color: Colors.primaryColor,
    fontSize: 17,
    fontWeight: "bold"
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
