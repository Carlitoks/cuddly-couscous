import { StyleSheet, Platform } from "react-native";
import { moderateScale, scaledFontSize } from "../../../../../Util/Scaling";
import Fonts from "./../../../../../Themes/Fonts";
import { Metrics } from "../../../../../Themes";
import colors from "./../../../../../Themes/Colors";
import { iPhoneXModels, Iphone5 } from "../../../../../Util/Devices";

const iOS = Platform.OS === "ios";

export default StyleSheet.create({
  callButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: iPhoneXModels ? 70 : 0
  },
  callNowButtonContainer: {
    flexDirection: "column",
    paddingBottom: 14,
    alignSelf: "center"
  },
  callNowButton: {
    minWidth: Metrics.width * 0.78,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  callNowButtonDisable: {
    minWidth: Metrics.width * 0.78,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 25,
    backgroundColor: colors.gradientColor.bottom
  },
  callNowButtonText: {
    color: "white",
    fontSize: Iphone5 ? 14 : scaledFontSize(17),
    fontWeight: "600",
    lineHeight: moderateScale(20),
    fontFamily: Fonts.BaseFont,
    padding:
      iOS && !(iPhoneXModels || Iphone5)
        ? Metrics.width * 0.042
        : Metrics.width * 0.05
  },
  callNowButtonTextDisabled: {
    color: "#ccc",
    fontSize: Iphone5 ? 14 : scaledFontSize(17),
    fontWeight: "600",
    lineHeight: moderateScale(20),
    fontFamily: Fonts.BaseFont,
    padding:
      iOS && !(iPhoneXModels || Iphone5)
        ? Metrics.width * 0.042
        : Metrics.width * 0.05
  },
  audioOnlyButtonContainer: { flexDirection: "column" },
  audioOnlyButton: {
    minWidth: Metrics.width * 0.78,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: moderateScale(10),
    paddingTop: iOS && !(iPhoneXModels || Iphone5) ? 0 : moderateScale(17)
  },
  audioOnlyButtonText: {
    color: "white",
    fontSize: Iphone5 ? 14 : scaledFontSize(17),
    fontWeight: "500",
    lineHeight: moderateScale(28),
    fontFamily: Fonts.BaseFont,
    paddingBottom: Metrics.width * 0.02
  },
  audioOnlyButtonTextDisabled: {
    color: "#ccc",
    fontSize: Iphone5 ? 14 : scaledFontSize(17),
    fontWeight: "500",
    lineHeight: moderateScale(28),
    fontFamily: Fonts.BaseFont,
    paddingBottom: Metrics.width * 0.02
  },
  iconPadding: { paddingLeft: Metrics.width * 0.05 }
});
