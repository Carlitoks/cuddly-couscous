import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  Icon: {
    width: width
  },
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonAccept: {
    width: width,
    backgroundColor: Colors.primaryColor
  },
  button: {
    backgroundColor: Colors.primaryLightFillColor
  },
  buttonText: {
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.primaryAltFontColor
  },
  mainTitle: {
    fontSize: 24,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)" 
  },
  costCall: {
    fontSize: 24,
    fontFamily: Fonts.primaryLightFont,
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
    color: "gray",
    alignItems: "center"
  },
  costCallContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(9),
    width: "90%",
    marginTop: verticalScale(15)
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
  }
});
