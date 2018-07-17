import { networkError } from "./NetworkErrorsReducer";
import { Sessions } from "../Api";
import { REASON, TIME } from "../Util/Constants";
import {
  updateSettings as updateContactLinguist,
  resetCounter
} from "./ContactLinguistReducer";
import { clear as clearEvents } from "../Ducks/EventsReducer";
import { GetSessionInfoLinguist } from "./SessionInfoReducer";
import { setSession, clear } from "./tokboxReducer";
import I18n from "../I18n/I18n";

import { fmtMSS } from "../Util/Helpers";
import {
  BackgroundInterval,
  BackgroundCleanInterval
} from "../Util/Background";
import {
  emitLocalNotification,
  cleanNotifications
} from "../Util/PushNotification";
import { displayTimeAlert } from "../Util/Alerts";

// Actions
export const ACTIONS = {
  CLEAR: "callCustomerSettings/clear",
  UPDATE: "callCustomerSettings/update",
  CREATEINVITATION: "callCustomerSettings/invitation",
  INCREMENT_TIMER: "callCustomerSettings/incrementTimer",
  INCREMENT_RECONNECT: "callCustomerSettings/incrementReconnect",
  RESET_TIMER: "callCustomerSettings/resetTimer",
  ENDSESSION: "callCustomerSettings/endSession"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const createInvitation = payload => ({
  type: ACTIONS.CREATEINVITATION,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const incrementTimer = () => ({
  type: ACTIONS.INCREMENT_TIMER
});

export const incrementReconnect = () => ({
  type: ACTIONS.INCREMENT_RECONNECT
});

export const resetTimerAsync = () => (dispatch, getState) => {
  const { callCustomerSettings } = getState();

  dispatch(
    updateSettings({
      timer: null,
      elapsedTime: 0
    })
  );
};

export const resetReconnectAsync = () => (dispatch, getState) => {
  const { callCustomerSettings } = getState();
  clearInterval(callCustomerSettings.counterId);
  dispatch(
    updateSettings({
      counterId: null,
      modalReconnectCounter: 0
    })
  );
};

export const endSession = () => ({ type: ACTIONS.ENDSESSION });

export const EndCall = (sessionID, reason, token) => dispatch => {
  return Sessions.EndSession(sessionID, reason, token)
    .then(response => {
      dispatch(endSession());
      if (reason === REASON.CANCEL) {
        dispatch({ type: "Home" });
        dispatch(clearSettings());
        dispatch(clear());
        dispatch(clearEvents());
      } else if (reason === REASON.RETRY) {
        dispatch(updateSettings({ verifyCallId: null }));
        dispatch(clear());
        dispatch({ type: "CustomerView" });
      } else if (reason === REASON.TIMEOUT) {
        dispatch(clear());
      } else {
        dispatch({ type: "RateView" });
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(clearSettings());
      dispatch(clear());
      dispatch(clearEvents());
      dispatch({ type: "Home" });
    });
};

export const resetTimer = () => ({
  type: ACTIONS.RESET_TIMER
});

// create tokbox session, and return sessionID and tokbox token's
// example input values
// type: "immediate_virtual"
// matchMethod: "manual"
// primaryLangCode: "eng",
// secundaryLangCode: "cmn",
//  estimatedMinutes: 20

export const createSession = ({
  primaryLangCode,
  secondaryLangCode,
  estimatedMinutes,
  scenarioID,
  customScenarioNote,
  token,
  eventID
}) => dispatch => {
  return Sessions.createSession(
    "immediate_virtual",
    "first_available",
    primaryLangCode,
    secondaryLangCode,
    estimatedMinutes,
    scenarioID,
    token,
    customScenarioNote,
    eventID
  )
    .then(response => {
      const { data } = response;
      // Set session data
      dispatch(setSession(data));
      // verify if there is linguist available
      dispatch(
        updateSettings({
          verifyCallId: setInterval(
            () => dispatch(verifyCall(data.sessionID, token)),
            5000
          )
        })
      );
      return response.data;
    })
    .catch(error => dispatch(networkError(error)));
};

export const verifyCall = (sessionID, token) => (dispatch, getState) => {
  const { contactLinguist, callCustomerSettings } = getState();
  Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      const { data } = response;

      if (
        ((!data.queue || !data.queue.pending) && !data.queue.sending) ||
        data.status == "cancelled" ||
        data.status == "assigned" ||
        data.queue.declined === data.queue.total
      ) {
        clearInterval(callCustomerSettings.verifyCallId);
      }
      if (
        (contactLinguist.counter > 10 * data.queue.total + 30 &&
          contactLinguist.counterId) ||
        data.queue.declined === data.queue.total ||
        contactLinguist.counter >= 60
      ) {
        clearInterval(contactLinguist.counterId);
        dispatch(resetCounter());

        dispatch(
          updateContactLinguist({
            modalContact: true,
            counter: TIME.RECONNECT,
            messageReconnect: I18n.t("notLinguistAvailable")
          })
        );

        sessionID && dispatch(EndCall(sessionID, REASON.TIMEOUT, token));
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      clearInterval(callCustomerSettings.verifyCallId);
    });
};

export const closeOpenConnections = () => dispatch => {
  dispatch(clearSettings());
  dispatch(clear());
};

export const startReconnect = () => (dispatch, getState) => {
  dispatch(
    updateSettings({
      counterId: setInterval(() => {
        dispatch(incrementReconnect());
      }, 1000)
    })
  );
};

export const startTimer = () => (dispatch, getState) => {
  const { callCustomerSettings } = getState();
  const callTime = !!callCustomerSettings.selectedTime
    ? callCustomerSettings.selectedTime * 60
    : 60 * 60;

  dispatch(
    updateSettings({
      timer: setInterval(() => {
        const {
          elapsedTime,
          extraTime,
          showAlert
        } = getState().callCustomerSettings;
        if (elapsedTime + extraTime < 60 * 60) {
          if (elapsedTime >= callTime + extraTime - 2 * 60) {
            dispatch(
              updateSettings({
                red: true
              })
            );
            if (!showAlert) {
              dispatch(
                updateSettings({
                  showAlert: true
                })
              );
              //Play Sound
              // SoundManager["ExtraTime"].play();
              // displayTimeAlert(extraTime, event => {
              //   dispatch(updateSettings(event));
              // });
            }
          }
          if (elapsedTime > callTime + extraTime) {
            dispatch(closeCall(REASON.DONE));
          } else {
            dispatch(incrementTimer());

            emitLocalNotification({
              title: I18n.t("call"),
              message: `${I18n.t("callInProgress")} ${fmtMSS(elapsedTime)}`
            });
          }
        } else {
          dispatch(closeCall(REASON.DONE));
        }
      }, 1000)
    })
  );
};

export const closeCall = reason => (dispatch, getState) => {
  const { contactLinguist, callCustomerSettings, tokbox, auth } = getState();
  clearInterval(contactLinguist.counterId);
  dispatch(
    updateContactLinguist({
      modalContact: false,
      customScenarioNote: ""
    })
  );
  dispatch(resetCounter());

  if (reason === REASON.RETRY) {
    BackgroundCleanInterval(callCustomerSettings.timer);
    dispatch(resetTimerAsync());
    cleanNotifications();
  }

  SoundManager["EndCall"].play();
  if (reason !== "Abort") {
    tokbox.sessionID && dispatch(EndCall(tokbox.sessionID, reason, auth.token));
  }
  if (reason == "Abort") {
    dispatch({ type: "Home" });
  }
};

// Initial State
const initialState = {
  // Call Settings
  mic: true,
  video: true,
  speaker: true,
  rotate: true,
  timer: null,
  elapsedTime: 0,
  invitationID: null,
  customerPreferredSex: "any",
  verifyCallId: null,
  location: [null, null],
  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 60, // Initial time selected: 10 min
  allowTimeSelection: true,

  //Extra time
  visible: true,
  red: false,
  timeBtn: false,
  showAlert: false,
  extraTime: 0,

  //Reconnect
  counter: 0,
  counterId: null,
  modalReconnect: false,
  modalReconnectCounter: 0,
  modalReconnectCounterId: null,
  messageReconnect: ""
};

// Reducer
const callCustomerSettings = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CREATEINVITATION: {
      return { ...state, invitationID: payload.invitationID };
    }

    case ACTIONS.INCREMENT_TIMER: {
      return {
        ...state,
        elapsedTime: state.elapsedTime + 1
      };
    }

    case ACTIONS.INCREMENT_RECONNECT: {
      return {
        ...state,
        modalReconnectCounter: state.modalReconnectCounter + 1
      };
    }

    case ACTIONS.ENDSESSION: {
      return {
        ...state
      };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};

export default callCustomerSettings;
