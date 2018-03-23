import { StyleSheet, Dimensions, Platform } from "react-native";
import { Fonts, Colors } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  headerInner: {
    padding: 10,
    margin: 0,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerOuter: {
    padding: 0,
    borderBottomWidth: 0,
    height: 40
  },
  onlyTitle: {
    fontSize: 26,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    backgroundColor: "transparent"
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 26,
    color: Colors.primaryColor,
    marginTop: moderateScale(10),
    textAlign: "center",
    backgroundColor: "transparent"
  },
  subtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 20,
    textAlign: "center",
    marginBottom: moderateScale(20),
    color: Colors.primaryColor,
    backgroundColor: "transparent"
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
    borderRadius: 10,
    color: "white"
  },
  containerAvatar: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30
  },
  avatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 75
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
    backgroundColor: "transparent"
  },
  avatarTitleBold: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginTop: scale(-60)
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
    fontFamily: Fonts.primaryLightFont,
    backgroundColor: "transparent"
  },
  starsContainer: {
    marginTop: moderateScale(-25),
    width: width,
    alignSelf: "center",
    alignItems: "center",
    height: 70
  },
  stars: {
    width: 100,
    marginTop: moderateScale(11),
    marginBottom: moderateScale(13),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  userName: {
    fontFamily: Fonts.primaryLightFont,
    color: Colors.primaryColor,
    fontSize: scale(45),
    alignSelf: "flex-start",
    justifyContent: "center",
    marginRight: scale(0),
    backgroundColor: "transparent"
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  statusText: {
    fontSize: 20,
    fontFamily: Fonts.primaryBaseFont,
    color: Colors.primaryColor,
    marginLeft: moderateScale(15),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  switchContainer: {
    position: "absolute",
    right: 5
  },
  tabTextStyle: {
    fontFamily: Fonts.primaryBaseFont,
    color: Colors.primaryLightFillColor,
    fontSize: 12
  },
  tabStyle: {
    backgroundColor: Colors.backgroundBlue,
    borderWidth: 1,
    borderColor: Colors.primaryColor
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
    backgroundColor: "transparent",
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
    ...Platform.select({
      android: {
        elevation: 4
      }
    }),
    alignContent: "space-between",
    borderRadius: 10,
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  TitleText: {
    fontSize: 17,
    color: "gray",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  callNumber: {
    fontSize: 30,
    color: "gray",
    alignItems: "center"
  }
});
