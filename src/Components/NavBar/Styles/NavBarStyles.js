import { Platform, StyleSheet } from "react-native";
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Metrics,
} from "../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import {isIphoneXorAbove} from "../../../Util/Devices";

const iOS = Platform.OS === "ios";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  titleTextStyle: {
    color: "#fff",
    textAlign: "center",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  cancelStyle: {
    marginRight: 12,
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  createAccountTitleTextStyle: {
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0),
    fontWeight: "500",
    textAlign: "center",
    justifyContent: "center"
  },
  containerMenu: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: moderateScale(50, 0),
    width: moderateScale(50, 0),
    marginLeft: 15
  },
  IconMenu: {
    color: Colors.primaryColor,
    padding: 0
  },
  buttonQR: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginRight: 15
  },
  cancelButton: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  headerInner: {
    padding: 5,
    margin: 0,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  headerInnerHome: {
    padding: 5,
    margin: 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#401674"
  },
  headerInnerForgotPassword: {
    padding: 5,
    margin: 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DBDBDB"
  },
  headerOuter: {
    marginTop: iOS ? isIphoneXorAbove() ? 35 : 30 : 20,
    padding: 0,
    borderBottomWidth: 0,
    height: moderateScaleViewports(65)
  },
  headerContainer: { flexDirection: "column", justifyContent: "flex-start", backgroundColor: Colors.gradientColor.top },
  headerContainerOnboarding: { flexDirection: "column", justifyContent: "flex-start", backgroundColor: "#ffffff" },
  minutesLeftContainer: { marginRight: 15 }
});
