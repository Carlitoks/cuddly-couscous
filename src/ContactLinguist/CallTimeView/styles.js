import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  selectedBackground: {
    backgroundColor: Colors.lightPurple
  },
  selectedText: {
    fontFamily: Fonts.primaryBoldFont,
    fontWeight: "bold",
    color: Colors.gradientColor.bottom
  },
  buttonText: {
    color: Colors.black
  },
  buttonTextSubtitle: {
    fontSize: 12,
    fontStyle: "italic"
  },
  mainTitle: {
    fontSize: 24,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  smallFont: {
    fontSize: 16
  },
  crossLineText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  paddingContainer: {
    marginLeft: moderateScale(40),
    paddingRight: moderateScale(40)
  },
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  icon: {
    display: "none",
    position: "absolute",
    right: 0,
    top: "5%",
    marginLeft: moderateScale(40),
    zIndex: 0
  },
  iconSelected: {
    position: "absolute",
    right: 0,
    top: "5%",
    marginLeft: moderateScale(40),
    zIndex: 0,
    backgroundColor: "transparent",
    color: Colors.gradientColor.bottom
  },
  regText: {
    padding: 3,
    fontFamily: Fonts.primaryBaseFont,
    fontSize: 16
  },
  headerButtonCancel: {
    fontSize: moderateScale(20),
    color: Colors.primaryColor
  },
  titleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: moderateScale(24),
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  subTitleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: moderateScale(20),
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  bottomText: {
    fontSize: moderateScale(20),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  listContainer: {
    marginTop: 0
  },
  bottom: {
    marginTop: 30
  }
});
