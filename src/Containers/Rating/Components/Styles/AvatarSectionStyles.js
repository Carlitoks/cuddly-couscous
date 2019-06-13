import { Platform, StyleSheet } from "react-native";
import { ApplicationStyles, Fonts, Metrics } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../../Util/Devices";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  absolutePosition: {
    position: "absolute",
  },
  avatar: { borderRadius: Platform.OS === "ios" ? metrics.width * 0.25 / 2 : 100, height: metrics.width * 0.25, width: metrics.width * 0.25 },
  avatarContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: metrics.height * 0.03,
    paddingTop: metrics.height * 0.03,
  },
  centered: {
    alignItems: "center",
  },
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  firstName: {
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(26),
    paddingLeft: Metrics.width * 0.05,
    textAlign: "center",
  },
  linearGradient: {
    flex: 1,
  },
  logo: {
    height: Metrics.images.logo,
    marginTop: Metrics.doubleSection,
    resizeMode: "contain",
    width: Metrics.images.logo,
  },
  mainAvatarSectionContainer: {
    backgroundColor: "#401674",
    paddingTop: isIphoneXorAbove() ? 25 : Platform.OS === "ios" ? 10 : 0,
  },
  questionsContainer: {
    marginTop: 40,
    paddingLeft: 20,
    zIndex: 100,
  },
  waves: { bottom: 0, position: "absolute" },
  wavesSection: {
    bottom: 0,
    position: "absolute",
  },
});
