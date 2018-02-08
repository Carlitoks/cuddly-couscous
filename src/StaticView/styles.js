import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../Themes";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.primaryBoldFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  contentScrollContainer: { flexGrow: 1 }
});
