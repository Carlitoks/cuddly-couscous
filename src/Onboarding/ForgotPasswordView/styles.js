import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  title: {
    fontSize: 30,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "transparent"
  },
  Button: {
    backgroundColor: Colors.primaryLightFillColor,
    width: width,
    alignSelf: "center"
  },
  buttonText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  linksText: {
    color: Colors.primaryAltFontColor,
    padding: 10,
    alignSelf: "center",
    fontFamily: Fonts.primaryBaseFont,
    backgroundColor: "transparent"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  formInputContainer: {
    marginTop: moderateScale(20)
  },
  checkEmailContainer: {
    marginTop: moderateScale(50)
  },
  checkEmail: {
    fontSize: 18,
    marginLeft: 30
  },
  emailText: {
    color: Colors.black,
    padding: 10,
    alignSelf: "center",
    fontFamily: Fonts.primaryBaseFont
  },
  titleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
