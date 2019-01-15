import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1
  },
  wavesSection: {
    position: 'absolute',
    bottom: 0
  },
  absolutePosition: {
    position: 'absolute'
  },
  questionsContainer: {
    zIndex: 100,
    paddingLeft: 20,
    marginTop: 40
  }
});
