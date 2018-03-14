import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 11,
    marginTop: moderateScale(100),
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
    backgroundColor: "rgba(255, 255, 255, 0)" 
  },
  Button: {
    backgroundColor: Colors.primaryLightFillColor,
    width: width,
    alignSelf: "center"
  },
  ButtonDisabled: {
    backgroundColor: Colors.primaryColorDisabled
  },
  forgotPasswordText: {
    color: Colors.gradientColorButton.top,
    fontWeight: "bold",
    textDecorationLine: "underline",
    padding: 10,
    alignSelf: "center"
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
  signInText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  containerInput: {
    marginTop: moderateScale(20)
  }
});
