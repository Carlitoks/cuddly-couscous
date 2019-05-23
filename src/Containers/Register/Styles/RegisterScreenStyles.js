import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Fonts, Metrics } from "../../../Themes";
import { moderateScaleViewports } from "../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../Util/Devices";

// const { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";
const defaultInput = {
  flex: 0.9,
  borderBottomWidth: 1,
  color: "rgba(0, 0, 0, 0.54)",
  fontFamily: Fonts.BaseFont,
  fontSize: moderateScaleViewports(16),
  paddingBottom: moderateScaleViewports(5),
};
export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
    justifyContent: "flex-start",
    width: Metrics.width,
  },
  backgroundImage: {
    height: moderateScaleViewports(Metrics.height * 0.55),
    width: Metrics.width,
  },
  logoImg: {
    marginTop: moderateScaleViewports(74),
  },
  bottomMarginContainer: {
    // marginBottom: moderateScaleViewports(77),
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
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.38,
    shadowRadius: 8,
    width: Metrics.width * 0.80,
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
  transitionButtonText: {
    color: "#848688",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingBottom: moderateScaleViewports(32),
    paddingTop: moderateScaleViewports(27),
    textAlign: "center",
  },
  transitionButtonSginInText: {
    color: "#3F1674",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingBottom: moderateScaleViewports(32),
    paddingTop: moderateScaleViewports(27),
    textAlign: "center",
    textDecorationLine: "underline",
  },
  registerAdviseText: {
    color: "#666666",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(15),
    paddingBottom: 20,
    textAlign: "center",
  },

  createAccountPadding: {},
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


  height: { height: "100%" },
  titleText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(20),
    paddingBottom: isIphoneXorAbove() ? moderateScaleViewports(120) : moderateScaleViewports(20),
    paddingTop: moderateScaleViewports(45),
    textAlign: "center",
  },
  topLogoContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
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
  textContainerRow: {
    flex: 1,
    flexDirection: "row",
  },
});
