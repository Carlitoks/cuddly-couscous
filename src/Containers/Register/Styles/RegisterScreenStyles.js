import { StyleSheet, Platform } from "react-native";
import {
  Metrics, ApplicationStyles, Fonts, Colors,
} from "../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../../../Util/Devices";

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
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
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
    marginBottom: moderateScaleViewports(77),
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
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
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
  transitionButtonText: {
    textAlign: "center",
    color: "#848688",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(27),
    paddingBottom: moderateScaleViewports(32),
  },
  transitionButtonSginInText: {
    textAlign: "center",
    color: "#3F1674",
    textDecorationLine: "underline",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(27),
    paddingBottom: moderateScaleViewports(32),
  },
  registerAdviseText: {
    textAlign: "center",
    color: "#666666",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(15),
    paddingBottom: 20,
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


  height: { height: "100%" },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "#FFFFFF",
    fontSize: moderateScaleViewports(20),
    textAlign: "center",
    paddingTop: moderateScaleViewports(45),
    paddingBottom: Metrics.width <= 375 ? moderateScaleViewports(20) : moderateScaleViewports(120),
  },
  topLogoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
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
  textContainerRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
