import { Dimensions, PixelRatio } from "react-native";
import { getDeviceLocale } from "react-native-device-info";
import {Metrics} from "../Themes";
import { isIphoneXorAbove } from "./Devices";
import { signalEvent } from "../Ducks/ActiveSessionReducer";

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

const moderateScaleViewports = (size, factor = 0.5) => {
  if(width > 320 && width <= 360)
    factor = 0.25;
  if(width > 360)
    factor = 0;
  if(width >= 414)
    factor = -0.3;
  return size + (scale(size) - size) * factor;
};

export const moderateFontSize = (size) => {
  return isIphoneXorAbove() ? size + 2 : size;
};

export const scaleFontSize = (size, factor = 0.5) => {
  return moderateScale(moderateFontSize(size), factor);
};

const setTextProperties = (color, fontFamily, fontSize, fontWeight) => {
  return {
    color,
    fontFamily,
    fontSize,
    fontWeight
  };
};

export { scale, verticalScale, moderateScale, setTextProperties, moderateScaleViewports };
