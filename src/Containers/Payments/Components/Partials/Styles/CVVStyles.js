import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../../../Themes';
import metrics from "../../../../../Themes/Metrics";

export default StyleSheet.create({
  CVVContainer: {flexDirection: 'column'},
  CVVText: {color: "rgba(0, 0, 0, 0.541327)", fontFamily: Fonts.BaseFont, fontSize: 12},
  CVVInputContainer: {flexDirection: 'row'},
  CVVInput: {color: "#000", borderBottomWidth: 2, borderBottomColor: '#3F1674', width: metrics.width * 0.35, padding: 1},
  CVVconContainer: {position: 'absolute', right: -5, top: -5},
  CVVcon: {width: 42, height: 42},
  CVVInvalidText: {fontFamily: Fonts.BaseFont, fontSize: 15, color: 'rgba(231, 0, 0, 0.87)', marginTop: 3},
});
