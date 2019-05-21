import { StyleSheet, Platform } from "react-native";
import Reactotron from "reactotron-react-native";
import {
  ApplicationStyles, Colors, Fonts, Metrics,
} from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../../Util/Devices";

Reactotron.log(Metrics.width, isIphoneXorAbove());

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  avatarContainer: {
    backgroundColor: Colors.gradientColor.top,
    height: Metrics.height * 0.67,
    width: Metrics.width,
  },
  contentContainer: {

  },
  imgStyleRegular: {
    height: moderateScaleViewports(Metrics.height * 0.40),
    resizeMode: "cover",
    width: moderateScaleViewports(Metrics.height * 0.40),
  },
  jeeniesStandingBy: {
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    paddingBottom: moderateScaleViewports(30),
  },
});
