import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import metrics from "../../Themes/Metrics";
import { moderateScaleViewports } from "../../Util/Scaling";

const container = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ecf0f1',
};

const baseInput = {
  backgroundColor: "#fff",
  borderColor: "#8E8E93",
  borderWidth: 1,
  width: metrics.width * 0.60,
  height: "auto",
  padding: 0,
  paddingLeft: moderateScaleViewports(5),
  fontFamily: Fonts.BaseFont,
  fontSize: moderateScaleViewports(13),
  color: "#000000"
};

export default (styles = StyleSheet.create({
  titleText: {
    paddingTop: moderateScaleViewports(18),
    paddingBottom: moderateScaleViewports(6),
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
    color: "#000000"
  },
  subtitleText: {
    paddingBottom: moderateScaleViewports(21),
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    color: "#000000",
    width: metrics.width * 0.60
  },
  containerText: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainContainer: {
    ...container,
  },
  modalContainer: {
    ...container,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {backgroundColor: 'rgb(248, 248, 248)', borderRadius: 14, width: metrics.width * 0.70, flexDirection: "column", justifyContent: "space-between", alignItems: "center" },
  emailInput: {
    ...baseInput,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  emailInputInvalid: {
    ...baseInput,
    marginBottom: moderateScaleViewports(12),
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  middleContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  buttonContainer: {width: metrics.width*0.70, flexDirection: "row", borderTopWidth: 1, borderTopColor: "rgba(0, 0, 80, 0.30)", alignItems: "center", justifyContent: "space-between"},
  cancelButton: {justifyContent: "center", alignItems: "center", width: metrics.width * 0.35},
  okButton: {justifyContent: "center", alignItems: "center", width: metrics.width * 0.35, borderLeftWidth: 1, borderLeftColor: "rgba(0, 0, 80, 0.30)" },
  actionButtonText:{
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    color: "#007AFF",
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10)
  },
  invalidText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(11),
    color: "#FF3B30",
    paddingBottom: moderateScaleViewports(12),
  }
}));
