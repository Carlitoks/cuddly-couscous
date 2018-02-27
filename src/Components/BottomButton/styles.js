import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
    borderRadius: 50
  },
  buttonContainer: {
    width: width * 0.5 - 3,
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center"
  },
  text: {
    color: Colors.gradientColorButton.top
  },
  textBold: {
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.gradientColorButton.top
  },
  textDisabled: {
    color: Colors.disabledColor
  },
  white: {
    color: Colors.primaryColor
  },
  linearGradient: {
    width: width * 0.5,
    paddingRight: 3,
    paddingLeft: 3,
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  long: {
    width: width * 0.7
  },
  bottom: {
    paddingBottom: 0
  },
  relative: {
    position: "relative"
  }
});
