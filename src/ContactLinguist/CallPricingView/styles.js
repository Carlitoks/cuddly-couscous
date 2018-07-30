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
  title: {
    marginTop: Iphone5 ? moderateScale(31) : 31,
    marginBottom: Iphone5 ? moderateScale(67) : 52,
    marginHorizontal: Iphone5 ? moderateScale(33) : 33,
    color: Colors.gradientColorButton.top,
    fontFamily: Fonts.primaryFont,
    fontWeight: "600",
    fontSize: Iphone5 ? moderateScale(28) : 29,
    textAlign: "center"
  },
  futurePricingContainer: {},
  futurePricingTitleContainer: {
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
  futurePricingTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(20) : 20
  },
  futurePricingBox: {
    marginHorizontal: 16,
    backgroundColor: Colors.lightBlue2,
    borderRadius: 4,
    minHeight: Iphone5 ? moderateScale(276) : 276
  },
  futurePricingBoxTitle: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(41) : 41,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(24) : 24,
    fontWeight: "600"
  },
  futurePricingBoxAnd: {
    marginTop: Iphone5 ? moderateScale(16) : 16,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.primaryFont,
    fontStyle: "italic",
    fontSize: Iphone5 ? moderateScale(12) : 12,
    textAlign: "center"
  },
  futurePricingBoxBody: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(18) : 18,
    fontWeight: "600"
  },
  futurePricingBoxEnd: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(15) : 15,
    fontStyle: "italic"
  },
  buttons: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%"
  }
});
