import { StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { iPhoneXModels, Iphone5 } from "../../../../../Util/Devices";
import { Fonts, Metrics } from "../../../../../Themes";
import metrics from "../../../../../Themes/Metrics";

console.log(Metrics.height);

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
    marginTop:
      Metrics.height <= 600
        ? moderateScale(120)
        : Metrics.height <= 680
        ? moderateScale(100)
        : moderateScale(0)
  },
  inputsContainerHome: {
    flexDirection: "column",
    marginTop: iPhoneXModels ? 0 : moderateScale(-50),
    top: iPhoneXModels
      ? moderateScale(-80)
      : Iphone5
      ? 10
      : android
      ? 0
      : moderateScale(-60),
    left: Iphone5 ? -20 : moderateScale(-20)
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
    left: iPhoneXModels
      ? moderateScale(360)
      : Iphone5
      ? moderateScale(330)
      : android
      ? moderateScale(350)
      : moderateScale(380),
    top: iPhoneXModels
      ? moderateScale(55)
      : Iphone5
      ? moderateScale(55)
      : android
      ? moderateScale(60)
      : moderateScale(55),
    zIndex: 1000
  }
});
