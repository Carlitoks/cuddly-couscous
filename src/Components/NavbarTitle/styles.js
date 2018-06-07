import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  titleStyle: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500",
    height: 22,
    width: "100%"
  },
  titleWithLeft: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    marginLeft: -30,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500",
    height: 22
  },
  titleComplete: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    marginLeft: 4,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500",
    height: 22,
    width: "100%"
  }
});
