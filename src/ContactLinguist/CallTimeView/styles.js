import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  selectedBackground: {
    backgroundColor: Colors.lightPurple
  },
  selectedText: {
    fontFamily: Fonts.BoldFont,
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
    fontFamily: Fonts.LightFont,
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
    backgroundColor: Colors.white
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
    backgroundColor: Colors.transparent,
    color: Colors.gradientColor.bottom
  },
  regText: {
    padding: 3,
    fontFamily: Fonts.BaseFont,
    fontSize: 16
  },
  titleCall: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  },
  subTitleCall: {
    fontFamily: Fonts.LightFont,
    fontSize: moderateScale(16),
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  bottomText: {
    color: Colors.primaryColor,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: Fonts.LightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  listContainer: {
    marginTop: 0
  },
  bottom: {
    marginTop: 15
  },
  box: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: 150
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.gradientColor.top,
    textAlign: "center",
    fontFamily: Fonts.BaseFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  marginTop19: { marginTop: 19 },
  marginTop14: { marginTop: 14 },
  boxPricing: {
    marginTop: 14,
    fontSize: 18
  },
  iconSize: {
    fontSize: 28
  }
});
