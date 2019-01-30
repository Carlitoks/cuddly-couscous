import { StyleSheet, Platform } from 'react-native';
import { moderateScale, setTextProperties } from '../../../../Util/Scaling';
import Fonts from '../../../../Themes/Fonts';
import { Metrics } from '../../../../Themes';
import { iPhoneXModels, Iphone5 } from '../../../../Util/Devices';
import metrics from "../../../../Themes/Metrics";

const WellContainerStyles = {
  width: Metrics.width * 0.89,
  backgroundColor: '#CDCDF4',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 4,
  borderColor: '#CDCDF4',
  zIndex: 10
};

const iOS = Platform.OS === 'ios';

const renderMarginTopHome = () => {
  if (Iphone5) {
    return moderateScale(-90, 0);
  }
  if (iPhoneXModels) {
    return moderateScale(-150);
  }
  if (iOS) {
    return moderateScale(-100, 0);
  }
  return moderateScale(-100, 0);
};

const renderMarginTopGeneral = () => {
  if (iOS) {
    if (metrics.width <= 320) {
      return moderateScale(80);
    }
    if (metrics.width >= 370) {
      return moderateScale(110);
    }
    return moderateScale(95);
  } else {
    return moderateScale(95);
  }
};

export default StyleSheet.create({
  freeMinutesWellContainer: {
    ...WellContainerStyles,
    marginTop: renderMarginTopGeneral()
  },
  freeMinutesWellContainerHome: {
    ...WellContainerStyles,
    marginTop: renderMarginTopHome()
  },
  pillButtonContainer: {
    backgroundColor: '#63A901',
    maxHeight: Metrics.height * 0.0525,
    alignSelf: 'flex-start',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255,255,255,0.55)',
    top: -13,
    left: 8,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    padding: 10
  },
  pillButtonText: {
    ...setTextProperties('#fff', Fonts.BoldFont, Iphone5 ? 14 : moderateScale(16, metrics.width < 360 ? 0.5 : 0), '600'),
    paddingLeft: 5
  },
  wellTitle: {
    ...setTextProperties('#401674', Fonts.BoldFont, Iphone5 ? 15 : moderateScale(21, metrics.width < 360 ? 0.5 : 0), null),
    paddingLeft: 15,
    marginTop: -10
  },
  wellSubtitle: {
    ...setTextProperties('#401674', Fonts.ItalicFont, Iphone5 ? 12 : moderateScale(13, metrics.width < 360 ? 0.5 : 0), null),
    paddingLeft: 15,
    marginTop: -10
    // paddingBottom: 15
  },
  pricingPillText: {
    ...setTextProperties('#401674', Fonts.ItalicFont, Iphone5 ? 14 : moderateScale(16, metrics.width < 360 ? 0.5 : 0), '600'),
    textAlign: 'center',
    paddingLeft: 5
  },
  availableMinutesPillText: {
    ...setTextProperties('#fff', Fonts.BaseFont, moderateScale(25, metrics.width < 360 ? 0.5 : 0), '500'),
    alignSelf: 'center'
  }
});
