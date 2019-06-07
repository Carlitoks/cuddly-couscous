import { Sessions } from "../Api";
import {Alert} from "react-native";
import PushNotification from "../Util/PushNotification";
import { networkError } from "./NetworkErrorsReducer";
import timer from "react-native-timer";
import I18n, { translateLanguage, translateApiError } from "../I18n/I18n";
import {recordPushNotificationEvent, recordAppError} from "../Util/Forensics";
import { receiveSessionInvite, setRemoteUser, handleEndedSession } from "./CurrentSessionReducer";
import api from "../Config/AxiosConfig";
import { displayTimeAlert } from "../Util/Alerts";
import { NotificationActionOption } from "react-native-fcm";

// Actions
export const ACTIONS = {
  REGISTER: "pushnotification/register"
};

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

const getCategory = (session) => {
  if(session && session.scenario){
    if(session.scenario.category && session.scenario.category.length > 0){
      return `${session.scenario.category[0].toUpperCase()}${session.scenario.category.slice(
        1
      )} - ${session.scenario.title}`} else {
      return session.scenario.title;
    }
    }
  return null;
  };

export const incomingCallNotification = invitationId => (dispatch, getState) => {
  const {
    nav,
    auth,
    profileLinguist,
    userProfile
  } = getState();
  const isLinguist = !!userProfile.linguistProfile;
  const CurrentRoutes = nav.routes[0].routes[0].routes;
  const CurrentView = CurrentRoutes.length > 1 ? CurrentRoutes[1].routeName : CurrentRoutes[0].routeName;
  if (
    auth.isLoggedIn &&
    invitationId &&
    isLinguist &&
    profileLinguist.available &&
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

export const registerFCM = payload => ({
  type: ACTIONS.REGISTER,
  payload
});

// Initial State
const initialState = {
  tokenFCM: null
};

// Reducer
const PushNotificationReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.REGISTER: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default PushNotificationReducer;
