import BackgroundTimer from "react-native-background-timer";
import { Platform } from "react-native";

export const BackgroundStart = () => {
  if (Platform.OS !== "ios") {
    return;
  } else {
    BackgroundTimer.start();
  }
};

export const BackgroundInterval = (exec, interval) => {
  let id;
  if (Platform.OS !== "ios") {
    id = BackgroundTimer.setInterval(exec, interval);
  } else {
    id = setInterval(exec, interval);
  }
  return id;
};

export const BackgroundCleanInterval = id => {
  if (Platform.OS !== "ios") BackgroundTimer.clearInterval(id);
  else {
    clearInterval(id);
    BackgroundTimer.stop();
  }
};
