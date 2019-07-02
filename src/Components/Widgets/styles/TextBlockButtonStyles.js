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
  borderBottomLeftRadius: isIphoneXorAbove() ? 10 : 0,
  borderBottomRightRadius: isIphoneXorAbove() ? 10 : 0,
  height: "100%",
  bottom: 0,
};

export default StyleSheet.create({
  iconPadding: { paddingLeft: moderateScaleViewports(24), paddingTop: moderateScaleViewports(2) },
  callButtonContainer: {
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
  audioCallButtonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightColor: "#fff",
    borderRightWidth: 1,
    flex: 1
  },
  videoCallButton: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(10),
    flex: 1
  },
  videoCallButtonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 1
  },
  audioOnlyButtonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(30),
  },
  callNowButtonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(30),
  },
});
