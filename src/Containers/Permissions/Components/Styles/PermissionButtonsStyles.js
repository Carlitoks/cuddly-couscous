import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleViewports, setTextProperties } from "../../../../Util/Scaling";
import Fonts from "../../../../Themes/Fonts";
import { Metrics } from "../../../../Themes";
import colors from "../../../../Themes/Colors";
import { iPhoneXModels, Iphone5 } from "../../../../Util/Devices";
import metrics from "../../../../Themes/Metrics";

const primaryButton = {
  minWidth: Metrics.width * 0.50,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 4,
  marginTop: 20
};

export default StyleSheet.create({
  permissionButtonsContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: iPhoneXModels ? 44 : 25
  },
  checkPermissionContainer: {
    flexDirection: "column",
    alignSelf: "center"
  },
  checkPermissionButton: {
    ...primaryButton,
    backgroundColor: "#391367",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  checkPermissionButtonCamera: {
    width: moderateScaleViewports(293),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: moderateScaleViewports(26),
    borderColor: "#FFFFFF",
    marginTop: 20,
    backgroundColor: "#F39100",
  },
  checkPermissionButtonText: {
    ...setTextProperties("#fff", Fonts.BaseFont, moderateScaleViewports(16), "600"),
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10)
  },
  checkPermissionButtonTextCamera: {
    ...setTextProperties("#fff", Fonts.BaseFont, moderateScaleViewports(17), "600"),
    paddingTop: moderateScaleViewports(15),
    paddingBottom: moderateScaleViewports(15)
  },
  skipButtonContainer: { flexDirection: "column" },
  skipButton: {
    maxWidth: Metrics.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: moderateScaleViewports(16),
  },
  skipButtonText: {
    ...setTextProperties("#391367", Fonts.BaseFont, moderateScaleViewports(16))
  },
  skipButtonTextCamera: {
    ...setTextProperties("#FFFFFF", Fonts.BaseFont, moderateScaleViewports(17))
  }
});
