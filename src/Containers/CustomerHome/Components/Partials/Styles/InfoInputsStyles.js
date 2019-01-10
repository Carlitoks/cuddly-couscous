import { StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { iPhoneXModels, Iphone5 } from "../../../../../Util/Devices";
import { Fonts, Metrics } from "../../../../../Themes";
import metrics from "../../../../../Themes/Metrics";

const iOS = Platform.OS === "ios";
const PlaceHolderText = {
  fontFamily: Fonts.BaseFont,
  fontWeight: "500",
  fontSize: moderateScale(18),
  color: "white"
};
const android = Platform.OS === "android";
const placeholderInput = {
  borderBottomWidth: 1,
  borderBottomColor: "#8C8C8C",
  backgroundColor: "transparent",
  width: moderateScale(298)
};

export default StyleSheet.create({
  inputsContainer: {
    flexDirection: "column",
    marginTop: Iphone5
      ? 90
      : Metrics.height <= 600
      ? moderateScale(120)
      : Metrics.height <= 680
      ? moderateScale(80)
      : moderateScale(-80)
  },
  inputsContainerHome: {
    flexDirection: "column",
    marginTop: Iphone5
      ? 75
      : iOS
      ? moderateScale(90)
      : Metrics.height <= 600
      ? moderateScale(90)
      : Metrics.height <= 680
      ? moderateScale(60)
      : moderateScale(-80),
    left: Iphone5 ? -15 : moderateScale(-20)
  },
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(13),
    textAlign: "left",
    fontWeight: "300"
  },
  swapLanguageContainer: {
    position: "relative",
    alignSelf: "flex-end",
    left: 24,
    top: -1,
    width: 15,
    height: 54,
    borderColor: "#8C8C8C",
    borderStyle: "dotted",
    borderRightWidth: 1,
    borderTopWidth: 1,
    zIndex: 10
  },
  onboardingPlaceholderContainer: {
    position: "relative",
    alignSelf: "flex-end",
    height: 51
  },
  swapLanguageIconContainer: {
    position: "absolute",
    left: Metrics.width * 0.74,
    top: 18
  },
  additionalInformationInput: {
    ...PlaceHolderText,
    ...placeholderInput,
    fontWeight: "500"
  },
  paddingBottomContainer: { flexDirection: "column", paddingBottom: 5 },
  swapArrows: {
    position: "absolute",
    left: metrics.width * 0.77,
    top: Iphone5
      ? 42
      : Metrics.height <= 600
      ? moderateScale(46)
      : Metrics.height <= 680
      ? moderateScale(46)
      : moderateScale(47),
    zIndex: 1000
  }
});
