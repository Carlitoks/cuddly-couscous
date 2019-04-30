import { StyleSheet, Platform } from "react-native";
import {
  Metrics, ApplicationStyles, Fonts, Colors,
} from "../../../Themes";
import { moderateScale, setTextProperties, moderateScaleViewports } from "../../../Util/Scaling";

const activeButtonStyles = {
  minWidth: Metrics.width * 0.78,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 30,
  borderColor: "#fff",
};

const defaultInput = {
  flex: 0.9,
  borderBottomWidth: 1,
  color: "rgba(0, 0, 0, 0.54)",
  fontFamily: Fonts.BaseFont,
  fontSize: moderateScaleViewports(16),
  paddingBottom: moderateScaleViewports(5),
};

const android = Platform.OS === "android";
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  inputText: {
    width: Metrics.width * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    color: "#000000",
    fontFamily: Fonts.BoldFont,
    fontSize: Metrics.height <= 568 ? 16 : moderateScale(18, 0),
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  signInButtonEnabled: {
    ...activeButtonStyles,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  signInButtonDisable: {
    ...activeButtonStyles,
    borderColor: "#C4C4C4",
    backgroundColor: Colors.transparent,
  },
  labelStyle: {
    ...setTextProperties("#401674", Fonts.ItalicFont, moderateScale(13, 0), "400"),
    paddingLeft: 3,
  },
  inputInternalContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: android ? -10 : 0,
  },
  forgotPasswordLabel: {
    ...setTextProperties("#401674", Fonts.ItalicFont, moderateScale(14, 0), "400"),
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "right",
    paddingTop: 10,
  },
  fullHeight: { height: "100%" },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  mainRegisterContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    width: Metrics.width,
    height: moderateScaleViewports(Metrics.height * 0.45),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    top: 0,
  },
  inputTextValid: {
    ...defaultInput,
    borderBottomColor: "rgba(151, 151, 151, 0.3)",
  },
  inputTextInvalid: {
    ...defaultInput,
    borderBottomColor: "#FF3B30",
  },
  registerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  inputContainer: {
    width: Metrics.width * 0.80,
    backgroundColor: "#FFF",
    borderRadius: 4,
    elevation: 4,
    marginTop: moderateScaleViewports(-175),
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  buttonWidthContainer: {
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabledText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10),
  },
  transitionButtonText: {
    textAlign: "center",
    color: "#848688",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(27),
  },
  registerAdviseText: {
    textAlign: "center",
    color: "#666666",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(15),
    paddingBottom: 20,
  },
  termsAndConditionsText: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
  },
  termsAndConditionsTextLink: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: moderateScaleViewports(12),
    fontFamily: Fonts.BaseFont,
    textDecorationLine: "underline",
  },
  createAccountPadding: {},
  createAccountButton: {
    flex: 1,
    backgroundColor: "#F39100",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
    marginTop: moderateScaleViewports(10),
  },
  createAccountButtonDisable: {
    flex: 1,
    backgroundColor: "#979797",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
    marginTop: moderateScaleViewports(10),
  },
  inputViewContainer: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(0),
  },
  inputViewContainerValue: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(0),
  },
  labelText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    fontWeight: "400",
    color: "#401674",
    padding: 0,
    paddingLeft: moderateScaleViewports(20),
    paddingTop: moderateScaleViewports(10),
    textAlign: "left",
  },
  firstInput: {
    paddingTop: moderateScaleViewports(27),
  },
  invalidLabelText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    fontWeight: "400",
    color: "#FF3B30",
    padding: 0,
    paddingLeft: moderateScaleViewports(20),
    textAlign: "left",
  },
  inputsErrorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: android ? -15 : 0,
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
    marginBottom: android ? 1 : 30,
  },
  termsAndConditionsViewContainer: {
    paddingTop: moderateScaleViewports(24),
    flexDirection: "row",
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: moderateScaleViewports(10),
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  height: { height: "100%" },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "#FFFFFF",
    fontSize: moderateScaleViewports(36),
    textAlign: "center",
    paddingTop: moderateScaleViewports(18),
    paddingBottom: moderateScaleViewports(5),
  },

  subtitleText: {
    fontFamily: Fonts.BoldFont,
    color: "#FFFFFF",
    fontSize: moderateScaleViewports(16),
    textAlign: "center",
    paddingBottom: moderateScaleViewports(35),
  },
  topLogoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  /**
   * RenderPickerLangStyles
   */
  renderPickerContainer: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(27),
    flex: 0.9,
  },

  /**
   * RenderPickerStyles
   */
  renderPickerSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(151, 151, 151, 0.3)",
    paddingTop: moderateScaleViewports(5),
    paddingBottom: moderateScaleViewports(8),

  },
  renderPickerLabel: {
    color: "#373737",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(16),
  },
  renderPickerLabelPlaceHolder: {
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
  },
  renderPickerLabelTop: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    color: "rgba(0, 0, 0, 0.54)",
    paddingBottom: moderateScaleViewports(5),
  },
  transitionCreateButtonText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
  },
  createAccountButtonTransition: {
    backgroundColor: "#F39100",
    borderRadius: 4,
    width: Metrics.width * 0.80,
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    justifyContent: "center",
    alignItems: "center",
  },
  divider: { height: 1, backgroundColor: "rgba(151, 151, 151, 0.3)", width: moderateScaleViewports(105) },
  dividerText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    color: "#8E8E91",
    padding: moderateScaleViewports(30),
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

});
