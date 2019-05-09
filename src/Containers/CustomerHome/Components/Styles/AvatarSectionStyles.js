import { StyleSheet, Platform } from "react-native";
import { ApplicationStyles, Colors, Fonts, Metrics } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  avatarContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.gradientColor.top,
    height: Metrics.height * 0.67,
    width: Metrics.width
  },
  jeeniesStandingBy: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(17),
    color: "#fff"
  },
  jeeniesImg: {
    marginTop: moderateScaleViewports(20),
    resizeMode: "contain",
    width: Metrics.width * 0.80,
    height: Metrics.width * 0.80
  }

});
