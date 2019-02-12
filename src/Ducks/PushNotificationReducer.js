import { Sessions } from "../Api";
import {Alert} from "react-native";
import { updateSettings as updateCallLinguistSettings } from "./CallLinguistSettings";
import { updateConnectingMessage } from "./ContactLinguistReducer";
import { updateSettings as updateProfileLinguist } from "./ProfileLinguistReducer";
import { update as updateTokbox, clear } from "./ActiveSessionReducer";
import { updateSettings } from "./CallLinguistSettings";
import { updateOptions as updateRate } from "./RateCallReducer";
import { REASON } from "../Util/Constants";
import { closeCall } from "./ActiveSessionReducer";
import SoundManager from "../Util/SoundManager";
import PushNotification from "../Util/PushNotification";
import { networkError } from "./NetworkErrorsReducer";
import timer from "react-native-timer";
import I18n, { translateLanguage, translateApiError } from "../I18n/I18n";
import {recordPushNotificationEvent, recordAppError} from "../Util/Forensics";
import { receiveSessionInvite } from "./CurrentSessionReducer";
import api from "../Config/AxiosConfig";

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
      dispatch(linguistAcceptedNotification(JSON.parse(notification.linguist)));
      break;

    case "session:end":
      recordPushNotificationEvent("session:end", notification);
      dispatch(sessionEndNotification(notification.sessionID));
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
    contactLinguist,
    activeSessionReducer,
    auth,
    profileLinguist,
    callLinguistSettings,
    userProfile
  } = getState();
  const isLinguist = !!userProfile.linguistProfile;
  const CurrentView = nav.routes[0].routes[0].routes[0].routeName;
  if (
    auth.isLoggedIn &&
    invitationId &&
    isLinguist &&
    profileLinguist.available &&
    CurrentView != "LinguistIncomingCallView" &&
    CurrentView != "SessionView" &&
    CurrentView != "RateView"
  ) {

    // fetch invite, validate status, display incoming call if relevant
    api.get(`/session-invitations/${invitationId}`)
    .then ((res) => {
      dispatch(receiveSessionInvite(res.data));
      return api.get(`/sessions/${res.data.session.id}/linguist`);
    })
    .then((res) => {
      switch (res.data.status) {
        case "unassigned": {
          dispatch({ type: "LinguistIncomingCallView" });
          break;
        }
        case "assigned": {
          Alert.alert(I18n.t("notification"), I18n.t("session.callAnswered"));
          break;
        }
        case "cancelled": {
          Alert.alert(I18n.t("notification"), I18n.t("session.callCancel"));
          break;
        }
      }
    })
    .catch((e) => {
      Alert.alert(I18n.t("error"), translateApiError(e));
      // TODO: record forensics error
      // TODO: nav to home + alert?
    });
  }
};

const linguistAcceptedNotification = linguist => (dispatch, getState) => {
  // Logic when a linguist accept a call
  dispatch(updateConnectingMessage(linguist));
};

const connectionEventNotification = () => () => {
  console.log("connectionEventNotification");
  //TODO: Logic when receive a connection notification
};

const sessionEndNotification = sessionID => (dispatch, getState) => {
  const { nav, activeSessionReducer } = getState();
  const CurrentView = nav.routes[0].routes[0].routes[0].routeName;
  if (
    sessionID == activeSessionReducer.sessionID &&
    !activeSessionReducer.endingSession
  ) {
    if (
      !activeSessionReducer.isLinguist &&
      activeSessionReducer.elapsedTime === 0
    ) {
      dispatch(closeCall(REASON.CANCEL), true);
    } else {
      dispatch(closeCall(REASON.DONE));
    }
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
