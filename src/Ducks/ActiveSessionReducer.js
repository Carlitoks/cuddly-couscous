import InCallManager from "react-native-incall-manager";
import moment from "moment";
import _sortBy from "lodash/sortBy";
import { Vibration } from "react-native";
import { GetSessionInfoLinguist } from "./SessionInfoReducer";
import { REASON, STATUS_TOKBOX, TIME, LANG_CODES } from "../Util/Constants";
import { networkError } from "./NetworkErrorsReducer";
import {
  updateSettings as updateContactLinguist,
  resetCounter
} from "./ContactLinguistReducer";
import { clear as clearEvents } from "../Ducks/EventsReducer";
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
import { updateSettings as updateLinguistSettings } from "./CallLinguistSettings";
import { updateSettings as updateCustomerSettings } from "./CallCustomerSettings";
import { updateOptions as updateRate } from "./RateCallReducer";
import { displayTimeAlert, displayEndCall } from "../Util/Alerts";
import { Sessions, CallHistory } from "../Api";
import {
  changeStatus,
  updateSettings as updateProfileLinguist
} from "./ProfileLinguistReducer";
import SoundManager from "../Util/SoundManager";

const ACTIONS = {
  CLEAR: "activeSession/clear",
  UPDATE: "activeSession/update",
  ERROR: "activeSession/error",
  TOKEVENT: "activeSession/tokboxevent",
  SET_SESSION: "activeSession/setSession",
  ERROR: "activeSession/error", // CHECK
  CREATEINVITATION: "activeSession/invitation",
  INCREMENT_TIMER: "activeSession/incrementTimer",
  INCREMENT_RECONNECT: "activeSession/incrementReconnect",
  RESET_TIMER: "activeSession/resetTimer",
  RESET_COUNTER: "activeSession/resetCounter",
  ENDSESSION: "activeSession/endSession",
  INVITATIONDETAIL: "activeSession/invitationDetail",
  INVITATIONACCEPT: "activeSession/invitationAccept"
};

export const clear = () => ({
  type: ACTIONS.CLEAR
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const error = payload => ({
  type: ACTIONS.ERROR,
  payload
});

export const opentok_event = payload => ({
  type: ACTIONS.TOKEVENT,
  payload
});

export const setSession = payload => ({
  type: ACTIONS.SET_SESSION,
  payload
});

export const createInvitation = payload => ({
  type: ACTIONS.CREATEINVITATION,
  payload
});

export const invitationDetail = payload => ({
  type: ACTIONS.INVITATIONDETAIL,
  payload
});

export const invitationAccept = payload => ({
  //CHECK
  type: ACTIONS.INVITATIONACCEPT,
  payload
});

export const incrementTimer = () => ({
  type: ACTIONS.INCREMENT_TIMER
});

export const incrementReconnect = () => ({
  type: ACTIONS.INCREMENT_RECONNECT
});

export const resetCounterVerify = () => ({
  type: ACTIONS.RESET_COUNTER
});

const initialState = {
  //TOKBOX STATES
  sessionID: null,
  tokboxID: null,
  tokboxToken: null,
  status: STATUS_TOKBOX.DISCONECTED,
  error: null,
  tokevent: null,
  signal: { data: "", type: "" },
  disabledSubscriber: false,
  customerIsConnected: false,
  linguistIsConnected: false,

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
  accept: false,
  customerPreferredSex: "any",
  customerName: null,
  isLinguist: false,
  firstName: "",
  lastInitial: "",
  avatarURL: "",
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
  messageReconnect: "",
  reconnecting: false,

  //Tokbox Video Warnings
  localVideoWarning: "DISABLED",
  signalVideoWarning: "DISABLED"
};

//TOKBOX'S EVENTS

export const connectionConnectedEvent = () => (dispatch, getState) => {
  dispatch(
    opentok_event({
      status: "SESSION_CONNECTED"
    })
  );
};

export const connectionDisconnectEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "SESSION_DESTROYED"
    })
  );
};

export const signalEvent = event => (dispatch, getState) => {
  const { userProfile, activeSessionReducer, auth } = getState();
  dispatch(opentok_event({ status: "ON_SIGNAL_RECEIVED", payload: event }));
};

export const sessionDestroyedEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "SESSION_DESTROYED",
      payload: event
    })
  );
};

