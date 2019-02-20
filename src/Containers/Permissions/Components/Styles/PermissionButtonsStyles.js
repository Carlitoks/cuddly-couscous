import { StyleSheet } from 'react-native';
import { moderateScale, setTextProperties } from '../../../../Util/Scaling';
import Fonts from '../../../../Themes/Fonts';
import { Metrics } from '../../../../Themes';
import colors from '../../../../Themes/Colors';
import { iPhoneXModels, Iphone5 } from '../../../../Util/Devices';
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
  permissionButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: iPhoneXModels ? 50 : 0,
  },
  checkPermissionContainer: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  checkPermissionButton: {
    ...primaryButton,
    borderColor: '#fff',
    backgroundColor: '#F39100',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  checkPermissionButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '600'),
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05

  },
  skipButtonContainer: { flexDirection: 'column' },
  skipButton: {
    maxWidth: Metrics.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(24, 0)
  },
  skipButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '500'),
  },
});
