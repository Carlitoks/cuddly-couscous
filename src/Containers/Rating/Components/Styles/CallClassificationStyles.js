import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexEndCenter: { alignItems: "center", justifyContent: "center" },
  paddingTop: {
    paddingBottom: moderateScaleViewports(metrics.height * 0.045),
    paddingTop: moderateScaleViewports(metrics.height * 0.045),
  },
  baseText: {
    color: "#000000",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(20),
    paddingBottom: moderateScaleViewports(metrics.height * 0.02),
    textAlign: "center",
  },
  thumbsContainer: { flexDirection: "row" },
  starRatingPadding: { paddingBottom: moderateScaleViewports(metrics.height * 0.10) },
  thumbsPadding: { paddingLeft: moderateScaleViewports(25) },
  baseTagsStyle: {
    borderRadius: 4,
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
    marginLeft: moderateScaleViewports(30),
  },
  divider: { backgroundColor: "#979797", height: 1, width: metrics.width, marginTop: moderateScaleViewports(30) },
  addComments: {
    alignSelf: "flex-start",
    color: "#444444",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    paddingBottom: moderateScaleViewports(40),
    paddingTop: moderateScaleViewports(10),
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

  checkContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
    paddingTop: metrics.height * 0.03,
  },
  checklisContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 35,
    paddingTop: moderateScaleViewports(25),
  },
  checkboxContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
  comments: {
    color: "#000000",
    fontFamily: Fonts.BaseFont,
    fontWeight:"normal",
    fontSize: moderateScaleViewports(16),
    textAlign: "center",
    alignSelf: "center"
  },
  checkboxText:{
    color: "#000000",
    fontFamily: Fonts.BaseFont,
    fontWeight:"normal",
    fontSize: moderateScaleViewports(16),
    marginLeft: 10,
  },
  checkboxInputContainer:{
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    borderColor: "#FFFFFF",
  },
  container: {
    paddingTop: moderateScaleViewports(23)
  },
  callTextPadding: {
    alignSelf: "flex-start",
    paddingTop: moderateScaleViewports(20),
  },
  additionalInformationInput: {
    paddingLeft: 10,
    paddingTop: moderateScaleViewports(10),
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    color: '#444444'
  },
  commentContainer: {
    alignSelf: "flex-start",
    marginLeft: moderateScaleViewports(30)
  },
  callDetails: {
    paddingTop: moderateScaleViewports(20),
    alignSelf: "flex-start",
    fontSize: moderateScaleViewports(18)
  }
});