export const streamCreatedEvent = event => async (dispatch, getState) => {
  const { activeSessionReducer, auth, userProfile, sessionInfo } = getState();
  dispatch(
    update({
      status: STATUS_TOKBOX.STREAM
    })
  );
  if (!userProfile.linguistProfile) {
    dispatch(
      GetSessionInfoLinguist(activeSessionReducer.sessionID, auth.token)
    );
    await InCallManager.start({ media: "audio" });
    await InCallManager.setForceSpeakerphoneOn(true);
  }
};

export const streamDestroyedEvent = event => (dispatch, getState) => {
  const { userProfile, activeSessionReducer, auth } = getState();
  dispatch(
    update({
      status: STATUS_TOKBOX.DESTROY
    })
  );
  //Add validations
  Sessions.StatusSession(activeSessionReducer.sessionID, auth.token)
    .then(response => {
      console.log("Destroyed ", response); // REVIEW
      if (response.data.session.ended) {
        clearInterval(activeSessionReducer.counterId);
        clearInterval(activeSessionReducer.timer);
        clearInterval(activeSessionReducer.verifyCallId);
        dispatch(clear());
        dispatch({ type: "RateView" });
      }
    })
    .catch(error => {
      /*if (activeSessionReducer.modalReconnect) {
          dispatch(
            update({
              modalReconnectCounter: 0
            })
          );
        }*/
    });
};

export const errorEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "ERROR",
      payload: event
    })
  );
};

//Punlisher events

export const publisherStart = () => async (dispatch, getState) => {
  const { userProfile } = getState();
  if (userProfile.linguistProfile) {
    await InCallManager.start({ media: "audio" });
    await InCallManager.setForceSpeakerphoneOn(true);
  }
};

//Subscriber events

export const subscriberStart = () => async (dispatch, getState) => {
  const { userProfile, contactLinguist, activeSessionReducer } = getState();
  if (userProfile.linguistProfile) {
    dispatch(startTimerLinguist());
  } else {
    clearInterval(contactLinguist.counterId);
    dispatch(startTimer());
    dispatch(updateCustomerSettings({ timer: activeSessionReducer.timer }));
  }
};

export const videoState = state => (dispatch, getState) => {
  const { userProfile } = getState();
  dispatch(update({ disabledSubscriber: state }));
};

export const sendSignal = (reason, data) => dispatch => {
  dispatch(
    update({
      signal: {
        type: reason,
        data: data
      }
    })
  );
};

export const clearTokboxStatus = event => dispatch => {
  dispatch(
    update({
      status: STATUS_TOKBOX.DISCONECTED
    })
  );
};

// CallCustomer Settings

export const resetTimerAsync = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();

  dispatch(
    update({
      timer: null,
      elapsedTime: 0
    })
  );
};

export const resetReconnectAsync = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  clearInterval(activeSessionReducer.counterId);
  dispatch(
    update({
      counterId: null,
      modalReconnectCounter: 0
    })
  );
};

export const resetReconnectCounterAsync = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  dispatch(
    update({
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
        dispatch(clear());
        dispatch(clearEvents());
      } else if (reason === REASON.RETRY) {
        dispatch(update({ verifyCallId: null }));
        dispatch(clear());
      } else {
        dispatch(clear());
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(clear());
    });
};

export const updateVideoWarningEvent = (reason, data) => dispatch => {
  dispatch(
    update({
      localVideoWarning: data
    })
  );
  dispatch(sendSignal(reason, data));
};

