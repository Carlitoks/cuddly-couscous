import { Dimensions, PixelRatio } from "react-native";
import { getDeviceLocale } from "react-native-device-info";

const { width, height } = Dimensions.get("window");
const realWidth = height > width ? width : height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 640;
const guidelineBaseHeight = 1136;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

const setTextProperties = (color, fontFamily, fontSize, fontWeight) => {
  return {
    color,
    fontFamily,
    fontSize,
    fontWeight
  };
};

export { scale, verticalScale, moderateScale, setTextProperties };
