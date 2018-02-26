import { Platform } from "react-native";

export const ActionNotificationRegister = () => {
  // for register actions
};

export const CleanCallNotifications = details => {
  if (Platform.OS === "ios") return;

  //PushNotification.clearAllNotifications();
};

export const EmitActionNotification = details => {
  // for emit actions
};

export const EmitLocalCallNotification = details => {
  if (Platform.OS === "ios") return;

  /*PushNotification.localNotification({
    title: details.title, 
    message: details.message,
    vibrate: false,
    ongoing: true,
    playSound: false,
    id: details.id || '0',
    largeIcon: "@drawable/src_images_call_pushn", // temp
    smallIcon: "@drawable/src_images_call_pushn", // temp
  });*/
};
