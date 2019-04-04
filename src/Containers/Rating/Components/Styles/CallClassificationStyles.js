import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexEndCenter: { justifyContent: "center", alignItems: "center", marginTop: 20 },
  baseText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(20, 0),
    textAlign: "center",
    color: "#000",
    paddingBottom: metrics.height * 0.02,
  },
  thumbsContainer: { flexDirection: "row" },
  starRatingPadding: { paddingBottom: metrics.height * 0.10 },
  thumbsPadding: { paddingLeft: 25 },
  baseTagsStyle: {
    borderRadius: 10,
    paddingTop: metrics.width * 0.0080,
    paddingBottom: metrics.width * 0.0080,
    paddingLeft: metrics.width * 0.06,
    paddingRight: metrics.width * 0.06,
  },
  tagUnselected: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#401674",
  },
  tagSelected: {
    backgroundColor: "#401674",
    borderWidth: 1,
    borderColor: "#401674",
  },
  baseTagText: { fontFamily: Fonts.BaseFont, fontSize: 16 },
  baseTagTextUnselected: { color: "#401674" },
  baseTagTextSelected: { color: "#FFFFFF" },
  tagsContainer: { justifyContent: "center", alignItems: "center" },
});
