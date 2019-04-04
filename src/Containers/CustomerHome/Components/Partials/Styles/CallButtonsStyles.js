import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";
import { isIphoneXorAbove } from "../../../../../Util/Devices";
import metrics from "../../../../../Themes/Metrics";

const baseButton = {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: moderateScaleViewports(10),
};

export default StyleSheet.create({
  iconPadding: { paddingLeft: moderateScaleViewports(24) },
  callButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: moderateScaleViewports(10),
    minWidth: metrics.width * 0.80,
    bottom: moderateScaleViewports(-5),
    paddingBottom: isIphoneXorAbove() ? 70 : 0,
    position: "absolute",
  },
  audioCallButton: {
    ...baseButton,
    backgroundColor: "#3F1674",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightColor: "#fff",
    borderRightWidth: 1,
  },
  audioCallButtonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightColor: "#fff",
    borderRightWidth: 1,
  },
  videoCallButton: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  videoCallButtonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  audioOnlyButtonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    paddingTop: moderateScaleViewports(18),
    paddingBottom: moderateScaleViewports(18),
    paddingLeft: moderateScaleViewports(10),
    paddingRight: moderateScaleViewports(30),
  },
  callNowButtonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontWeight: "600",
    fontFamily: Fonts.BaseFont,
    paddingTop: moderateScaleViewports(18),
    paddingBottom: moderateScaleViewports(18),
    paddingLeft: moderateScaleViewports(10),
    paddingRight: moderateScaleViewports(30),
  },
});
