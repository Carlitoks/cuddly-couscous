import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts } from "../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  gradientContainer: {
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1
  },
  topLogoContainer: {
    marginTop: moderateScale(76, 0),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: "#fff",
    fontSize: moderateScale(20, 0),
    textAlign: "center",
    paddingTop: moderateScale(20, 0),
    paddingBottom: moderateScale(20, 0)
  },
  subtitleText: {
    fontFamily: Fonts.BaseFont,
    color: "#fff",
    fontSize: moderateScale(18, 0),
    textAlign: "center",
    maxWidth: moderateScale(317, 0),
    marginBottom: moderateScale(39, 0)
  },
  bottomButtonsContainer: {
    paddingBottom: moderateScale(35, 0),
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  allSet: {
    fontFamily: Fonts.BaseFont,
    color: "#fff",
    fontSize: moderateScale(36, 0),
    textAlign: "center",
    marginTop: moderateScale(88, 0)
  },
  backgroundImageContainer: {
    width: metrics.width,
    height: metrics.height * 0.57,
    resizeMode: "cover",
  },
  backgroundImage: {
    width: metrics.width,
    height: metrics.height * 0.50,
    resizeMode: "cover",
  },
  permissionsMainContainer: {
    flexDirection: "column",
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTextnewOnboarding: {
    fontFamily: Fonts.BoldFont,
    color: "#3F1674",
    fontSize: moderateScaleViewports(20),
    textAlign: "center",
    paddingTop: moderateScaleViewports(31),
    paddingBottom: moderateScaleViewports(15),
    lineHeight: moderateScaleViewports(27),
  },
  subtitleTextnewOnboarding: {
    fontFamily: Fonts.BaseFont,
    color: "#373737",
    fontSize: moderateScaleViewports(16),
    textAlign: "center",
    paddingBottom: moderateScaleViewports(46),
    paddingLeft: moderateScaleViewports(28),
    paddingRight: moderateScaleViewports(28),
    lineHeight: moderateScaleViewports(22),
  },
});
