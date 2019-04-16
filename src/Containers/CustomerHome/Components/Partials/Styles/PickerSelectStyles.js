import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleViewports } from "../../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../../Themes";
import { Iphone5, iPhoneXModels } from "../../../../../Util/Devices";

const PlaceHolderText = {
  fontFamily: Fonts.BaseFont,
  fontWeight: "500",
  fontSize: moderateScale(18, 0),
  color: "white",
};

const placeholderInput = {
  borderBottomWidth: 1,
  borderBottomColor: "#8C8C8C",
  backgroundColor: "transparent",
  width: moderateScale(298, 0),
};

const inputAndPlaceholderTextSize = () => {
  if (Iphone5) {
    return 13;
  }
  if (iPhoneXModels) {
    return moderateScale(19, 0);
  }
  return moderateScale(18, 0);
};

export default StyleSheet.create({
  inputIOS: {
    ...PlaceHolderText,
    ...placeholderInput,
  },
  inputAndroid: {
    ...PlaceHolderText,
    ...placeholderInput,
  },
  inputValue: {
    paddingTop: 2,
    paddingBottom: 9,
    fontFamily: Fonts.BaseFont,
    fontWeight: "500",
    fontSize: inputAndPlaceholderTextSize(),
    color: "#ffffff",
  },
  inputPlaceholderValue: {
    fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(13), color: "#B1B1B1",
  },
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 13 : moderateScale(13, 0),
    textAlign: "left",
    fontWeight: "300",
  },
  currentSelectedLangContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  homeInputContainer: {
    flexDirection: "column",
    width: Metrics.width * 0.75,
  },
  onboardingInputContainer: {
    flexDirection: "column",
    width: Metrics.width * 0.85,
  },
  flexView: {  },
});
