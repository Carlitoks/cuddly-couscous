import { Dimensions } from "react-native";
import { getDeviceLocale } from 'react-native-device-info';

const { width, height } = Dimensions.get("window");
const realWidth = height > width ? width : height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 640;
const guidelineBaseHeight = 1136;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0) => {
  localeLang = getDeviceLocale().split('-')[0];
  localeLang !== 'en' ? factor = 0.5 : 0;
  return size + (scale(size) - size) * factor;
};

const scaledFontSize = fontSize => {
  const scaleFactor = width <= 375 ? 1 : width <= 414 ? 1.15 : 1.25;
  return fontSize * scaleFactor;
};

export { scale, verticalScale, moderateScale, scaledFontSize };
