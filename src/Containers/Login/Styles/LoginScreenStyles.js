import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale, setTextProperties } from "../../../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../../../Util/Devices";

const activeButtonStyles = {
  minWidth: Metrics.width * 0.78,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 30,
  borderColor: "#fff"
};

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
    color: "#000",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 16 : moderateScale(18, 0)
  },
  loginContainer: {
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
  signInButtonEnabled: {
    ...activeButtonStyles,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  signInButtonDisable: {
    ...activeButtonStyles,
    borderColor: "#C4C4C4",
    backgroundColor: Colors.transparent
  },
  buttonEnabledText: {
    ...setTextProperties("#C4C4C4", Fonts.BoldFont, Iphone5 ? 14 : moderateScale(17, 0), null),
    textAlign: "center",
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05
  },
  transitionButtonText: {
    ...setTextProperties("#401674", Fonts.BoldFont, Iphone5 ? 14 : moderateScale(17, 0), null),
    textAlign: "center"
  },
  createAccountPadding: { paddingTop: 24, width: Metrics.width },
  inputViewContainer: { flexDirection: "column", paddingTop: 10 },
  labelStyle: {
    ...setTextProperties("#fff", Fonts.ItalicFont, moderateScale(13, 0), "400"),
    paddingLeft: 3
  },
  inputInternalContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: android ? -10 : 0
  },
  errorIconContainer: {
    position: "relative",
    left: -20,
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
  forgotPasswordLabel: {
    ...setTextProperties("#fff", Fonts.ItalicFont, moderateScale(14, 0), "400"),
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "right",
    paddingTop: 10
  },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "black",
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
  },
  fullHeight: { height: "100%" }
});
