import DeviceInfo from "react-native-device-info";

const IphoneX = DeviceInfo.getModel() == "iPhone X";

export const LocaleLanguage = DeviceInfo.getDeviceLocale();
export const Iphone5 =
  DeviceInfo.getModel() == "iPhone 5" || DeviceInfo.getModel() == "iPhone 5s";

let top;
export const topIOS = () => {
  if (IphoneX) {
    top = 0;
  } else {
    top = 0;
  }
  return top;
};
