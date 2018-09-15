import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale, scale } from "../../../Util/Scaling";
import { Iphone5 } from "../../../Util/Devices";

const { width, height } = Dimensions.get("window");
const headerHeight = 85;

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.translucentGray
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    width: width * 0.91,
    borderRadius: 4,
    height: height * (Iphone5 ? 0.7 : 0.76),
    marginBottom: Iphone5 ? moderateScale(20) : 20
  },
  modalTopButton: {
    position: "absolute",
    zIndex: 30,
    top: height * (Iphone5 ? 0.065 : 0.055)
  },
  modalButton: {
    width: width * 0.65,
    height: height * 0.08,
    marginTop: Iphone5 ? moderateScale(30) : 30,
    alignSelf: "center"
  },
  // Celebrate our launch component styles
  COL_title: {
    marginTop: Iphone5 ? moderateScale(48) : 48,
    marginHorizontal: Iphone5 ? moderateScale(30) : 30,
    paddingBottom: Iphone5 ? moderateScale(20) : 20,
    marginBottom: Iphone5 ? moderateScale(5) : 5,
    borderBottomWidth: 0.8,
    borderColor: Colors.gray2,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.LightFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(22) : 22,
    textAlign: "center"
  },
  COL_futurePricingTitleContainer: {
    alignSelf: "center",
    width: width * 0.61,
    height: height * 0.08,
    // backgroundColor: Colors.gradientColor.top,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  COL_futurePricingTitle: {
    color: Colors.gradientColorButton.top,
    fontFamily: Fonts.primaryFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(20) : 20
  },
  COL_futurePricingBox: {},
  COL_futurePricingBoxTitle: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(24) : 24,
    fontWeight: "600"
  },
  COL_futurePricingBoxAnd: {
    marginTop: Iphone5 ? moderateScale(16) : 16,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.primaryFont,
    fontStyle: "italic",
    fontSize: Iphone5 ? moderateScale(12) : 12,
    textAlign: "center"
  },
  COL_futurePricingBoxBody: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(18) : 18,
    fontWeight: "600"
  },
  COL_futurePricingBoxEnd: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: Iphone5 ? moderateScale(15) : 15,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(15) : 15,
    fontStyle: "italic"
  }
});
