import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  nextText: {
    fontFamily: Fonts.BoldFont,
    color: Colors.primaryColor,
    fontSize: 16
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
