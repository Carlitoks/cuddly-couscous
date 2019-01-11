import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  scaledFontSize
} from "../../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../../Themes";
import { Iphone5 } from "../../../../../Util/Devices";

export default StyleSheet.create({
  questionText: {
    color: "#FFFFFF",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 16 : moderateScale(21, 0),
    fontWeight: "300",
    textAlign: "left",
    zIndex: 1000000
  },
  questionHelpText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 19 : moderateScale(26, 0),
    fontWeight: "300",
    textAlign: "left"
  },
  questionsContainer: {
    flexDirection: "column",
    height: Metrics.height * 0.08,
  },
  questionsContainerHome: {
    flexDirection: "column",
    height: Metrics.height * 0.08,
  }
});
