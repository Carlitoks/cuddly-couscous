import { StyleSheet } from 'react-native';
import { moderateScale, moderateScaleViewports, setTextProperties } from "../../../../Util/Scaling";
import Fonts from '../../../../Themes/Fonts';
import { Metrics } from '../../../../Themes';
import colors from '../../../../Themes/Colors';
import { iPhoneXModels, Iphone5, isIphoneXorAbove } from '../../../../Util/Devices';
import metrics from '../../../../Themes/Metrics';

const primaryButton = {
  minWidth: Metrics.width * 0.50,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 4,
  marginTop: 20
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
    backgroundColor: "#391367",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  callNowButtonDisable: {
    ...primaryButton,
    borderColor: "#cccccc",
    backgroundColor: colors.gradientColor.bottom
  },
  callNowButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, moderateScaleViewports(16), '600'),
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10),
  },
  callNowButtonTextDisabled: {
    ...setTextProperties('#ccc', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '600')
  },
  audioOnlyButtonContainer: { flexDirection: 'column' },
  audioOnlyButton: {
    maxWidth: Metrics.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScaleViewports(23),
    paddingBottom: moderateScaleViewports(12)
  },
  audioOnlyButtonText: {
    ...setTextProperties('#848688', Fonts.BaseFont, moderateScaleViewports(14)),
  },
  signInText: {
    ...setTextProperties('#391367', Fonts.BaseFont, moderateScaleViewports(14)),
    textDecorationLine: "underline",
  },
  audioOnlyButtonTextDisabled: {
    ...setTextProperties('#ccc', Fonts.BaseFont, Iphone5 ? 14 : moderateScale(17, 0), '500')
  },
  iconPadding: { paddingLeft: metrics.width * 0.05 }
});
