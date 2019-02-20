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
import I18n, { translateLanguage } from "../I18n/I18n";
import {recordPushNotificationEvent} from "../Util/Forensics";

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

    case "session:connection-event":
      recordPushNotificationEvent("session:connection-event", notification);
      dispatch(connectionEventNotification());
      break;

    case "session:end":
      recordPushNotificationEvent("session:end", notification);
      dispatch(sessionEndNotification(notification.sessionID));
      break;

    default:
      break;
  }
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
    CurrentView != "IncomingCallView" &&
    CurrentView != "LinguistView" && 
    CurrentView != "RateView"
  ) {
    timer.clearInterval("counterId");
    timer.clearInterval("timer");
    timer.clearInterval("verifyCallId");
    dispatch(clear());
    Sessions.linguistFetchesInvite(invitationId, auth.token)
      .then(res => {
        const data = res.data;
        dispatch(
          updateSettings({
            invitationID: invitationId,
            reconnecting: false,
            sessionID: data.session.id
          })
        );
        dispatch(
          updateSettings({
            customerName: data.createdBy
              ? `${data.createdBy.firstName} ${data.createdBy.lastInitial}.`
              : "",
            avatarURL: data.createdBy ? data.createdBy.avatarURL : "",
            estimatedMinutes: data.session.estimatedMinutes
              ? `~ ${data.session.estimatedMinutes} mins`
              : `~ Unspecified`,
            languages:
              data.session &&
              `${translateLanguage(data.session.primaryLangCode)} - ${translateLanguage(data.session.secondaryLangCode)}`,
            customScenarioNote: data.session && data.session.customScenarioNote,
            customerScenario:
              data.session &&
              data.session.scenario &&
              `${data.session.scenario.category.length > 0 &&
                `${data.session.scenario.category[0].toUpperCase()}${data.session.scenario.category.slice(
                  1
                )}`} - ${data.session.scenario.title}`
          })
        );
          Sessions.GetSessionInfoLinguist(data.session.id, auth.token).then((session) => {
            if(session.data.status === 'unassigned'){
              if(data.responded || data.accepted){
                dispatch({ type: "Home" });
              } else {
                dispatch({ type: "IncomingCallView" });
              }
            }
            if (session.data.status === "cancelled") {
              dispatch({ type: "Home", params: { alertCancelled: true } });
            }
            if (session.data.status === "assigned") {
              if (auth.uuid !== session.data.linguist.id) {
                Alert.alert(I18n.t("notification"), I18n.t("session.callAnswered"));
              }
              dispatch({ type: "Home"});
            }
          }).catch(error => console.log(error));
      })
      .catch(error => dispatch(networkError(error)));
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
