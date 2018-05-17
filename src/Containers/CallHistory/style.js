import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width
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
    color: Colors.primaryLightFillColor,
    fontSize: 12
  },
  tabStyle: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primaryColor
  },
  containerTab: {
    flex: 1
  },
  tabsContainerStyle: {
    marginLeft: moderateScale(33),
    marginRight: moderateScale(33),
    width: 300,
    alignSelf: "center"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
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
    fontFamily: Fonts.LightFont,
    fontSize: moderateScale(26),
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: "white",
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  }
});
