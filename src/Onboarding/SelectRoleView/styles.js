import { StyleSheet, Dimensions } from "react-native";
import { Colors, Images, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  logo: {
    borderColor: Colors.primaryAltFontColor,
    marginTop: verticalScale(60),
    marginBottom: verticalScale(10),
    position: "relative",
    backgroundColor: Colors.transparent
  },
  logoX: {
    borderColor: Colors.primaryAltFontColor,
    marginTop: 70,
    marginBottom: verticalScale(10),
    position: "relative",
    backgroundColor: Colors.transparent
  },
  logoImage: {
    width: 150,
    height: 33,
    resizeMode: "contain"
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
    fontFamily: Fonts.BoldFont,
    color: Colors.fontColor,
    fontSize: 15
  },
  textLanguageCommand: {
    fontFamily: Fonts.LightFont,
    color: Colors.fontColor,
    fontSize: moderateScale(30),
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  textBottom: {
    fontFamily: Fonts.LightFont,
    fontWeight: "600",
    color: Colors.fontColor,
    fontSize: 14,
    backgroundColor: "rgba(255, 255, 255, 0)",
    bottom: 10
  },
  textBottomX: {
    marginBottom: 15
  },
  textCenter: {
    fontFamily: Fonts.BaseFont,
    color: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    textAlign: "center",
    marginBottom: moderateScale(15),
    marginTop: moderateScale(10)
  },
  buttonText: {
    fontFamily: Fonts.BoldFont,
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
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  contentScrollContainer: {
    flexGrow: 1
  },
  linksContainer: {
    alignSelf: "center",
    width: width / 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  mainContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
  firstLetter: {
    fontSize: moderateScale(85)
  },

  absolute: {
    position: "absolute"
  },
  bottom: {
    bottom: 0
  },
  zIndex1: {
    zIndex: 1
  },
  backgroundRed: {
    backgroundColor: "red"
  },
  slogan: {
    backgroundColor: Colors.transparent,
    marginTop: 15,
    color: Colors.primaryColor,
    fontFamily: Fonts.BaseFont,
    fontSize: 16.5,
    textAlign: "center"
  },
  fullWidth: {
    width: "100%"
  }
});
