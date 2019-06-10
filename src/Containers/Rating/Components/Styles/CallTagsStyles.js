import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  addComments: {
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    paddingBottom: 19,
    paddingRight: 19,
    paddingTop: 19,
  },
  comments: {
    color: "#000000",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    paddingBottom: 19,
    paddingRight: 19,
  },
  baseTagText: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports( 16) },
  baseTagTextSelected: { color: "#FFFFFF" },
  baseTagTextUnselected: { color: "#401674" },
  baseTagsStyle: {
    borderRadius: 10,
    paddingBottom: metrics.width * 0.0080,
    paddingLeft: metrics.width * 0.06,
    paddingRight: metrics.width * 0.06,
    paddingTop: metrics.width * 0.0080,
  },
  baseText: {
    color: "#000",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(20),
    marginBottom: metrics.height * 0.02,
    textAlign: "center",
  },
  bottomDividerContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
    paddingTop: metrics.height * 0.03,
  },
  divider: { backgroundColor: "#979797", height: 1, width: metrics.width * 0.90 },
  flexEndCenter: { alignItems: "center", justifyContent: "center" },
  paddingTop: { marginTop: metrics.height * 0.045 },
  starRatingPadding: { paddingBottom: metrics.height * 0.10 },
  tagSelected: {
    backgroundColor: "#401674",
    borderColor: "#401674",
    borderWidth: 1,
  },
  tagUnselected: {
    backgroundColor: "#fff",
    borderColor: "#401674",
    borderWidth: 1,
  },
  tagsContainer: { alignItems: "center", justifyContent: "center" },
  thumbsContainer: { flexDirection: "row" },
  thumbsPadding: { paddingLeft: 25 },
});
