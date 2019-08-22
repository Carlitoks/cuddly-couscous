import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, moderateScaleViewports, scale, verticalScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    paddingTop: 16,
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
    color: Colors.primaryColor
  },
  tabTextStyle: {
    fontFamily: Fonts.BaseFont,
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: moderateScaleViewports(17)
  },
  tabBackgroundContainer: {
    width: "100%",
    paddingBottom: 8,
    backgroundColor: Colors.gradientColor.top
  },
  tabStyle: {
    backgroundColor: Colors.gradientColor.top,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  containerTab: {
    flex: 1
  },
  tabsContainerStyle: {
    marginLeft: moderateScale(33),
    marginRight: moderateScale(33),
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.gradientColor.top
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  onlyTitle: {
    fontSize: 26,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.LightFont,
    backgroundColor: Colors.transparent
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 26,
    color: Colors.primaryColor,
    marginTop: moderateScale(10),
    textAlign: "center",
    backgroundColor: Colors.transparent
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
  activeTabStyle: {
    borderColor: "transparent",
    borderLeftWidth: 0,
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomWidth: 5,
    borderBottomColor: "#ffffff",
    backgroundColor: Colors.gradientColor.top,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(10)
  }
});
