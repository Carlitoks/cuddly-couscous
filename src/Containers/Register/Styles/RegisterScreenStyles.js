import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale, scaledFontSize } from "../../../Util/Scaling";

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
    fontSize: scaledFontSize(18)
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: Metrics.height * 0.91,
    alignItems: "center"
  },
  inputContainer: { width: Metrics.width * 0.85, paddingTop: 50 },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  buttonWidthContainer: {
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  signInButtonDisable: {
    width: Metrics.width * 0.78,
    height: Metrics.width * 0.15,
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
    fontSize: scaledFontSize(17)
  },
  registerAdviseText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: scaledFontSize(15),
    textAlign: "center",
    paddingBottom: 20
  },
  termsAndConditionsText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: scaledFontSize(12),
    textAlign: "center",
    paddingTop: 20
  },
  createAccountPadding: { paddingTop: 20, width: Metrics.width },
  registerButton: {
    width: Metrics.width * 0.78,
    height: Metrics.width * 0.15,
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
    fontSize: scaledFontSize(13),
    fontWeight: "400",
    color: "#FFFFFF",
    paddingLeft: 5
  },
  inputsErrorContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: android ? -10 : 0
  },
  errorIconContainer: {
    position: "relative",
    left: -20,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 50,
    height: Metrics.width * 0.06,
    width: Metrics.width * 0.06,
    justifyContent: "center",
    alignItems: "center"
  }
});
