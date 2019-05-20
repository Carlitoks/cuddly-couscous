import { StyleSheet } from "react-native";
import {
  Metrics, Fonts,
} from "../../../Themes";
import { moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";

export default StyleSheet.create({
  emailInput: {width: metrics.width * 0.85, backgroundColor: "#FFFFFF", padding: moderateScaleViewports(0), borderRadius: 2, paddingTop: moderateScaleViewports(9), paddingBottom: moderateScaleViewports(9), paddingLeft: moderateScaleViewports(14) },
  emailInputError: { borderColor: "#FF3B30", borderWidth: 1, },
  resetButton: {
    backgroundColor: "#F39100",
    borderRadius: 4,
    width: Metrics.width * 0.80,
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    marginTop: moderateScaleViewports(38),
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonDisable: {
    backgroundColor: "#979797",
    borderRadius: 4,
    width: Metrics.width * 0.80,
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10),
    marginTop: moderateScaleViewports(38),
    justifyContent: "center",
    alignItems: "center",
  },
  mainForgotPasswordContainer: {
    flex: 1,
    backgroundColor: "#DBDBDB",
  },
  forgotPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#DBDBDB"
  },
  topLogoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "#231F20",
    fontSize: moderateScaleViewports(20),
    textAlign: "center",
    paddingBottom: moderateScaleViewports(15),
  },
  subtitleText: {
    fontFamily: Fonts.BoldFont,
    color: "#231F20",
    fontSize: moderateScaleViewports(18),
    textAlign: "center",
    paddingBottom: moderateScaleViewports(35),
    width: moderateScaleViewports(254)
  },
  invalidLabelText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    fontWeight: "400",
    color: "#FF3B30",
    padding: 0,
    alignSelf: "flex-start",
  },
  transitionCreateButtonText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
  },
});
