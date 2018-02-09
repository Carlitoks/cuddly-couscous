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
  onlyTitle: {
    fontSize: 30,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "transparent"
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 30,
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
    color: "white",
    backgroundColor: "transparent"
  },
  subtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(30),
    color: "white",
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
    marginBottom: 30
  },
  avatar: {
    paddingVertical: 30,
    width: moderateScale(150),
    height: moderateScale(150),
    alignSelf: "center",
    borderRadius: moderateScale(75)
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  statusText: {
    fontSize: 20,
    fontFamily: Fonts.primaryBaseFont,
    color: Colors.primaryColor,
    marginLeft: moderateScale(15),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  mainButtons: {
    flex: 1,
    height: 500,
    width: width,
    backgroundColor: Colors.primaryColor,
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 3
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
    top: 120,
    left: "5%",
    width: "90%",
    height: 50,
    borderRadius: 150,
    backgroundColor: "transparent",
    elevation: 4,
    zIndex: 1111,
    overflow: "visible"
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
