import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 22,
    paddingTop: 22
  },
  buttonContainer: {
    width: width * 0.5,
    borderColor: Colors.gradientColorButton.top,
    borderRadius: 50,
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8
  },
  whiteBorder: {
    borderWidth: 0.8
  },
  normalBorder: {
    borderWidth: 2
  },
  fillBtn: {
    borderColor: "transparent"
  },
  disabledBtn: {
    borderColor: Colors.disabledColor
  },
  disabledWhiteBtn: {
    borderColor: Colors.white
  },
  enabledBtn: {
    backgroundColor: Colors.gradientColorButton.top,
    borderColor: Colors.white
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primaryBaseFont,
    color: Colors.gradientColorButton.top
  },
  textBold: {
    fontSize: 16,
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.gradientColorButton.top
  },
  textDisabled: {
    fontSize: 16,
    color: Colors.disabledColor
  },
  textWhiteDisabled: {
    fontSize: 16,
    color: Colors.white
  },
  white: {
    color: Colors.primaryColor
  },
  whiteBackground: {
    backgroundColor: Colors.primaryColor
  },
  transparent: {
    color: "transparent"
  },
  transparentBackground: {
    backgroundColor: "transparent"
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
    width: width * 0.75
  },
  bottom: {
    paddingBottom: 0,
    paddingTop: 0
  },
  negative: {
    borderWidth: 0
  },
  negativeContainer: {
    paddingBottom: 22
  },
  relative: {
    position: "relative"
  },
  absolute: {
    position: "absolute",
    bottom: 0
  },
  spinner: {
    flex: 1,
    position: "absolute"
  },
  transparent: {
    backgroundColor: "transparent"
  },
  linearGradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  spaceBottom: {
    marginBottom: 15
  }
});
