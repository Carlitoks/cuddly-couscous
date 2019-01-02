import { StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import Fonts from "./../../../../../Themes/Fonts";
import { Metrics } from "../../../../../Themes";
import colors from "./../../../../../Themes/Colors";
import { iPhoneXModels } from "../../../../../Util/Devices";

const iOS = Platform.OS === "ios";

export default StyleSheet.create({
  callButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  callNowButtonContainer: {
    flexDirection: "column",
    paddingBottom: 14,
    alignSelf: "center"
  },
  callNowButton: {
    height: moderateScale(Metrics.width * 0.15),
    width: Metrics.width * 0.78,
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
    height: moderateScale(Metrics.width * 0.15),
    width: Metrics.width * 0.78,
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
    fontSize: moderateScale(20),
    paddingLeft: moderateScale(19),
    fontWeight: "600",
    lineHeight: moderateScale(20),
    fontFamily: Fonts.BaseFont
  },
  callNowButtonTextDisabled: {
    color: "#ccc",
    fontSize: moderateScale(20),
    paddingLeft: moderateScale(19),
    fontWeight: "600",
    lineHeight: moderateScale(20),
    fontFamily: Fonts.BaseFont
  },
  audioOnlyButtonContainer: { flexDirection: "column" },
  audioOnlyButton: {
    height: iOS ? moderateScale(55) : moderateScale(49),
    width: moderateScale(377),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(17)
  },
  audioOnlyButtonText: {
    color: "white",
    fontSize: moderateScale(20),
    fontWeight: "500",
    lineHeight: moderateScale(28),
    fontFamily: Fonts.BaseFont
  },
  audioOnlyButtonTextDisabled: {
    color: "#ccc",
    fontSize: moderateScale(20),
    fontWeight: "500",
    lineHeight: moderateScale(28),
    fontFamily: Fonts.BaseFont
  }
});
