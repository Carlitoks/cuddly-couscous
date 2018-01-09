import { StyleSheet, Dimensions } from "react-native";
import { Colors, Images, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  logo: {
    width: 160,
    height: 60,
    marginTop: verticalScale(70),
    marginBottom: verticalScale(70)
  },
  call: {
    width: moderateScale(90),
    height: moderateScale(80),
    marginBottom: verticalScale(7.5)
  },
  center: {
    alignSelf: "center"
  },
  card: {
    height: moderateScale(130),
    width: "100%",
    marginTop: verticalScale(30)
  },
  cardContainer: {
    borderRadius: 15
  },
  button: {
    height: moderateScale(100),
    backgroundColor: Colors.primaryLightFillColor,
    width: "100%"
  },
  buttonQR: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    borderWidth: 0,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
    height: moderateScale(100)
  },
  textQR: {
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.fontColor,
    fontSize: 15
  },
  textBecome: {
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.fontColor,
    fontSize: 15,
    marginTop: 15,
    marginBottom: 20,
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  textCenter: {
    fontFamily: Fonts.primaryBaseFont,
    color: "gray",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    textAlign: "center",
    marginBottom: moderateScale(15),
    marginTop: moderateScale(10)
  },
  linkLogin: {
    fontFamily: Fonts.primaryBoldFont,
    color: Colors.fontColor
  },
  textLogin: {
    fontFamily: Fonts.primaryFont,
    alignSelf: "flex-end",
    color: Colors.fontColor,
    marginTop: moderateScale(10),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  buttonText: {
    fontFamily: Fonts.primaryBoldFont,
    fontSize: 15,
    color: Colors.primaryAltFontColor
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1,
    height: "100%"
  },
  contentScrollContainer: { flexGrow: 1 }
});
