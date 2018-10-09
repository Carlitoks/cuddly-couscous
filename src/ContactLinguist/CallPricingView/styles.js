import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import { Iphone5 } from "../../Util/Devices";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.white
  },
  COL_title: {
    marginTop: Iphone5 ? moderateScale(31) : 31,
    marginBottom: Iphone5 ? moderateScale(67) : 52,
    marginHorizontal: Iphone5 ? moderateScale(33) : 33,
    color: Colors.gradientColorButton.top,
    fontFamily: Fonts.primaryFont,
    fontWeight: "600",
    fontSize: Iphone5 ? moderateScale(28) : height * 0.03,
    textAlign: "center"
  },
  COL_futurePricingTitleContainer: {
    alignSelf: "center",
    width: width * 0.61,
    height: height * 0.08,
    backgroundColor: Colors.gradientColor.top,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "absolute",
    top: Iphone5 ? -29 : -35
  },
  COL_futurePricingTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(20) : height * 0.03
  },
  COL_futurePricingBox: {
    marginHorizontal: 16,
    backgroundColor: Colors.lightBlue2,
    borderRadius: 4,
    minHeight: Iphone5 ? moderateScale(276) : height * 0.4
  },
  COL_futurePricingContainer: {
    width: width * 0.99,
  },
  COL_futurePricingBoxTitle: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(41) : height * 0.058,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(24) : height * 0.0275,
    fontWeight: "600"
  },
  COL_futurePricingBoxAnd: {
    marginTop: Iphone5 ? moderateScale(16) : height * 0.0225,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.primaryFont,
    fontStyle: "italic",
    fontSize: Iphone5 ? moderateScale(12) : height * 0.019,
    textAlign: "center"
  },
  COL_futurePricingBoxBody: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(18) : height * 0.03,
    fontWeight: "600"
  },
  COL_futurePricingBoxEnd: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(15) : height * 0.03,
    fontStyle: "italic"
  },
  CPV_bottomButtonView: {
    paddingTop: 10,
  },
  buttons: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%"
  },
  CPV_scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});
