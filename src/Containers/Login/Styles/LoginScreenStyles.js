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
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    color: "#000000",
    fontFamily: Fonts.BoldFont,
    fontSize: Metrics.height <= 568 ? 16 : moderateScale(18, 0),
    width: Metrics.width * 0.85,
  },
  loginContainer: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  signInButtonDisable: {
    ...activeButtonStyles,
    backgroundColor: Colors.transparent,
    borderColor: "#C4C4C4",
  },
  signInButtonEnabled: {
    ...activeButtonStyles,
    backgroundColor: "#F39100",
    elevation: 8,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.38,
    shadowRadius: 20,
  },
  labelStyle: {
    ...setTextProperties("#401674", Fonts.ItalicFont, moderateScale(13, 0), "400"),
    paddingLeft: 3,
  },
  inputInternalContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: android ? -10 : 0,
  },
  forgotPasswordLabel: {
    ...setTextProperties("#401674", Fonts.ItalicFont, moderateScale(14, 0), "400"),
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    textAlign: "right",
  },
  fullHeight: { height: "100%" },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  mainRegisterContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backgroundContainer: {
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-around",
    width: Metrics.width,
  },
  backgroundImage: {
    height: moderateScaleViewports(Metrics.height * 0.55),
    width: Metrics.width,
  },
  bottomMarginContainer: {
    marginBottom: moderateScaleViewports(77),
  },
  logoImg: {
    marginTop: Metrics.width <= 375 ? moderateScaleViewports(74) : moderateScaleViewports(122),
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
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    elevation: 4,
    width: Metrics.width * 0.8,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  buttonWidthContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  buttonEnabledText: {
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    textAlign: "center",
  },
  transitionButtonText: {
    color: "#848688",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(27),
    textAlign: "center",
  },
  registerAdviseText: {
    color: "#666666",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(15),
    paddingBottom: 20,
    textAlign: "center",
  },
  termsAndConditionsText: {
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    textAlign: "center",
  },
  termsAndConditionsTextLink: {
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    textAlign: "center",
    textDecorationLine: "underline",
  },
  createAccountPadding: {},
  createAccountButton: {
    alignItems: "center",
    backgroundColor: "#F39100",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
    flex: 1,
    justifyContent: "center",
    marginTop: moderateScaleViewports(10),
  },
  createAccountButtonDisable: {
    alignItems: "center",
    backgroundColor: "#979797",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
    flex: 1,
    justifyContent: "center",
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
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    fontWeight: "400",
    padding: 0,
    paddingLeft: moderateScaleViewports(20),
    paddingTop: moderateScaleViewports(10),
    textAlign: "left",
  },
  firstInput: {
    paddingTop: moderateScaleViewports(27),
  },
  invalidLabelText: {
    color: "#FF3B30",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    fontWeight: "400",
    padding: 0,
    paddingLeft: moderateScaleViewports(20),
    textAlign: "left",
  },
  inputsErrorContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: android ? -15 : 0,
  },
  errorIconContainer: {
    alignItems: "center",
    backgroundColor: "red",
    borderColor: "#fff",
    borderRadius: 50,
    borderWidth: android ? 1 : 1.5,
    height: Metrics.width * 0.06,
    justifyContent: "center",
    left: -30,
    marginBottom: android ? 1 : 30,
    position: "relative",
    width: Metrics.width * 0.06,
  },
  termsAndConditionsViewContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 0.9,
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(24),
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  height: { height: "100%" },
  titleText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(36),
    paddingBottom: moderateScaleViewports(5),
    paddingTop: Metrics.width <= 320 ? moderateScaleViewports(53) : Metrics.width <= 375 ? moderateScaleViewports(21) : moderateScaleViewports(34),
    textAlign: "center",
  },

  subtitleText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(16),
    paddingBottom: moderateScaleViewports(35),
    textAlign: "center",
  },
  topLogoContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  /**
   * RenderPickerLangStyles
   */
  renderPickerContainer: {
    flexDirection: "column",
    flex: 0.9,
    paddingTop: moderateScaleViewports(27),
  },

  /**
   * RenderPickerStyles
   */
  renderPickerSelectorContainer: {
    alignContent: "flex-start",
    borderBottomColor: "rgba(151, 151, 151, 0.3)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: moderateScaleViewports(8),
    paddingTop: moderateScaleViewports(5),
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
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    paddingBottom: moderateScaleViewports(5),
  },
  transitionCreateButtonText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
  },
  createAccountButtonTransition: {
    alignItems: "center",
    backgroundColor: "#F39100",
    borderRadius: 4,
    justifyContent: "center",
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    width: Metrics.width * 0.8,
  },
  divider: {
    backgroundColor: "rgba(151, 151, 151, 0.3)",
    height: 1,
    width: moderateScaleViewports(105),
  },
  dividerText: {
    color: "#8E8E91",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    padding: moderateScaleViewports(30),
  },
  dividerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomContainer: { flex: 1, flexDirection: "column", justifyContent: "space-between" },
});
