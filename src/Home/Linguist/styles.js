import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  avatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    borderRadius: 75
  },
  center: {
    alignSelf: "center"
  },
  container: {
    flex: 1,
    width: width,
    marginTop: -20
  },
  logo: {
    marginTop: moderateScale(23),
    marginBottom: moderateScale(13),
    width: moderateScale(123),
    height: moderateScale(123),
    borderRadius: 60
  },
  textName: {
    fontSize: 22,
    fontWeight: "300",
    alignSelf: "center",
    color: "#ffffff"
  },
  calls: {
    width: "50%"
  },
  button: {
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
  amount: {
    width: "50%"
  },
  TitleText: {
    fontSize: 17,
    color: "gray",
    alignItems: "center"
  },
  callNumber: {
    fontSize: 30,
    color: "gray",
    alignItems: "center"
  },
  stars: {
    width: 150,
    marginBottom: moderateScale(25)
  },
  containerButtons: {
    backgroundColor: "#ffffff",
    bottom: 0,
    width: "100%",
    minHeight: 300
  },
  containerPerfil: {
    backgroundColor: Colors.primaryFillColor
  },
  StatusText: {
    fontSize: 20,
    fontFamily: Fonts.BaseFont,
    color: Colors.primaryColor,
    marginLeft: moderateScale(15),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  badgeText: {
    color: Colors.badgeColor,
    fontSize: 20
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  statusContainer: {
    justifyContent: "space-between",
    marginBottom: 40
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
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.BoldFont
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BoldFont,
    alignItems: "center",
    fontWeight: "bold"
  },
  stars: {
    width: 100,
    marginTop: moderateScale(11),
    marginBottom: moderateScale(13),
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  recentCallsTitle: {
    marginLeft: 10,
    paddingBottom: 10,
    paddingTop: 20,
    color: Colors.gray,
    fontSize: 25
  },
  starsContainer: {
    marginTop: moderateScale(13),
    width: width,
    alignSelf: "center",
    alignItems: "center",
    height: 70
  },
  scrollContainer: {
    backgroundColor: "white",
    height: "100%"
  }
});
