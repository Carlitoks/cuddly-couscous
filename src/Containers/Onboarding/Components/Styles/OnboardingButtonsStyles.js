import { StyleSheet } from 'react-native';
import { moderateScale, setTextProperties } from '../../../../Util/Scaling';
import Fonts from '../../../../Themes/Fonts';
import { Metrics } from '../../../../Themes';
import colors from '../../../../Themes/Colors';
import { iPhoneXModels, Iphone5, isIphoneXorAbove } from '../../../../Util/Devices';
import metrics from '../../../../Themes/Metrics';

const primaryButton = {
  minWidth: Metrics.width * 0.78,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 30,
  marginTop: metrics.width < 375 ? 15 : 0,
};

export default StyleSheet.create({
  callButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: isIphoneXorAbove() ? 50 : 0,
  },
  callNowButtonContainer: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  callNowButton: {
    ...primaryButton,
    borderColor: '#fff',
    backgroundColor: '#F39100',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  callNowButtonDisable: {
    ...primaryButton,
    borderColor: '#cccccc',
    backgroundColor: colors.gradientColor.bottom
  },
  callNowButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '600'),
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05

  },
  callNowButtonTextDisabled: {
    ...setTextProperties('#ccc', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '600'),
  },
  audioOnlyButtonContainer: { flexDirection: 'column' },
  audioOnlyButton: {
    maxWidth: Metrics.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(30, 0)
  },
  audioOnlyButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '500'),
  },
  audioOnlyButtonTextDisabled: {
    ...setTextProperties('#ccc', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '500'),
  },
  iconPadding: { paddingLeft: metrics.width * 0.05 }
});
