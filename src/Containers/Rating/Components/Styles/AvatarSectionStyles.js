import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale } from "../../../../Util/Scaling";
import {isIphoneXorAbove} from "../../../../Util/Devices";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain",
  },
  centered: {
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
  },
  wavesSection: {
    position: "absolute",
    bottom: 0,
  },
  absolutePosition: {
    position: "absolute",
  },
  questionsContainer: {
    zIndex: 100,
    paddingLeft: 20,
    marginTop: 40,
  },
  mainAvatarSectionContainer: {
    backgroundColor: "#401674",
    paddingTop: isIphoneXorAbove() ? 25 : Platform.OS === 'ios' ? 10 : 0,
  },
  avatar: { width: metrics.width * 0.25, height: metrics.width * 0.25, borderRadius: Platform.OS === 'ios' ? metrics.width * 0.25/2 : 100 },
  firstName: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(26, 0),
    color: "#fff",
    textAlign: "center",
    paddingLeft: Metrics.width * 0.05,
  },
  waves: { position: "absolute", bottom: 0 },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: metrics.height * 0.03,
    paddingBottom: metrics.height * 0.03,
  },
});
