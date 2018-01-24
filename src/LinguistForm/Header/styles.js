import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  headerContainer: {
    height: 180
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  header: {
    borderBottomWidth: 0,
    height: 60
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
    color: "white",
    backgroundColor: "transparent" 
  },
  mainSubtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 18,
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent" 
  }
});
