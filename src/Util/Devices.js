import DeviceInfo from "react-native-device-info";
import { Platform, Dimensions } from 'react-native';

const IphoneX = DeviceInfo.getModel() == "iPhone X";

export const Iphone10 = DeviceInfo.getModel() == "iPhone X";
export const Android = DeviceInfo.getSystemName() == "Android";
export const LocaleLanguage = DeviceInfo.getDeviceLocale();
export const Iphone5 =
  DeviceInfo.getModel() == "iPhone 5" ||
  DeviceInfo.getModel() == "iPhone 5s" ||
  DeviceInfo.getModel() == "iPhone SE";

export const Iphone6 =
  DeviceInfo.getModel() == "iPhone 6" ||
  DeviceInfo.getModel() == "iPhone 6 Plus";

export const iPhoneXModels =
  DeviceInfo.getDeviceName() == "iPhone X" ||
  DeviceInfo.getDeviceName() == "iPhone XR" ||
  DeviceInfo.getDeviceName() == "iPhone XS" ||
  DeviceInfo.getDeviceName() == "iPhone XS Max";

export function isIphoneXorAbove() {   const dimen = Dimensions.get('window');   return (     Platform.OS === 'ios' &&     !Platform.isPad &&     !Platform.isTVOS &&     ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))   ); }

let top;
export const topIOS = () => {
  if (IphoneX) {
    top = 0;
  } else {
    top = 0;
  }
  return top;
};
