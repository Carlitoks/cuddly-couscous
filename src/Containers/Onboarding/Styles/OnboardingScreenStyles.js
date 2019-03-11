import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Metrics, Colors } from '../../../Themes';
import { moderateScale } from '../../../Util/Scaling';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: 'white',
    flex: 1,
    
  },
  mainOnboardingContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  bodyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    zIndex: 10
  },
  gradientContainer: {
    flexGrow: 1,
  },
  topLogoContainer: {
    marginTop: moderateScale(95),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: Fonts.BoldFont,
    color: '#fff',
    fontSize: moderateScale(20, 0),
    textAlign: 'center',
    paddingTop: moderateScale(20, 0),
    paddingBottom: moderateScale(20, 0)
  },
  subtitleText: {
    fontFamily: Fonts.BaseFont,
    color: '#fff',
    fontSize: moderateScale(18, 0),
    textAlign: 'center',
    maxWidth: moderateScale(317, 0),
    paddingBottom: moderateScale(40, 0)

  },
  backgroundImageContainer: {
    position: 'absolute',
    bottom: 0,
  },
  backgroundImage: {
    width: moderateScale(Metrics.width ,  0),
    height: moderateScale(Metrics.height  ,  0),
    resizeMode: 'stretch',
  },
  bottomButtonsContainer: { paddingBottom: moderateScale(20, 0) },
  gradientFullWidth: { width: '100%', zIndex: 10 }
});
