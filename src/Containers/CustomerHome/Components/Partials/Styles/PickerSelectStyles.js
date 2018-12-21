import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";
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
    fontSize: Iphone5 ? moderateScale(17) : moderateScale(21),
    color: "#ffffff"
  },
  inputPlaceholderValue: {
    paddingTop: 2,
    paddingBottom: 9,
    fontFamily: Fonts.BaseFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(17) : moderateScale(21),
    color: "#cccccc"
  },
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? moderateScale(14) : moderateScale(18),
    textAlign: "left",
    fontWeight: "300"
  },
  currentSelectedLangContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  }
});
