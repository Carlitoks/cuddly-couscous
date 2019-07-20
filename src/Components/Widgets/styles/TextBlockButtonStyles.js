import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../Util/Scaling";
import { Fonts } from "../../../Themes";
import { isIphoneXorAbove } from "../../../Util/Devices";
import metrics from "../../../Themes/Metrics";

const baseButton = {
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: moderateScaleViewports(10),
  alignItems: "center",
  height: "100%",
  bottom: 0,
};

export default StyleSheet.create({
  iconPadding: { paddingLeft: moderateScaleViewports(24), paddingTop: moderateScaleViewports(2) },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
    width: metrics.width * 0.90,
    height: moderateScaleViewports(55),
    right: "5%",
    marginBottom: isIphoneXorAbove() ? 44 : 0,
    position: "absolute",
    bottom:"25%"
  },
  creatingButtonPlaceholder: {
    ...baseButton,
    flex: 1,
    backgroundColor: "#979797"
  },

  button: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(10),
    flex: 1
  },
  buttonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    flex: 1
  },
  buttonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
  },
});
