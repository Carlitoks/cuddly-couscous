import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import {moderateScale, moderateScaleViewports} from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexEndCenter: { paddingTop: metrics.height * 0.045, justifyContent: "center", alignItems: "center" },
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
  bottomDividerContainer: {
    paddingTop: metrics.height * 0.03,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  divider: { backgroundColor: "#979797", width: metrics.width * 0.90, height: 1 },
  addComments: {
    paddingBottom: 19,
    paddingTop: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: 24,
    color: "#401674",
    paddingRight: 19,
  },
  /**
   * RenderPickerLangStyles
   */
  renderPickerContainer: {
    flexDirection: "column",
    flex: 1,
  },

  /**
   * RenderPickerStyles
   */
  renderPickerLabel: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(14), color: "#848688" },
  renderPickerSelectedLabel: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(13), color: "#1C1B1B" },
  renderPickerSelectorContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(13),
    paddingBottom: moderateScaleViewports(13),
    paddingLeft: moderateScaleViewports(13),
    borderRadius: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  /**
   * RenderPickerScenarioStyles
   */
  renderPickerScenarioContainer: {
    flexDirection: "column",
    marginTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(15),
    flex: 1,
  },
});
