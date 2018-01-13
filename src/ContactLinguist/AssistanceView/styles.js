import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  Icon: {
    width: width
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(15),
    marginTop: moderateScale(20),
    color: Colors.primaryColor,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  containerSearch: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  inputSearch: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10
  },
  buttonStep: {
    backgroundColor: Colors.primaryColor,
    width: width
  },
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  contentScrollContainer: { flexGrow: 1 },
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  buttonStep: {
    alignSelf: "center",
    backgroundColor: Colors.primaryLightFillColor,
    width: width
  },
  textStep: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont
  },
  containerContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  textChooseBelow: {
    color: "gray",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "flex-start",
    marginTop: moderateScale(25),
    marginLeft: moderateScale(15),
    marginBottom: moderateScale(-15)
  },
  assitanceListItem: {
    height: 30
  }
});
