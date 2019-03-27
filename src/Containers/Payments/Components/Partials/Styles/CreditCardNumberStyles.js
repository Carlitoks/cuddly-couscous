import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../../../Themes';

export default StyleSheet.create({
  CCNContainer: {flexDirection: 'column'},
  CCNText: {fontFamily: Fonts.BaseFont, fontSize: 12, color: '#3F1674', margin: 0},
  CCNInputContainer: {flexDirection: 'row'},
  CCNInput: {color: "#000", borderBottomWidth: 2, borderBottomColor: '#3F1674', width: Metrics.width * 0.79, padding: 3},
  CCIconContainer: {position: 'absolute', right: -5, top: -5},
  CCIcon: {width: 42, height: 42},
  CCNInvalidText: {fontFamily: Fonts.BaseFont, fontSize: 15, color: 'rgba(231, 0, 0, 0.87)', marginTop: 3},
});
