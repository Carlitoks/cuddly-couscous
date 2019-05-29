import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import {isIphoneXorAbove} from "../../../Util/Devices";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: moderateScaleViewports(Metrics.baseMargin),
  },
  logo: {
    marginTop: moderateScaleViewports(Metrics.doubleSection),
    height: moderateScaleViewports(Metrics.images.logo),
    width: moderateScaleViewports(Metrics.images.logo),
    resizeMode: "contain",
  },
  centered: {
    alignItems: "center",
  },
  fullWidth: { flex: 1 },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  height: { height: "100%" },
  flexEndCenter: { justifyContent: "flex-end", alignItems: "center" },
  ratingScreenContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  paginationStyle: {
    position: "relative",
    maxHeight: moderateScaleViewports(metrics.width * 0.02),
    marginTop: moderateScaleViewports(metrics.height * 0.1),
    backgroundColor: "purple",
  },
  bottomButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: isIphoneXorAbove() ? moderateScaleViewports(50) : moderateScaleViewports(25),
  },
  reportProblemText: {
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(24, 1),
    textAlign: "center",
    color: "#401674",
    paddingBottom: moderateScaleViewports(metrics.height * 0.02),
  },
  baseButton: {
    borderRadius: moderateScaleViewports(53),
    width: metrics.width * 0.70,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    borderWidth: 2,
    borderColor: "#BCBCBC",
  },
  enabledButton: {
    backgroundColor: "#F39100", borderWidth: 2, borderColor: "#FFF",
  },
  baseButtonText: {
    paddingTop: moderateScaleViewports(Metrics.width * 0.05),
    paddingBottom: moderateScaleViewports(Metrics.width * 0.05),
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
  },
  baseButtonTextDisabled: {
    color: "#BCBCBC",
  },
  baseButtonTextEnabled: {
    color: "#FFFFFF",
  },
  swiperContainer: {},
  baseDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  selectedDot: {
    backgroundColor: "#401674",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  paginationContainer: {
    paddingTop: moderateScaleViewports(metrics.height * 0.045),
    paddingBottom: moderateScaleViewports(metrics.height * 0.025),
    flexDirection: "row",
  },
});
