import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";
import { Iphone5, Iphone10 } from "../../Util/Devices";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparent
  },
  buttonContainer: {
    height: 70,
    width: width * 0.7,
    borderColor: Colors.gradientColorButton.top,
    borderRadius: 50,
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "blue"
  },
  whiteBorder: {
    borderWidth: 0.8
  },
  normalBorder: {
    borderWidth: 2
  },
  fillBtn: {
    borderColor: Colors.transparent
  },
  disabledBtn: {
    borderColor: Colors.disabledColor
  },
  disabledWhiteBtn: {
    borderColor: Colors.white
  },
  enabledBtn: {
    backgroundColor: Colors.gradientColorButton.bottom,
    borderColor: Colors.white
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.BoldFont,
    color: Colors.gradientColorButton.top
  },
  textBold: {
    fontSize: 20,
    fontFamily: Fonts.BoldFont,
    color: Colors.gradientColorButton.top
  },
  textDisabled: {
    fontSize: 20,
    color: Colors.disabledColor
  },
  textWhiteDisabled: {
    fontSize: 20,
    color: Colors.white
  },
  white: {
    color: Colors.primaryColor
  },
  whiteBackground: {
    backgroundColor: Colors.primaryColor
  },
  transparent: {
    color: Colors.transparent
  },
  transparentBackground: {
    backgroundColor: Colors.transparent
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
    position: "absolute",
    bottom: Iphone10 || Iphone5 ? 14 : 14
  },
  transparent: {
    backgroundColor: Colors.transparent
  },
  linearGradientBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%"
  },
  bottomSeparation: {
    paddingBottom: 40
  }
});
