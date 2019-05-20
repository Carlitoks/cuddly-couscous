import { StyleSheet, Platform } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import Reactotron from "reactotron-react-native";
import {isIphoneXorAbove} from "../../../../Util/Devices";

Reactotron.log(Metrics.width, isIphoneXorAbove());

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  avatarContainer: {
    backgroundColor: Colors.gradientColor.top,
    height: Metrics.height * 0.67,
    width: Metrics.width
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.65,
  },
  jeeniesStandingBy: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    color: "#fff"
  },
  imgStyleSmall: {
    flex: 0.9,
    resizeMode: "contain"
  },
  imgStyleRegular: {
    top: -25,
  },
  imgStyleXandAbove: {
    width: moderateScaleViewports(Metrics.width * 0.70),
    height: moderateScaleViewports(Metrics.width * 0.70),
    resizeMode: "cover",
  },
});