export const HandleEndCall = (sessionID, reason, token) => dispatch => {
  dispatch(EndCall(sessionID, reason, token))
    .then(response => {
      if (reason === REASON.CANCEL) {
        dispatch({ type: "Home" });
      } else if (reason === REASON.RETRY) {
        dispatch({ type: "CustomerView" });
      } else if (reason === REASON.DONE) {
        dispatch({ type: "RateView" });
      }
    })
    .catch(error => {
      dispatch({ type: "RateView" });
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
  eventID,
  location
}) => (dispatch, getState) => {
  return Sessions.createSession(
    "immediate_virtual",
    "first_available",
    primaryLangCode,
    secondaryLangCode,
    estimatedMinutes,
    scenarioID,
    token,
    customScenarioNote,
    eventID,
    location
  )
    .then(response => {
      const { data } = response;
      // Set session data
      dispatch(setSession(data));
      dispatch(updateRate({ sessionID: data.sessionID }));
      // verify if there is linguist available
      dispatch(
        update({
          verifyCallId: setInterval(
            () => dispatch(verifyCall(data.sessionID, token)),
            5000
          )
        })
      );
      return response.data;
    })
    .catch(error => {
      dispatch(networkError(error));
      const { contactLinguist, activeSessionReducer } = getState();
      clearInterval(contactLinguist.counterId);
      clearInterval(activeSessionReducer.verifyCallId);
      clearInterval(activeSessionReducer.timer);
      dispatch(resetCounter());
      dispatch(resetCounterVerify());
      dispatch(clear());
      dispatch({ type: "Home" });
    });
};

export const verifyCall = (sessionID, token) => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer } = getState();
  Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      const { data } = response;
      if (data.status !== "assigned") {
        if (contactLinguist.counter >= 55) {
          clearInterval(contactLinguist.counterId);
          clearInterval(activeSessionReducer.verifyCallId);
          dispatch(resetCounter());
          dispatch(resetCounterVerify());
          dispatch(
            updateContactLinguist({
              modalContact: true,
              counter: TIME.RECONNECT,
              messageReconnect: I18n.t("notLinguistAvailable")
            })
          );
          sessionID &&
            dispatch(HandleEndCall(sessionID, REASON.TIMEOUT, token));
        } else {
          if (
            contactLinguist.counter >= 55 ||
            data.queue.declined === data.queue.total
          ) {
            clearInterval(contactLinguist.counterId);
            clearInterval(activeSessionReducer.verifyCallId);
            dispatch(resetCounter());
            dispatch(resetCounterVerify());
            dispatch(
              updateContactLinguist({
                modalContact: true,
                counter: TIME.RECONNECT,
                messageReconnect: I18n.t("notLinguistAvailable")
              })
            );
            sessionID &&
              dispatch(HandleEndCall(sessionID, REASON.TIMEOUT, token));
          }
        }
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      clearInterval(contactLinguist.counterId);
      clearInterval(activeSessionReducer.verifyCallId);
    });
};

export const closeOpenConnections = () => dispatch => {
  dispatch(clear());
};

export const verifyLinguistConnection = () => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer } = getState();
  if (
    contactLinguist.counter > 20 &&
    activeSessionReducer.sessionID &&
    activeSessionReducer.status !== STATUS_TOKBOX.STREAM
  ) {
    clearInterval(contactLinguist.counterId);
    dispatch(resetCounter());
    dispatch(closeCall(REASON.DONE));
  }
};

export const startReconnect = () => (dispatch, getState) => {
  dispatch(
    update({
      counterId: setInterval(() => {
        dispatch(incrementReconnect());
      }, 1000)
    })
  );
};

