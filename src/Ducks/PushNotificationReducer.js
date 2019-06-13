import {Alert} from "react-native";
import PushNotification from "../Util/PushNotification";
import I18n, { translateApiError } from "../I18n/I18n";
import {recordPushNotificationEvent } from "../Util/Forensics";
import { receiveSessionInvite, setRemoteUser, handleEndedSession } from "./CurrentSessionReducer";
import api from "../Config/AxiosConfig";

export const remoteNotificationReceived = notification => dispatch => {
  switch (notification.type) {
    case "session:incoming-call":
      recordPushNotificationEvent("session:incoming-call", notification);
      dispatch(incomingCallNotification(notification.invitationID));
      break;

    case "session:linguist-accepted":
      recordPushNotificationEvent("session:linguist-accepted", notification);
      dispatch(linguistAcceptedNotification(notification));
      break;

    case "session:end":
      recordPushNotificationEvent("session:end", notification);
      dispatch(sessionEndNotification(notification));
      break;

    default:
      break;
  }
};

export const incomingCallNotification = invitationId => (dispatch, getState) => {
  const {
    nav,
    auth2,
    account,
  } = getState();
  const isLinguist = !!account.linguistProfile;
  const CurrentRoutes = nav.routes[0].routes[0].routes;
  const CurrentView = CurrentRoutes.length > 1 ? CurrentRoutes[1].routeName : CurrentRoutes[0].routeName;
  if (
    auth2.isLoggedIn &&
    invitationId &&
    isLinguist &&
    account.linguistProfile.available &&
    CurrentView != "LinguistIncomingCallView" &&
    CurrentView != "SessionView" &&
    CurrentView != "RateView"
  ) {
    if (!invitationId) {
      return;
    }

    // TODO: consider blacklisting previously handled invites here

    // fetch invite, validate status, display incoming call if relevant
    api.get(`/session-invitations/${invitationId}`)
    .then ((res) => {
      // don't handle if we've already responded to or viewed this invite
      if (res.data.responded || res.data.viewed) {
        return Promise.resolve(false);
      }
      dispatch(receiveSessionInvite(res.data));
      return api.get(`/sessions/${res.data.session.id}/linguist`);
    })
    .then((res) => {
      if (!res) {
        return;
      }

      switch (res.data.status) {
        case "unassigned": {
          dispatch({ type: "LinguistIncomingCallView" });
          break;
        }
        case "assigned": {
          Alert.alert(I18n.t("notification"), I18n.t("session.incoming.assigned"));
          break;
        }
        case "cancelled": {
          Alert.alert(I18n.t("notification"), I18n.t("session.incoming.cancelled"));
          break;
        }
        default: {
          Alert.alert(I18n.t("notification"), I18n.t("session.incoming.unavailable"));
        }
      }
    })
    .catch((e) => {
      if (!!e && !!e.response && !!e.response.data) {
        console.log('error receiving invite', e.response.data);
      }

      Alert.alert(I18n.t("error"), translateApiError(e));

      // TODO: record forensics error
      // TODO: nav to home + alert?
    });
  }
};

const linguistAcceptedNotification = (notification) => (dispatch, getState) => {
  // Logic when a linguist accept a call
  if (getState().currentSessionReducer.sessionID == notification.sessionID) {
    dispatch(setRemoteUser(notification.linguist));
  }
};

const sessionEndNotification = (notification) => (dispatch, getState) => {
  const { currentSessionReducer } = getState();
  if (
    notification.sessionID == currentSessionReducer.sessionID
    && !currentSessionReducer.status.ending
    && !currentSessionReducer.status.ended
  ) {
    dispatch(handleEndedSession(notification.endReason));
  }
};

sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const addListeners = () => dispatch => {
  // Listener to notificaciones received by the app in active state
  PushNotification.addListener(async notif => {
    await this.sleep(500);
    dispatch(remoteNotificationReceived(notif));
  });
  // set callback for the remote notifications received by the app in background state
  PushNotification.setCallbackRemoteNotifications(notif => {
    if (notif) {
      dispatch(remoteNotificationReceived(notif));
    }
  });
};
