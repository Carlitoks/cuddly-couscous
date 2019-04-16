import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: height,
    backgroundColor: Colors.primaryColor
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(5),
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent
  },
  mainContainer: {
    flex: 1
  },
  logo: {
    borderColor: Colors.primaryAltFontColor,
    marginTop: verticalScale(120),
    position: "relative"
  },
  logoImage: {
    width: 200,
    height: 80,
    resizeMode: "contain"
  },
  center: {
    alignSelf: "center"
  },
  loading: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.transparent
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primaryColor,
    alignSelf: "center",
    backgroundColor: Colors.transparent
  }
});
