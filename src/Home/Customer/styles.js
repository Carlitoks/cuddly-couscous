import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");
const headerHeight = 85;

export default StyleSheet.create({
  Button: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0,
    paddingLeft: 0,
    paddingTop: 25,
    paddingBottom: 25
  },
  colorText: {
    color: "#000000",
    fontSize: 18,
    textAlign: "left",
    alignContent: "flex-start",
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingTop: 12,
    paddingBottom: 12
  },
  center: {
    alignSelf: "center"
  },
  avatar: {
    paddingVertical: 30,
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(75),
    alignSelf: "center"
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  textName: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  },
  titleComponent: {
    fontFamily: Fonts.LightFont,
    fontSize: 18,
    textAlign: "center",
    color: Colors.primaryColor,
    marginTop: scale(35),
    backgroundColor: Colors.transparent
  },
  textCountry: {
    fontSize: 15,
    alignSelf: "center",
    color: "#A9A9A9"
  },
  textStars: {
    fontSize: 22,
    paddingLeft: 8,
    lineHeight: 33,
    alignSelf: "center",
    fontWeight: "400",
    marginBottom: 15,
    color: Colors.primaryColor
  },
  mainButtons: {
    flex: 1,
    height: 140,
    width: width,
    backgroundColor: Colors.primaryColor,
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 3,
    marginBottom: 20
  },
  scanQRImage: {
    width: 25,
    height: 25,
    marginRight: scale(15)
  },
  buttonGrid: {
    alignItems: "center"
  },
  button: {
    width: "90%",
    height: 80
  },
  buttonQR: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15
  },
  textConnectMeNow: {
    color: Colors.primaryColor
  },
  buttonConnectMeNow: {
    height: 50,
    borderRadius: 150,
    marginTop: 20
  },
  gradientConnectMeNow: {
    borderRadius: 150
  },
  connectMeNow: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 344,
    left: "5%",
    width: "90%",
    height: 50,
    borderRadius: 150,
    backgroundColor: Colors.transparent,
    elevation: 4
  },
  buttonSchedule: {
    backgroundColor: Colors.primaryBackgroundColor,
    borderRadius: 20,
    width: "100%",
    height: 80
  },
  buttonFavorites: {
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: Colors.primaryLightFillColor,
    borderRadius: 20,
    width: "100%",
    height: 80
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BoldFont,
    alignItems: "center",
    fontWeight: "bold"
  },
  stars: {
    //marginLeft: moderateScale(80),
    width: scale(140),
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  userName: {
    fontFamily: Fonts.LightFont,
    color: Colors.primaryColor,
    fontSize: scale(45),
    textAlign: "center"
  },
  userContainer: {
    width: width,
    alignSelf: "center",
    marginBottom: 30
  },
  containerTiles: {
    width: width,
    marginTop: 10,
    marginBottom: 10,
    // TODO: update this minHeight back to 300 when 'Favorites' and 'Schedule a Linguist' Buttons are back
    minHeight: 335,
    alignItems: "center",
    justifyContent: "space-around"
  },
  tilesGrid: {
    marginTop: 10,
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30
  },
  containerPerfil: {
    backgroundColor: Colors.primaryFillColor
  },
  starsContainer: {
    justifyContent: "center",
    marginRight: 30,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 30,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  iconView: {
    flex: 1,
    alignItems: "flex-start",
    height: 100,
    alignItems: "baseline"
  },
  icon: {
    paddingTop: 10,
    paddingLeft: 10
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0
  },
  callLinguistContainer: {
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 5,
    width: "100%"
  },
  iconV: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20
  },
  icon: {
    color: "#9391f7"
  },
  badgeContainer: {
    backgroundColor: "white",
    height: 30,
    width: 42,
    zIndex: 0,
    alignSelf: "center",
    position: "absolute",
    margin: -20
  },
  badgeText: {
    fontSize: 12,
    color: "black",
    fontFamily: Fonts.LightFont
  },
  title: {
    marginTop: 15,
    fontSize: moderateScale(30),
    color: "gray",
    fontFamily: Fonts.BaseFont
  },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  mainContainer: {
    backgroundColor: Colors.gradientColor.top
  },
  scrollContainer: {
    height: "60%"
  },
  avatarContainer: {
    marginLeft: scale(60)
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 5,
    width: "100%",
    marginLeft: scale(30)
  },
  Icon: {
    color: Colors.primaryColor,
    padding: 20,
    paddingRight: 0
  },
  listContainer: {
    backgroundColor: Colors.transparent,
    marginTop: 0
  },
  triangle: {
    marginTop: -15,
    marginBottom: 15,
    width: 0,
    height: 0,
    backgroundColor: Colors.transparent,
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
    borderTopColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderBottomColor: Colors.gradientColorButton.top,
    borderLeftColor: Colors.transparent,
    alignSelf: "center"
  },
  mainContainer: {
    backgroundColor: Colors.gradientColor.top,
    height: height - headerHeight
  },
  titleCall: {
    fontFamily: Fonts.LightFont,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  titleCallEvent: {
    fontSize: 14
  },
  titleCallOrganization: {
    fontSize: 16
  },
  subtitleCallContainer: {
    margin: 16
  },
  subtitleCall: {
    marginBottom: 5,
    fontSize: 26,
    fontFamily: Fonts.LightFont,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent
  },
  largeSubtitle: {
    fontSize: 22,
    marginBottom: 15
  },
  subtitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 17,
    color: Colors.white,
    textAlign: "left",
    backgroundColor: Colors.transparent,
    marginLeft: 16
  },
  smallsubtitle: {
    fontFamily: Fonts.LightFont,
    fontStyle: "italic",
    fontSize: 12,
    color: Colors.white,
    textAlign: "left",
    backgroundColor: Colors.transparent,
    marginLeft: 16
  },
  subTitleCall: {
    fontFamily: Fonts.LightFont,
    fontSize: 10,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  bottom: {
    marginTop: 25
  },
  bottomText: {
    fontSize: moderateScale(18),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.LightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  marginBottom20: {
    marginBottom: 20
  },
  marginBottom10: {
    marginBottom: 10
  },
  waves: {
    position: "absolute",
    bottom: 0
  },
  scrollView: {
    flex: 1,
    paddingBottom: 30
  },
  carousel: { marginTop: "5%" },
  slider: { height: 300 },
  carouselContainer: {
    marginBottom: height * 0.0525
  }
});
