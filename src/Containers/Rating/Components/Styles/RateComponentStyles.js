import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  baseText: {
    color: "#000",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(20),
    paddingBottom: moderateScaleViewports(metrics.height * 0.02),
    textAlign: "center",
  },
  flexEndCenter: { alignItems: "center", justifyContent: "flex-end", paddingTop: moderateScaleViewports(metrics.height * 0.045) },
  starRatingPadding: { paddingBottom: moderateScaleViewports(metrics.height * 0.10) },
  thumbsContainer: { flexDirection: "row" },
  thumbsPadding: { paddingLeft: moderateScaleViewports(25) },
});
