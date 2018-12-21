import { StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import Fonts from "./../../../../../Themes/Fonts";
import { Metrics } from "../../../../../Themes";
import { Iphone5 } from "../../../../../Util/Devices";

export default StyleSheet.create({
  availableMinutesContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    position: "absolute",
    top: Iphone5 ? moderateScale(290) : moderateScale(335),
    bottom: 0,
    left: Iphone5 ? Metrics.width * 0.75 : Metrics.width * 0.72,
    right: 0,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 46,
    backgroundColor: "#63A901",
    width: Iphone5 ? 68 : 92,
    height: Iphone5 ? 68 : 92,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,.26)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 0.7
  },
  availableMinutesNumber: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? moderateScale(25) : moderateScale(35),
    fontWeight: "500"
  },
  availableMinutesText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? moderateScale(10) : moderateScale(12)
  },
  pricingTopText: {
    color: "#401674",
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? moderateScale(10) : moderateScale(12),
    textAlign: "center"
  },
  pricingBottomText: {
    color: "#401674",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? moderateScale(18) : moderateScale(21),
    textAlign: "center"
  },
  addPaymentText: {
    color: "#FFFFFF",
    fontFamily: Fonts.BoldFont,
    fontSize: Iphone5 ? moderateScale(10) : moderateScale(12),
    textAlign: "center",
    marginBottom: 20,
    lineHeight: Iphone5 ? moderateScale(12) : moderateScale(14),
    width: Metrics.width * 0.18
  }
});
