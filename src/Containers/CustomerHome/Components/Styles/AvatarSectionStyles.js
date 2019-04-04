import { StyleSheet } from "react-native";
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Metrics
} from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  avatarContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.gradientColor.top,
    height: Metrics.width <= 320 || Metrics.width >= 375 ? Metrics.height * 0.63 : Metrics.height * 0.70,
    width: Metrics.width,
    paddingTop: moderateScaleViewports(21),
  },
  jeeniesStandingBy: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(17), color: "#fff" },
  jeeniesImg: { marginTop: moderateScaleViewports(27) },
});
