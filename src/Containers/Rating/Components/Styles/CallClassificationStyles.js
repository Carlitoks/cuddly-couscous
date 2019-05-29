import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexEndCenter: { alignItems: "center", justifyContent: "center" },
  paddingTop: {
    paddingTop: moderateScaleViewports(metrics.height * 0.045),
    paddingBottom: moderateScaleViewports(metrics.height * 0.045)
  },
  baseText: {
    color: "#000",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(20),
    paddingBottom: moderateScaleViewports(metrics.height * 0.02),
    textAlign: "center",
  },
  thumbsContainer: { flexDirection: "row" },
  starRatingPadding: { paddingBottom: moderateScaleViewports(metrics.height * 0.10) },
  thumbsPadding: { paddingLeft: moderateScaleViewports(25) },
  baseTagsStyle: {
    borderRadius: 10,
    paddingBottom: moderateScaleViewports(metrics.width * 0.0080),
    paddingLeft: moderateScaleViewports(metrics.width * 0.06),
    paddingRight: moderateScaleViewports(metrics.width * 0.06),
    paddingTop: moderateScaleViewports(metrics.width * 0.0080),
  },
  tagUnselected: {
    backgroundColor: "#fff",
    borderColor: "#401674",
    borderWidth: 1,
  },
  tagSelected: {
    backgroundColor: "#401674",
    borderColor: "#401674",
    borderWidth: 1,
  },
  baseTagText: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(16) },
  baseTagTextUnselected: { color: "#401674" },
  baseTagTextSelected: { color: "#FFFFFF" },
  tagsContainer: { alignItems: "center", justifyContent: "center" },
  bottomDividerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: moderateScaleViewports(20),
    paddingTop: moderateScaleViewports(metrics.height * 0.03),
  },
  divider: { backgroundColor: "#979797", height: 1, width: metrics.width * 0.90 },
  addComments: {
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(24),
    paddingBottom: moderateScaleViewports(19),
    paddingRight: moderateScaleViewports(19),
    paddingTop: moderateScaleViewports(19),
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
  renderPickerLabel: { color: "#848688", fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(14) },
  renderPickerSelectedLabel: { color: "#1C1B1B", fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(13) },
  renderPickerSelectorContainer: {
    alignContent: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(13),
    paddingLeft: moderateScaleViewports(13),
    paddingTop: moderateScaleViewports(13),
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
    flex: 1,
    marginTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(15),
  },
});
