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
    color: "#FFFFFF",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 19 : scaledFontSize(21),
    fontWeight: "300",
    textAlign: "left",
    zIndex: 1000000,
  },
  questionHelpText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 24 : scaledFontSize(26),
    fontWeight: "300",
    textAlign: "left",
  },
  questionsContainer: {
    flexDirection: "column",
    height: 50
  }
});
