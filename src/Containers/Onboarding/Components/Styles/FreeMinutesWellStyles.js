import { StyleSheet, Platform } from "react-native";
import { moderateScale, scaledFontSize } from "../../../../Util/Scaling";
import Fonts from "../../../../Themes/Fonts";
import { Metrics } from "../../../../Themes";
import colors from "../../../../Themes/Colors";
import { iPhoneXModels, Iphone5 } from "../../../../Util/Devices";

export default StyleSheet.create({
  freeMinutesWellContainer: {
    width: Metrics.width * 0.89,
    backgroundColor: "#CDCDF4",
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#CDCDF4",
    top: Iphone5 ? moderateScale(-50) : moderateScale(-50),
    zIndex: 10
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
      ? moderateScale(-30)
      : iPhoneXModels
      ? moderateScale(-80)
      : moderateScale(0),
    zIndex: 10
  },
  pillButtonContainer: {
    backgroundColor: "#63A901",
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
    fontSize: Iphone5 ? 14 : scaledFontSize(16)
  },
  wellTitle: {
    color: "#401674",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? 15 : scaledFontSize(21),
    paddingLeft: 15,
    marginTop: -10
  },
  wellSubtitle: {
    color: "#401674",
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 12 : scaledFontSize(13),
    paddingLeft: 15,
    paddingBottom: 15
  },
  pricingPillText: {
    color: "#401674",
    fontSize: Iphone5 ? 14 : scaledFontSize(16),
    textAlign: "center",
    fontWeight: "600",
    fontFamily: Fonts.ItalicFont,
    paddingLeft: 5
  },
  availableMinutesPillText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(25),
    fontWeight: "500"
  }
});
