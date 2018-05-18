import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../Themes";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: Colors.primaryColor,
    fontFamily: Fonts.BoldFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  contentScrollContainer: { flexGrow: 1 },
  outerContainerStyles: {
    borderBottomWidth: 0,
    height: 70,
    paddingBottom: 30,
    paddingTop: 20
  },
  headerContainer: { height: 85, backgroundColor: Colors.gradientColor.top }
});
