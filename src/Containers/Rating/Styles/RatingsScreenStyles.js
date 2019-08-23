import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts, Metrics } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScaleViewports, moderateScale } from "../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../Util/Devices";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  baseButton: {
    alignItems: "center",
    borderRadius: moderateScaleViewports(53),
    justifyContent: "center",
    width: metrics.width * 0.70,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScaleViewports(53),
    width: metrics.width * 0.70,
    height: moderateScaleViewports(55),
  },
  baseButtonText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    paddingBottom: moderateScaleViewports(Metrics.width * 0.05),
    paddingTop: moderateScaleViewports(Metrics.width * 0.05),
  },
  baseButtonTextDisabled: {
    color: "#BCBCBC",
  },
  baseButtonTextEnabled: {
    color: "#FFFFFF",
  },
  baseDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    borderRadius: 4,
    height: 8,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    width: 8,
  },
  bottomButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: isIphoneXorAbove() ? moderateScaleViewports(50) : moderateScaleViewports(25),
  },
  centered: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingBottom: moderateScaleViewports(Metrics.baseMargin),
  },
  disabledButton: {
    alignItems: "center",
    borderRadius: moderateScaleViewports(53),
    justifyContent: "center",
    width: metrics.width * 0.70,
    height: moderateScaleViewports(55),
    borderColor: "#BCBCBC",
    backgroundColor: "#979797",
    borderWidth: 2,
  },
  enabledButton: {
    alignItems: "center",
    borderRadius: moderateScaleViewports(53),
    justifyContent: "center",
    width: metrics.width * 0.70,
    height: moderateScaleViewports(55),
    backgroundColor: "#F39100", borderColor: "#FFF", borderWidth: 2,
  },
  flexEndCenter: { alignItems: "center", justifyContent: "flex-end" },
  fullWidth: { flex: 1 },
  height: { height: "100%" },
  logo: {
    height: moderateScaleViewports(Metrics.images.logo),
    marginTop: moderateScaleViewports(Metrics.doubleSection),
    resizeMode: "contain",
    width: moderateScaleViewports(Metrics.images.logo),
  },
  paginationContainer: {
    flexDirection: "row",
    paddingBottom: moderateScaleViewports(metrics.height * 0.025),
    paddingTop: moderateScaleViewports(metrics.height * 0.045),
  },
  paginationStyle: {
    backgroundColor: "purple",
    marginTop: moderateScaleViewports(metrics.height * 0.1),
    maxHeight: moderateScaleViewports(metrics.width * 0.02),
    position: "relative",
  },
  ratingScreenContainer: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  reportProblemText: {
    color: "#401674",
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScaleViewports(24),
    paddingBottom: moderateScaleViewports(metrics.height * 0.02),
    textAlign: "center",
  },
  selectedDot: {
    backgroundColor: "#401674",
    borderRadius: 4,
    height: 8,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    width: 8,
  },
  cancelStyle: {
    marginRight: 12,
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  swiperContainer: {},
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
});
