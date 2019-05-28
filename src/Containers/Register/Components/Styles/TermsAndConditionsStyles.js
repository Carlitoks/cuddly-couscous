import { StyleSheet } from "react-native";
import { Fonts } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";

const defaultInput = {
  flex: 0.9,
  borderBottomWidth: 1,
  color: "rgba(0, 0, 0, 0.54)",
  fontFamily: Fonts.BaseFont,
  fontSize: moderateScaleViewports(16),
  paddingBottom: moderateScaleViewports(5),
};

export default StyleSheet.create({
  termsAndConditionsViewContainer: {
    paddingTop: moderateScaleViewports(24),
    flexDirection: "row",
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: moderateScaleViewports(10),
  },
  termsAndConditionsText: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
  },
  termsAndConditionsTextLink: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: moderateScaleViewports(12),
    fontFamily: Fonts.BaseFont,
    textDecorationLine: "underline",
  },
  touchableLink: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
