import { StyleSheet } from 'react-native';
import { ApplicationStyles, Fonts, Metrics } from '../../../Themes';
import { moderateScale } from '../../../Util/Scaling';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
  gradientContainer: {
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  topLogoContainer: {
    marginTop: moderateScale(76, 0),
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
    marginBottom: moderateScale(39, 0)
  },
  backgroundImageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: moderateScale(248, 0)
  },
  backgroundImage: { width: moderateScale(286, 0) },
  bottomButtonsContainer: { paddingBottom: moderateScale(35, 0), alignItems: 'center',flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 15},
  allSet: {
    fontFamily: Fonts.BaseFont,
    color: '#fff',
    fontSize: moderateScale(36, 0),
    textAlign: 'center',
    marginTop: moderateScale(88, 0)
  },
  fullBackgroundCover: {
    width: '100%', height: '100%'
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
  backgroundOpacity: {opacity: 0.5},
  gradientFullWidth: { width: '100%', zIndex: 10 }
});
