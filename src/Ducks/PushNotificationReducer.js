import { Sessions } from "../Api";
import { updateSettings as updateCallLinguistSettings } from "./CallLinguistSettings";
import { updateConnectingMessage } from "./ContactLinguistReducer";
import { updateSettings as updateProfileLinguist } from "./ProfileLinguistReducer";
import { update as updateTokbox } from "./tokboxReducer";
import SoundManager from "../Util/SoundManager";
import PushNotification from "../Util/PushNotification";
import { LANG_CODES } from "../Util/Constants";

// Actions
export const ACTIONS = {
  REGISTER: "pushnotification/register"
};

export const remoteNotificationReceived = notification => dispatch => {
  switch (notification.type) {
    case "session:incoming-call":
      dispatch(incomingCallNotification(notification.invitationID));
      break;

    case "session:linguist-accepted":
      dispatch(linguistAcceptedNotification(JSON.parse(notification.linguist)));
      break;

    case "session:connection-event":
      dispatch(connectionEventNotification());
      break;

    case "session:end":
      dispatch(sessionEndNotification());
      break;

    default:
      break;
  }
};

const incomingCallNotification = invitationId => (dispatch, getState) => {
  const state = getState();
  const isLinguist = !!state.userProfile.linguistProfile;

  if (
    state.auth.isLoggedIn &&
    invitationId &&
    isLinguist &&
    state.profileLinguist.available
  ) {
    Sessions.linguistFetchesInvite(invitationId, state.auth.token)
      .then(res => {
        const data = res.data;
        dispatch(
          updateCallLinguistSettings({
            invitationID: invitationId,
            reconnecting: false
          })
        );
        dispatch(updateTokbox({ sessionID: data.session.id }));
        dispatch(
          updateCallLinguistSettings({
            customerName: data.createdBy
              ? `${data.createdBy.firstName} ${data.createdBy.lastInitial}.`
              : "",
            avatarURL: data.createdBy ? data.createdBy.avatarURL : "",
            estimatedMinutes: data.session.estimatedMinutes
              ? `~ ${data.session.estimatedMinutes} mins`
              : `~ Unspecified`,
            languages:
              data.session &&
              `${LANG_CODES.get(
                data.session.primaryLangCode
              )} - ${LANG_CODES.get(data.session.secondaryLangCode)}`,
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
        dispatch({ type: "LinguistView" });
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

const sessionEndNotification = () => () => {
  console.log("sessionEndNotification");
  //dispatch({ type: "RateView" });
};

export const addListeners = () => dispatch => {
  // Listener to notificaciones received by the app in active state
  PushNotification.addListener(notif => {
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
