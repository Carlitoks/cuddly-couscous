import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  scaledFontSize
} from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";
import { Iphone5 } from "../../../../../Util/Devices";

export default StyleSheet.create({
  questionText: {
    paddingBottom: Iphone5 ? moderateScale(62) : moderateScale(65),
    marginLeft: moderateScale(23),
    marginRight: moderateScale(23),
    color: "#FFFFFF",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? moderateScale(22) : scaledFontSize(21),
    fontWeight: "300",
    lineHeight: moderateScale(32),
    textAlign: "left",
    zIndex: 1000000,
    flex: 1,
    flexWrap: "wrap"
  },
  questionHelpText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? moderateScale(24) : scaledFontSize(26),
    fontWeight: "300",
    textAlign: "left",
    paddingLeft: moderateScale(23),
    paddingTop: Iphone5 ? moderateScale(50) : moderateScale(75),
    paddingBottom: Iphone5 ? moderateScale(30) : moderateScale(16)
  },
  questionsContainer: {
    flexDirection: "column",
    width: Iphone5 ? scale(460) : scale(430),
    height: 120
  }
});
