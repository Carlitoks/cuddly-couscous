import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../../Util/Scaling';
import { Metrics, Colors, Fonts } from '../../../../../Themes';
import { iPhoneXModels, Iphone5, isIphoneXorAbove } from '../../../../../Util/Devices';

export default StyleSheet.create({
  callButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: isIphoneXorAbove() ? 50 : 0
  },
  callNowButtonContainer: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  callNowButton: {
    minWidth: Metrics.width * 0.78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 27,
    backgroundColor: '#F39100',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  callNowButtonDisable: {
    minWidth: Metrics.width * 0.78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 27,
    backgroundColor: Colors.gradientColor.bottom
  },
  callNowButtonText: {
    color: 'white',
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    fontWeight: '600',
    fontFamily: Fonts.BaseFont,
    paddingTop: Metrics.width * 0.05,
    paddingBottom: Metrics.width * 0.05,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05
  },
  callNowButtonTextDisabled: {
    color: '#ccc',
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    fontWeight: '600',
    fontFamily: Fonts.BaseFont,
    paddingTop: Metrics.width * 0.045,
    paddingBottom: Metrics.width * 0.045,
    paddingLeft: Metrics.width * 0.05,
    paddingRight: Metrics.width * 0.05
  },
  audioOnlyButtonContainer: { flexDirection: 'column' },
  audioOnlyButton: {
    minWidth: Metrics.width * 0.78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(10, 0)
  },
  audioOnlyButtonText: {
    color: 'white',
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    fontWeight: '500',
    fontFamily: Fonts.BaseFont,
    paddingBottom: Metrics.width * 0.02
  },
  audioOnlyButtonTextDisabled: {
    color: '#ccc',
    fontSize: Iphone5 ? 14 : moderateScale(17, 0),
    fontWeight: '500',
    fontFamily: Fonts.BaseFont,
    paddingBottom: Metrics.width * 0.02
  },
  iconPadding: { paddingLeft: Metrics.width * 0.05 }
});
