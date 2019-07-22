import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../../../Themes';
import metrics from "../../../../../Themes/Metrics";

export default StyleSheet.create({
  EDContainer: {flexDirection: 'column'},
  EDText: {color: "rgba(0, 0, 0, 0.541327)", fontFamily: Fonts.BaseFont, fontSize: 12},
  CCNInputContainer: {flexDirection: 'row'},
  EDInput: {color: "#000", borderBottomWidth: 2, borderBottomColor: 'rgba(0, 0, 0, 0.42)', width: metrics.width * 0.35, padding: 1},
  CCIconContainer: {position: 'absolute', right: -5, top: -5},
  CCIcon: {width: 42, height: 42},
  CCNInvalidText: {fontFamily: Fonts.BaseFont, fontSize: 15, color: 'rgba(231, 0, 0, 0.87)', marginTop: 3},
});
