import { StyleSheet, PixelRatio } from 'react-native';
import { moderateScale } from '../../../../../Util/Scaling';
import { Fonts, Metrics } from '../../../../../Themes';
import { Iphone5 } from '../../../../../Util/Devices';

const CurrentPixelRatio = PixelRatio.get();

export default StyleSheet.create({
  questionText: {
    color: '#FFFFFF',
    fontFamily: Fonts.ItalicFont,
    fontSize: Iphone5 ? 16 : CurrentPixelRatio <= 1.5 ? moderateScale(21) : moderateScale(21, 0),
    fontWeight: '300',
    textAlign: 'left',
    zIndex: 1000000
  },
  questionHelpText: {
    color: '#FFFFFF',
    fontFamily: Fonts.BaseFont,
    fontSize: Iphone5 ? 19 : CurrentPixelRatio <= 1.5 ? moderateScale(26) : moderateScale(26, 0),
    fontWeight: '300',
    textAlign: 'left'
  },
  questionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 55
  },
  questionsContainerHome: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 55
  },
  scrollContainer: { top: 10, maxWidth: Metrics.width * 0.88 }
});
