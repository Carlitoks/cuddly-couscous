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
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    paddingTop: 6,
    paddingBottom: 6
  },
  fillBtn: {
    borderColor: "transparent"
  },
  disabledBtn: {
    borderColor: Colors.disabledColor
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
    //fontFamily: Fonts.primaryBaseFont,
    color: Colors.disabledColor
  },
  white: {
    color: Colors.primaryColor
  },
  transparent: {
    color: "transparent"
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
  spinner: {
    flex: 1,
    position: "absolute"
  },
  transparent: {
    backgroundColor: "transparent"
  }
});
