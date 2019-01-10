import DeviceInfo from "react-native-device-info";

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

let top;
export const topIOS = () => {
  if (IphoneX) {
    top = 0;
  } else {
    top = 0;
  }
  return top;
};
