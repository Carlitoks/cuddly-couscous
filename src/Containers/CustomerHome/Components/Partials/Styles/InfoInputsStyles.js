import { StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { iPhoneXModels, Iphone5 } from "../../../../../Util/Devices";
import { Fonts, Metrics } from "../../../../../Themes";
import metrics from "../../../../../Themes/Metrics";

const iOS = Platform.OS === "ios";
const PlaceHolderText = {
  fontFamily: Fonts.BaseFont,
  fontWeight: "500",
  fontSize: moderateScale(18, 0),
  color: "white"
};
const android = Platform.OS === "android";
const placeholderInput = {
  borderBottomWidth: 1,
  borderBottomColor: "#8C8C8C",
  backgroundColor: "transparent",
  width: moderateScale(298, 0)
};

export default StyleSheet.create({
  inputsContainer: {
    flexDirection: "column",
    marginTop: moderateScale(20)
  },
  inputsContainerHome: {
    flexDirection: "column",
    marginTop: moderateScale(20),
    left: iOS ? -15 : 0
  },

  inputsContainerIos: {
    flexDirection: "column",
    marginTop:
      Metrics.height <= 580
        ? moderateScale(100, 0)
        : Metrics.height <= 680
        ? moderateScale(130, 0)
        : Metrics.height <= 740
        ? moderateScale(120, 0)
        : Metrics.height <= 820
        ? moderateScale(75, 0)
        : moderateScale(60, 0)
    //marginBottom: iPhoneXModels ? 50 : 0
  },
  inputsContainerHomeIos: {
    flexDirection: "column",
    marginTop:
      Metrics.height <= 580
        ? moderateScale(90, 0)
        : Metrics.height <= 680
        ? moderateScale(110, 0)
        : Metrics.height <= 740
        ? moderateScale(100, 0)
        : Metrics.height <= 820
        ? moderateScale(60, 0)
        : moderateScale(40, 0)
    //marginBottom: iPhoneXModels ? 50 : 0
  },
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(13, 0),
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
  paddingBottomContainer: {
    flexDirection: "column",
    paddingBottom: 5,
    zIndex: 1000
  },
  swapArrows: {
    position: "absolute",
    left: metrics.width * 0.77,
    top:
      Metrics.height <= 600
        ? moderateScale(46, 0)
        : Metrics.height <= 680
        ? moderateScale(46, 0)
        : moderateScale(47, 0),
    zIndex: 900
  },
  swapArrowsIos: {
    position: "absolute",
    left: metrics.width * 0.77,
    top:
      Metrics.height <= 580
        ? moderateScale(42, 0)
        : Metrics.height <= 680
        ? moderateScale(48, 0)
        : Metrics.height <= 740
        ? moderateScale(48, 0)
        : Metrics.height <= 820
        ? moderateScale(48, 0)
        : moderateScale(48, 0),
    zIndex: 900
  }
});
