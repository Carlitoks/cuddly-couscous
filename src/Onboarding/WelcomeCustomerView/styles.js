import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.primaryColor
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "85%"
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    marginTop: moderateScale(80),
    textAlign: "center",
    marginBottom: moderateScale(5),
    color: Colors.primaryColor,
    backgroundColor: "transparent"
  },
  appName: {
    fontFamily: Fonts.titleBoldFont,
    fontSize: 60,
    textAlign: "center",
    color: Colors.primaryColor,
    backgroundColor: "transparent"
  },
  subtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(5),
    color: Colors.primaryColor,
    backgroundColor: "transparent"
  },
  firstLetter: {
    fontSize: 70,
    backgroundColor: "transparent"
  },
  mainContainer: {
    flex: 1
  },
  waves: {
    position: "absolute",
    bottom: 80,
    alignSelf: "flex-end"
  },
  wavesOrange: {
    position: "absolute",
    bottom: 56,
    alignSelf: "flex-end"
  },
  getStarted: {
    marginBottom: 40
  }
});
