import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";
import { isIphoneXorAbove } from "../../../../../Util/Devices";
import metrics from "../../../../../Themes/Metrics";

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
    backgroundColor: "#3F1674",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  videoCallButton: {
    backgroundColor: "#F39100",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
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
