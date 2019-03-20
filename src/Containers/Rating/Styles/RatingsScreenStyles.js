import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScale } from "../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
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
    maxHeight: metrics.width * 0.02,
    marginTop: metrics.height * 0.1,
    backgroundColor: "purple",
  },
  bottomButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  reportProblemText: {
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(24, 1),
    textAlign: "center",
    color: "#401674",
    paddingBottom: metrics.height * 0.02,
  },
  baseButton: {
    borderRadius: 53,
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
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(17, 0),
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
    paddingTop: metrics.height * 0.045,
    paddingBottom: metrics.height * 0.025,
    flexDirection: "row",
  },
});
