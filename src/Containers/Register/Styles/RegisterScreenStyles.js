import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../../../Util/Devices";

const android = Platform.OS === "android";
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  inputText: {
    width: Metrics.width * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: "#303033",
    color: "#000000",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 16 : moderateScale(18, 0)
  },
  registerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  },
  inputContainer: { width: Metrics.width * 0.85, paddingTop: 10 },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20
  },
  buttonWidthContainer: {
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonEnabledText: {
    textAlign: "center",
    //color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05
  },
  transitionButtonText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    padding: Metrics.width * 0.02
  },
  registerAdviseText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 14 : moderateScale(15, 0),
    paddingBottom: 20
  },
  termsAndConditionsText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 10 : moderateScale(12, 0)
  },
  termsAndConditionsTextLink: {
    textAlign: "center",
    color: "#fff",
    fontSize: Iphone5 ? 10 : moderateScale(12, 0),
    fontFamily: Fonts.BoldFont,
    textDecorationLine: "underline",
    lineHeight: 20
  },
  createAccountPadding: { paddingTop: 24, width: Metrics.width },
  registerButton: {
    minWidth: Metrics.width * 0.78,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  signInButtonDisable: {
    minWidth: Metrics.width * 0.78,
    backgroundColor: Colors.transparent,
    borderColor: "#303033",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  inputViewContainer: {
    flexDirection: "column",
    paddingTop: 10
  },
  labelText: {
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(13, 0),
    fontWeight: "400",
    color: "#401674",
    paddingLeft: 3
  },
  inputsErrorContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: android ? -10 : 0
  },
  errorIconContainer: {
    position: "relative",
    left: -30,
    backgroundColor: "red",
    borderWidth: android ? 1 : 1.5,
    borderColor: "#fff",
    borderRadius: 50,
    height: Metrics.width * 0.06,
    width: Metrics.width * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: android ? 1 : 30
  },
  termsAndConditionsViewContainer: {
    marginBottom: 15,
    flexDirection: "row",
    width: "100%",
    zIndex: 1000000000,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 15,
    flexWrap: "wrap"
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  height: { height: "100%" },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "#333333",
    fontSize: moderateScale(20, 0),
    textAlign: "center",
    paddingTop: moderateScale(20, 0),
    paddingBottom: moderateScale(20, 0)
  },
  topLogoContainer: {
    marginTop: moderateScale(30),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
