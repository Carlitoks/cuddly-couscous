import { StyleSheet } from "react-native";
import { Fonts } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  inputViewContainer: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(0),
  },
  inputsErrorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: -15,
  },
  renderPickerContainer: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(27),
    flex: 0.9,
  },
  renderPickerLabelPlaceHolder: {
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
  },
  renderPickerLabelTop: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    color: "rgba(0, 0, 0, 0.54)",
    paddingBottom: moderateScaleViewports(5),
  },
  renderPickerSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(151, 151, 151, 0.3)",
    paddingTop: moderateScaleViewports(5),
    paddingBottom: moderateScaleViewports(8),
  },
});
