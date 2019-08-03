import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Metrics, Colors } from '../../../Themes';
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: 'white',
    flexGrow: 1,

  },
  scroll: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  mainOnboardingContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  bodyContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: "75%",
    width: "100%"
  },
  topLogoContainer: {
    marginTop: moderateScale(95),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: '#3F1674',
    fontSize: moderateScaleViewports(20),
    textAlign: 'center',
    paddingTop: moderateScaleViewports(31),
    paddingBottom: moderateScaleViewports(15),
    lineHeight: moderateScaleViewports(27),
  },
  subtitleText: {
    fontFamily: Fonts.BaseFont,
    color: '#373737',
    fontSize: moderateScaleViewports(16),
    textAlign: 'center',
    paddingBottom: moderateScaleViewports(46),
    paddingLeft: moderateScaleViewports(28),
    paddingRight: moderateScaleViewports(28),
    lineHeight: moderateScaleViewports(22),
  },
  backgroundImage: {
    width: metrics.width,
    height: metrics.height * 0.50,
    resizeMode: 'cover',
  },
  bottomButtonsContainer: { paddingBottom: moderateScale(0, 0) },
  gradientFullWidth: { width: '100%', zIndex: 10 }
});
