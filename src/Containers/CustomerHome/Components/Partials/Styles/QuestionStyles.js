import { StyleSheet } from "react-native";
import { moderateScale, scale } from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";
import { Iphone5 } from "../../../../../Util/Devices";

export default StyleSheet.create({
  questionText: {
    paddingBottom: Iphone5 ? moderateScale(62) : moderateScale(62),
    marginLeft: moderateScale(23),
    marginRight: moderateScale(23),
    color: "#FFFFFF",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? moderateScale(22) : moderateScale(26),
    fontWeight: "300",
    lineHeight: moderateScale(32),
    textAlign: "left",
    zIndex: 100000,
    flex: 1,
    flexWrap: "wrap"
  },
  questionHelpText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? moderateScale(22) : moderateScale(26),
    fontWeight: "300",
    textAlign: "left",
    paddingLeft: moderateScale(23),
    paddingTop: Iphone5 ? moderateScale(50) : moderateScale(75),
    paddingBottom: Iphone5 ? moderateScale(30) : moderateScale(50)
  },
  questionsContainer: {
    flexDirection: "column",
    width: Iphone5 ? scale(460) : scale(410),
    height: 120
  }
});
