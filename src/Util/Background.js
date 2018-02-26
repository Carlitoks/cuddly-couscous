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
  var id;
  if (Platform.OS !== "ios") {
    id = BackgroundTimer.setInterval(exec, interval);
  } else {
    id = setInterval(exec, interval);
    console.log("Background", id);
  }

  return id;
};

export const BackgroundCleanInterval = id => {
  if (Platform.OS !== "ios") BackgroundTimer.clearTimeout(id);
  else {
    clearInterval(id);
    BackgroundTimer.stop();
  }
};
