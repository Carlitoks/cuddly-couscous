import { StyleSheet } from "react-native";
import {
  Metrics, Fonts,
} from "../../../Themes";
import { moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";

export default StyleSheet.create({
  emailInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    padding: moderateScaleViewports(0),
    paddingBottom: moderateScaleViewports(9),
    paddingLeft: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(9),
    width: metrics.width * 0.85,
  },
  emailInputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  invalidLabelText: {
    alignSelf: "flex-start",
    color: "#FF3B30",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    fontWeight: "400",
    padding: 0,
  },
  keyboardContainer: {
    alignItems: "center",
    backgroundColor: "#DBDBDB",
    flex: 1,
    justifyContent: "center",
  },
  mainForgotPasswordContainer: {
    backgroundColor: "#DBDBDB",
    flexGrow: 1,
  },
  resetButton: {
    alignItems: "center",
    backgroundColor: "#F39100",
    borderRadius: 4,
    justifyContent: "center",
    marginTop: moderateScaleViewports(38),
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    width: Metrics.width * 0.80,
  },
  resetButtonDisable: {
    alignItems: "center",
    backgroundColor: "#979797",
    borderRadius: 4,
    justifyContent: "center",
    marginTop: moderateScaleViewports(38),
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    width: Metrics.width * 0.80,
  },
  subtitleText: {
    color: "#231F20",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(18),
    paddingBottom: moderateScaleViewports(35),
    textAlign: "center",
    width: moderateScaleViewports(254),
  },
  titleText: {
    color: "#231F20",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(20),
    paddingBottom: moderateScaleViewports(15),
    textAlign: "center",
  },
  topLogoContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  transitionCreateButtonText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
  },
});
