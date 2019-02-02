import { StyleSheet, Platform } from "react-native";
import { moderateScale, scaledFontSize } from "../../../../Util/Scaling";
import Fonts from "../../../../Themes/Fonts";
import { Metrics } from "../../../../Themes";
import colors from "../../../../Themes/Colors";
import { iPhoneXModels, Iphone5 } from "../../../../Util/Devices";

const iOS = Platform.OS === "ios";
export default StyleSheet.create({
  freeMinutesWellContainer: {
    width: Metrics.width * 0.89,
    backgroundColor: "#CDCDF4",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#CDCDF4",
    marginTop: Iphone5
      ? moderateScale(45)
      : iOS
      ? moderateScale(85)
      : moderateScale(45),
    zIndex: 10,
    paddingBottom: 15
  },
  freeMinutesWellContainerHome: {
    width: Metrics.width * 0.89,
    backgroundColor: "#CDCDF4",
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#CDCDF4",
    top: Iphone5
      ? moderateScale(-90, 0)
      : iPhoneXModels
      ? moderateScale(-150)
      : iOS
      ? moderateScale(-100, 0)
      : moderateScale(-140, 0),
    zIndex: 10
  },
  pillButtonContainer: {
    backgroundColor: "#63A901",
    maxHeight: Metrics.height * 0.0525,
    alignSelf: "flex-start",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "rgba(255,255,255,0.55)",
    top: -13,
    left: 8,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
    padding: 10
  },
  pillButtonText: {
    paddingLeft: 5,
    color: "#fff",
    fontWeight: "600",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 14 : moderateScale(16, 0)
  },
  wellTitle: {
    color: "#401674",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 15 : moderateScale(21, 0),
    paddingLeft: 15,
    marginTop: -10
  },
  wellTitleSpanish: {
    color: "#401674",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 15 : moderateScale(21, 0.5),
    paddingLeft: 15,
    marginTop: -10
  },
  wellSubtitle: {
    color: "#401674",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 12 : moderateScale(13, 0),
    paddingLeft: 15,
    // paddingBottom: 15
  },
  wellSubtitleSpanish: {
    color: "#401674",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 12 : moderateScale(13, 0.5),
    paddingLeft: 15,
    paddingBottom: 15
  },
  pricingPillText: {
    color: "#401674",
    fontSize: Iphone5 ? 14 : moderateScale(16, 0),
    textAlign: "center",
    fontWeight: "600",
    fontFamily: Fonts.ItalicFont,
    paddingLeft: 5
  },
  availableMinutesPillText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(25, 0),
    fontWeight: "500"
  }
});
