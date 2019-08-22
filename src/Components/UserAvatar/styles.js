import { StyleSheet, Dimensions, Platform } from "react-native";
import { Fonts, Colors } from "../../Themes";
import { moderateScale, moderateScaleViewports, scale, verticalScale } from "../../Util/Scaling";
import { Iphone5 } from "../../Util/Devices";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  outerView: {
    zIndex: 2,
  },
  outerViewBackground: {
    backgroundColor: Colors.gradientColor.top
  },
  container: {

  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  headerInner: {
    padding: 5,
    margin: 0,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerOuter: {
    padding: 0,
    borderBottomWidth: 0,
    height: 45
  },
  onlyTitle: {
    fontSize: 26,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.LightFont,
    backgroundColor: Colors.transparent
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 26,
    color: Colors.primaryColor,
    marginTop: moderateScale(10),
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  subtitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 20,
    textAlign: "center",
    marginBottom: moderateScale(20),
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent
  },
  containerSearch: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  inputSearch: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    color: "white"
  },
  containerAvatar: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20
  },
  containerAvatarRate: {
    justifyContent: "center"
  },
  avatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 75
  },
  avatarRate: {
    marginLeft: "14%",
    width: 96,
    height: 96,
    borderRadius: 48
  },
  bigAvatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 75
  },
  avatarTitle: {
    marginLeft: scale(35),
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: Colors.transparent
  },
  avatarTitleRate: {
    marginLeft: 0
  },
  avatarTitleBold: {
    fontSize: 26,
    fontFamily: Fonts.BaseFont,
    color: Colors.primaryColor
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
    fontFamily: Fonts.LightFont,
    backgroundColor: Colors.transparent
  },
  starsContainer: {
    marginTop: moderateScale(-25),
    width: width,
    alignSelf: "center",
    alignItems: "center",
    height: Iphone5 ? 30 : 70
  },
  stars: {
    width: 100,
    marginTop: moderateScale(11),
    marginBottom: moderateScale(13),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  userName: {
    fontFamily: Fonts.LightFont,
    color: Colors.primaryColor,
    fontSize: scale(45),
    alignSelf: "flex-start",
    justifyContent: "center",
    marginRight: scale(0),
    backgroundColor: Colors.transparent
  },
  avatarTitleContainer: {
    justifyContent: "center",
    marginRight: 30,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 30,
    flex: 1
  },
  avatarStarsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 30,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 30,
    flex: 1
  },
  avatarBoldTitleContainer: {
    justifyContent: "flex-start",
    marginRight: 30,
    marginTop: 10,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 30,
    flex: 1
  },
  avatarRateTitleContainer: {
    flex: 1,
    paddingLeft: 26
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: moderateScaleViewports(14)
  },
  statusText: {
    fontSize: moderateScaleViewports(17),
    fontFamily: Fonts.BaseFont,
    color: Colors.primaryColor,
  },
  switchContainer: {

  },
  tabTextStyle: {
    fontFamily: Fonts.BaseFont,
    color: Colors.primaryLightFillColor,
    fontSize: 12
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: Colors.primaryColor
  },
  tabStyleNoBorder: {
    backgroundColor: "transparent",
  },
  tabsContainerStyle: {
    marginLeft: moderateScale(33),
    marginRight: moderateScale(33),
    width: "55%",
    alignSelf: "center",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(30)
  },
  mainButtons: {
    flex: 1,
    height: 500,
    width: width,
    backgroundColor: Colors.primaryColor,
    paddingTop: 20,
    paddingBottom: 20,
    ...Platform.select({
      android: {
        elevation: 3
      }
    })
  },
  scanQRImage: {
    width: 30,
    height: 30,
    marginRight: scale(15)
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
  center: {
    alignSelf: "center"
  },
  buttonGrid: {
    alignItems: "center",
    flexDirection: "row"
  },
  connectMeNow: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 310,
    left: "5%",
    width: "90%",
    height: 50,
    borderRadius: 150,
    backgroundColor: Colors.transparent,
    ...Platform.select({
      android: {
        elevation: 4
      }
    })
  },
  gradientConnectMeNow: {
    borderRadius: 150
  },
  textConnectMeNow: {
    color: Colors.primaryColor
  },
  card: {
    flex: 1,
    alignContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  TitleText: {
    fontSize: 17,
    color: "gray",
    alignItems: "center",
    backgroundColor: Colors.transparent
  },
  callNumber: {
    fontSize: moderateScaleViewports(30),
    color: "#401674",
    alignItems: "center"
  },
  callsText: {
    fontSize: moderateScaleViewports(12),
    fontFamily: Fonts.BaseFont,
    color: "#444444"
  },
  addrating:{
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: '#F39100',
    borderColor: '#F39100',
    borderRadius: moderateScale(5),
    borderStyle: 'solid',
    width: moderateScale(140),
    height: moderateScale(32)
  },
  addRatingText: {
    marginLeft: 5,
    color:  'white',
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
  },
  monthlySummary: {backgroundColor: "#F1F1F1", width: "100%", minHeight: moderateScaleViewports(44), justifyContent: "center"},
  monthlySummaryText: { fontSize: moderateScaleViewports(18), color: "#444444", marginLeft: moderateScaleViewports(34), fontFamily: Fonts.BaseFont, fontWeight: "bold" },
  callNumberContainer: { flexDirection: "row", paddingTop: moderateScaleViewports(18), paddingBottom: moderateScaleViewports(12) },
  dividerStyle: { height: "90%", width: 1, backgroundColor: "#DCDCDC" },
});
