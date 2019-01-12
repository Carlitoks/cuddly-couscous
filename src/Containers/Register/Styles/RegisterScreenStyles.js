import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale, scaledFontSize } from "../../../Util/Scaling";
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
    borderBottomColor: "#fff",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 16 : moderateScale(18, 0)
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: Metrics.height * 0.91,
    alignItems: "center"
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
  signInButtonDisable: {
    minWidth: Metrics.width * 0.78,
    minHeight: iPhoneXModels ? 55 : Metrics.height * 0.08,
    backgroundColor: Colors.transparent,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonEnabledText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 14 : moderateScale(17, 0)
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
    textAlign: "center",
    paddingBottom: 20
  },
  termsAndConditionsText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 10 : moderateScale(12, 0),
    textAlign: "center"
  },
  createAccountPadding: { paddingTop: 20, width: Metrics.width },
  registerButton: {
    minWidth: Metrics.width * 0.78,
    minHeight: iPhoneXModels ? 55 : Metrics.height * 0.08,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  inputViewContainer: {
    flexDirection: "column",
    paddingTop: 10
  },
  labelText: {
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(13, 0),
    fontWeight: "400",
    color: "#FFFFFF",
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
    marginTop: 25,
    flexDirection: "row",
    width: "100%",
    zIndex: 1000000000,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 15,
    flexWrap: 'wrap'
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