export const startTimer = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  const callTime = !!activeSessionReducer.selectedTime
    ? activeSessionReducer.selectedTime * 60
    : 60 * 60;

  dispatch(
    update({
      timer: setInterval(() => {
        const {
          elapsedTime,
          extraTime,
          showAlert
        } = getState().activeSessionReducer;
        if (elapsedTime + extraTime < 60 * 60) {
          if (elapsedTime >= callTime + extraTime - 2 * 60) {
            dispatch(
              update({
                red: true
              })
            );
            if (!showAlert) {
              dispatch(
                update({
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
  const { contactLinguist, activeSessionReducer, auth } = getState();
  clearInterval(contactLinguist.counterId);
  clearInterval(activeSessionReducer.timer);
  clearInterval(activeSessionReducer.verifyCallId);
  dispatch(
    updateContactLinguist({
      modalContact: false,
      customScenarioNote: ""
    })
  );
  dispatch(resetCounter());

  if (reason === REASON.RETRY) {
    BackgroundCleanInterval(activeSessionReducer.timer);
    dispatch(resetTimerAsync());
    cleanNotifications();
  }

  SoundManager["EndCall"].play();
  if (reason !== "Abort") {
    if (activeSessionReducer.sessionID) {
      activeSessionReducer.sessionID &&
        dispatch(
          HandleEndCall(activeSessionReducer.sessionID, reason, auth.token)
        );
    } else {
      if (reason === REASON.CANCEL) {
        dispatch({ type: "Home" });
      } else if (reason === REASON.RETRY) {
        dispatch({ type: "CustomerView" });
      } else if (reason === REASON.DONE) {
        dispatch({ type: "RateView" });
      }
    }
  }
  if (reason == "Abort") {
    dispatch({ type: "Home" });
  }
};

export const cleanCall = reason => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer, auth } = getState();
  clearInterval(contactLinguist.counterId);
  clearInterval(activeSessionReducer.timer);
  dispatch(
    updateContactLinguist({
      modalContact: false,
      customScenarioNote: ""
    })
  );
  dispatch(resetCounter());
  dispatch(resetTimerAsync());
  cleanNotifications();
};

//Linguist

export const asyncGetInvitationDetail = (
  invitationID,
  token,
  redirect
) => dispatch => {
  return Sessions.linguistFetchesInvite(invitationID, token)
    .then(response => {
      const { data } = response;
      if (!data.session.endReason) {
        if (redirect) {
          dispatch(connectCall());
        }
      } else {
        dispatch(clear());
      }
    })
    .catch(error => {
      dispatch(clear());
      dispatch(networkError(error));
    });
};

export const verifyCallActive = (
  sessionID,
  token,
  verifyCallId
) => dispatch => {
  Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      if (
        response.data.status == "cancelled" ||
        response.data.status == "assigned"
      ) {
        dispatch({ type: "Home", params: { alert: true } });
        clearInterval(verifyCallId);
        Vibration.cancel();
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      clearInterval(verifyCallId);
      Vibration.cancel();
    });
};

const connectCall = () => dispatch => {
  dispatch({ type: "LinguistView" });
};

export const asyncAcceptsInvite = (
  invitationID,
  reason,
  token,
  linguistSessionId
) => (dispatch, getState) => {
  const {
    activeSessionReducer,
    callLinguistSettings,
    contactLinguist
  } = getState();
  if (reason && reason.accept) {
    Sessions.linguistFetchesInvite(invitationID, token)
      .then(res => {
        if (!res.data.session.endReason) {
          Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
            .then(response => {
              dispatch(setSession(response.data));
              dispatch(update({ sessionID: callLinguistSettings.sessionID }));
              dispatch(update({ isLinguist: true }));
              dispatch(
                updateRate({
                  customerName: callLinguistSettings.customerName,
                  sessionID: callLinguistSettings.sessionID,
                  avatarURL: callLinguistSettings.avatarURL
                })
              );
              dispatch(
                update({
                  customerName: callLinguistSettings.customerName,
                  avatarURL: callLinguistSettings.avatarURL
                })
              );
              dispatch(connectCall());
            })
            .catch(error => {
              dispatch(clear());
              dispatch({ type: "Home" });
              dispatch(networkError(error));
            });
        } else {
          dispatch(clear());
          dispatch({ type: "Home", params: { alert: true } });
        }
      })
      .catch(error => {
        dispatch(networkError(error));
        dispatch(clear());
        dispatch({ type: "Home", params: { alert: true } });
      });
  } else {
    Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
      .then(response => {
        dispatch(clear());
        dispatch({ type: "Home" });
      })
      .catch(error => {
        dispatch(clear());
        dispatch({ type: "Home" });
        dispatch(networkError(error));
      });
  }
};

export const startTimerLinguist = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  dispatch(
    update({
      timer: setInterval(() => {
        dispatch(incrementTimer());
        const { elapsedTime } = getState().activeSessionReducer;
        emitLocalNotification({
          title: I18n.t("call"),
          message: `${I18n.t("callInProgress")} ${fmtMSS(elapsedTime)}`
        });
      }, 1000)
    })
  );
  dispatch(updateLinguistSettings({ timer: activeSessionReducer.timer }));
};

export const closeCallReconnect = reason => dispatch => {
  //CHECK
  SoundManager["EndCall"].play();
  dispatch(sendSignal(REASON.DONE, "Ended by Linguist"));
  dispatch({ type: "RateView" });
};

export const cleanAllIntervals = () => getState => {
  const { activeSessionReducer } = getState();
  clearInterval(activeSessionReducer.counterId);
  clearInterval(activeSessionReducer.timer);
  clearInterval(activeSessionReducer.verifyCallId);
};

const activeSessionReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    //COMMON ACTIONS

    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }

    // TOKBOX ACTIONS

    case ACTIONS.TOKEVENT: {
      return { ...state, tokevent: payload };
    }

    // API ACTIONS

    case ACTIONS.SET_SESSION: {
      return {
        ...state,
        tokboxID: payload.tokboxSessionID,
        tokboxToken: payload.tokboxSessionToken,
        sessionID: payload.sessionID
      };
    }

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

    case ACTIONS.INVITATIONDETAIL: {
      return { ...state, ...payload };
    }

    case ACTIONS.RESET_COUNTER: {
      return {
        ...state,
        verifyCallId: null
      };
    }

    default:
      return state;
  }
};

export default activeSessionReducer;
