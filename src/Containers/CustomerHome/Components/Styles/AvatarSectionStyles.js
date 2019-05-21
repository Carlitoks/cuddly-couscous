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
    flex: 0.47,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgStyleRegular: {
    height: (Metrics.width * 0.60),
    resizeMode: "cover",
    width: (Metrics.width * 0.60),
  },
  imgStyleXAndAbove: {
    height: (Metrics.width * 0.70),
    resizeMode: "cover",
    width:  (Metrics.width * 0.70),
  },
  jeeniesStandingBy: {
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
  },
});
