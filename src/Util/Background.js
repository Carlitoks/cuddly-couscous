import BackgroundTimer from "react-native-background-timer";
import { Platform } from "react-native";
import { PLATFORM } from "../Util/Constants";

export const BackgroundStart = () => {
  if (Platform.OS !== PLATFORM.IOS) {
    return;
  } else {
    BackgroundTimer.start();
  }
};

export const BackgroundInterval = (exec, interval) => {
  let id;
  if (Platform.OS !== PLATFORM.IOS) {
    id = BackgroundTimer.setInterval(exec, interval);
  } else {
    id = setInterval(exec, interval);
  }
  return id;
};

export const BackgroundCleanInterval = id => {
  if (Platform.OS !== PLATFORM.IOS) BackgroundTimer.clearInterval(id);
  else {
    clearInterval(id);
    BackgroundTimer.stop();
  }
};
