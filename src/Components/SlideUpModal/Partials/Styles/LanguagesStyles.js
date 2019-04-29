import { StyleSheet } from 'react-native';
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";
import { Fonts, Metrics } from '../../../../Themes';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.90,
  },
  availableLangContainer: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.90,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  availableLangContainerText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(14, 0),
    color: '#1C1B1B'
  },
  dividerStyle: { backgroundColor: "rgba(90, 90, 90, 0.2)", height: 0.5, width: Metrics.width * 0.80, marginLeft: Metrics.width * 0.05 },
  unAvailableLangContainer: {
    height: 48,
    width: '100%',
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
  },
  unAvailableLangContainerText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(14, 0),
    color: '#1C1B1B'
  },
  LangViewContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4'
  },
  selectLangButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  unAvailableLangText: {
    paddingLeft: 45,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    color: "#848688"
  },
  availableLangText: {
    paddingLeft: 45,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    color: "#1C1B1B"
  },
  checkPadding: { paddingRight: 30 },
});
