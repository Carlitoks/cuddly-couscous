import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.white
  },
  title: {
    marginTop: 31,
    marginBottom: 52,
    marginHorizontal: 33,
    color: Colors.gradientColorButton.top,
    fontFamily: Fonts.primaryFont,
    fontWeight: "600",
    fontSize: 29,
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
    top: -35
  },
  futurePricingTitle: {
    color: Colors.white,
    fontFamily: Fonts.primaryFont,
    fontWeight: "500",
    fontSize: 20
  },
  futurePricingBox: {
    marginHorizontal: 16,
    backgroundColor: Colors.lightBlue2,
    borderRadius: 4,
    minHeight: 276
  },
  futurePricingBoxTitle: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: 41,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600"
  },
  futurePricingBoxAnd: {
    marginTop: 16,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.primaryFont,
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center"
  },
  futurePricingBoxBody: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600"
  },
  futurePricingBoxEnd: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginTop: 15,
    textAlign: "center",
    fontSize: 15,
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
