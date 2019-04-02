import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../../Util/Scaling';
import { Fonts, Metrics } from '../../../../Themes';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    left: 4,
    width: Metrics.width * 0.98,
    borderRadius: 5
  },
  availableLangContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(185,185,185,0.14)'
  },
  availableLangContainerText: {
    paddingLeft: 14,
    fontWeight: '500',
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14, 0),
    color: '#333333'
  },
  dividerStyle: { backgroundColor: '#CCCCCC', height: 1 },
  LangViewContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  selectLangButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  availableLangText: {
    paddingLeft: 26,
    fontWeight: '500',
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  checkPadding: { paddingRight: 30 },
});
