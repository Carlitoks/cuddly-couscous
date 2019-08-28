import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScaleViewports, moderateScale } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  baseTagText: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(16) },
  baseTagTextSelected: { color: "#FFFFFF" },
  baseTagTextUnselected: { color: "#401674" },
  baseTagsStyle: {
    borderRadius: 4,
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
    paddingTop: metrics.height * 0.03,
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
    paddingBottom: 19,
    paddingRight: 19,
  },
  checkboxText:{
    color: "#000000",
    fontFamily: Fonts.BaseFont,
    fontWeight:"normal",
    fontSize: moderateScaleViewports(16),
    marginLeft: 10,
  },
  divider: { backgroundColor: "#979797", height: 1, width: metrics.width, marginLeft: -35, marginTop: moderateScaleViewports(30) },
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
  additionalInformationInput: {
    paddingLeft: 10,
    marginTop: 15,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14, 0),
    color: '#333333'
  },
  checkboxInputContainer:{
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    borderColor: "#FFFFFF",
  },
  tagsContainer: { alignItems: "center", justifyContent: "center" },
  thumbsContainer: { flexDirection: "row" },
  thumbsPadding: { paddingLeft: 25 },
  bottomDividerContainer: {
    //marginLeft: moderateScaleViewports(30),
  },
  callDetails: {
    paddingTop: moderateScaleViewports(20),
    alignSelf: "flex-start",
    fontSize: moderateScaleViewports(18)
  },
  addComments: {
    alignSelf: "flex-start",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    paddingBottom: moderateScaleViewports(40),
    paddingTop: moderateScaleViewports(10),
  },
  grey:{color:"#979797"},
  darkGrey:{color:"#444444"},
});
