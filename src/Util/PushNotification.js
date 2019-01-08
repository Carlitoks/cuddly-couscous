import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";
import { Platform } from "react-native";
import { User } from "../Api";

import { networkError } from "./../Ducks/NetworkErrorsReducer";
import { displayFormErrors } from "../Util/Alerts";
import { PLATFORM } from "../Util/Constants";

class PushNotifications {
  constructor() {
    this.listeners = [];
    this.callbackRemoteNotifications;

    // get permissions
    FCM.requestPermissions()
      .then(() => console.log("granted"))
      .catch(() => console.log("notification permission rejected"));
  }

  registerDeviceInFCM(userId, deviceId, tokenId, cb) {
    // register in fcm - get token
    FCM.getFCMToken().then(token => {
      // save token in sever
      User.updateDevice(userId, deviceId, tokenId, { notificationToken: token })
        .then(res => {
          cb({ tokenFCM: token });
        })
        .catch(error => {
          error.response && error.response.data
            ? displayFormErrors(error.response.data.errors[0])
            : displayFormErrors(error);
        });
    });

    // add handler for refresh token event
    this.listeners.push(
      FCM.on(FCMEvent.RefreshToken, token => {
        User.updateDevice(userId, deviceId, tokenId, {
          notificationToken: token
        })
          .then(res => {
            cb({ tokenFCM: token });
          })
          .catch(error => dispatch(networkError(error)));
      })
    );
  }

  getNotificationsBackground() {
    FCM.getInitialNotification().then(notif => {
      this.callbackRemoteNotifications &&
        this.callbackRemoteNotifications(notif);
      if (notif) {
        FCM.removeDeliveredNotification(notif["google.message_id"]);
      }
    });
  }

  addListener(cb) {
    this.listeners.push(
      FCM.on(FCMEvent.Notification, async notif => {
        await cb(notif);
        if (Platform.OS === PLATFORM.IOS) {
          switch (notif._notificationType) {
            case NotificationType.Remote:
              notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
              break;
            case NotificationType.NotificationResponse:
              notif.finish();
              break;
            case NotificationType.WillPresent:
              notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
              break;
          }
        }
      })
    );
  }

  cleanListeners() {
    this.listeners.forEach(listener => listener.remove());
  }

  setCallbackRemoteNotifications(cb) {
    this.callbackRemoteNotifications = cb;
  }
}

export const emitLocalNotification = details => {
  if (Platform.OS === PLATFORM.ANDROID) {
    FCM.presentLocalNotification({
      title: details.title,
      body: details.message,
      icon: "@drawable/src_images_call_pushn", // temp
      show_in_foreground: false
    });
  }
};

export const cleanNotifications = () => {
  if (Platform.OS === PLATFORM.ANDROID) {
    FCM.removeAllDeliveredNotifications();
    FCM.cancelAllLocalNotifications();
  }
};

export default (PushNotifications = new PushNotifications());
