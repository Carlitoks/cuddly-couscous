import { StyleSheet } from "react-native";
import { moderateScale, scaledFontSize } from "../../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../../Themes";
import { Iphone5 } from "../../../../../Util/Devices";

const PlaceHolderText = {
  fontFamily: Fonts.BaseFont,
  fontWeight: "500",
  fontSize: moderateScale(18),
  color: "white"
};

const placeholderInput = {
  borderBottomWidth: 1,
  borderBottomColor: "#8C8C8C",
  backgroundColor: "transparent",
  width: moderateScale(298)
};

export default StyleSheet.create({
  inputIOS: {
    ...PlaceHolderText,
    ...placeholderInput
  },
  inputAndroid: {
    ...PlaceHolderText,
    ...placeholderInput
  },
  inputValue: {
    paddingTop: 2,
    paddingBottom: 9,
    fontFamily: Fonts.BaseFont,
    fontWeight: "500",
    fontSize: Iphone5 ? 18 : scaledFontSize(18),
    color: "#ffffff"
  },
  inputPlaceholderValue: {
    paddingTop: 2,
    paddingBottom: 9,
    fontFamily: Fonts.BaseFont,
    fontWeight: "500",
    fontSize: Iphone5 ? 18 : scaledFontSize(18),
    color: "#cccccc"
  },
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 1 : scaledFontSize(13),
    textAlign: "left",
    fontWeight: "300"
  },
  currentSelectedLangContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  homeInputContainer: {
    flexDirection: "column",
    width: Metrics.width * 0.75,
  },
  onboardingInputContainer: {
    flexDirection: "column",
    width: Metrics.width * 0.85
  }
});
