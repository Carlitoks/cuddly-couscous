import { StyleSheet } from 'react-native';
import { moderateScaleViewports } from '../../../../Util/Scaling';
import { Fonts, Metrics } from '../../../../Themes';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.90
  },
  availableLangContainer: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.90,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  availableLangContainerText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(14, 0),
    color: '#848688'
  },
  dividerStyle: { backgroundColor: "rgba(90, 90, 90, 0.2)", height: 0.5, width: Metrics.width * 0.80, marginLeft: Metrics.width * 0.05 },
  LangViewContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 19,
    paddingTop: 13
  },
  selectLangButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  availableLangText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    color: "#1C1B1B"
  },
  checkPadding: { paddingRight: 30 },
  closeScenarioList: {
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: -60,
    width: Metrics.width * 0.90,
    left: Metrics.width * 0.05,
    alignItems: "center"
  },
  cancelButtonText: {fontFamily: Fonts.BaseFont, color:"#3F1674", fontSize: 16, paddingTop: 16, paddingBottom: 16},
  iconNameContainer: {flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", paddingLeft: 40},
});
