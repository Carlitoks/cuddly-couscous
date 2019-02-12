import InCallManager from "react-native-incall-manager";
import moment from "moment";
import _sortBy from "lodash/sortBy";
import { Vibration } from "react-native";
import timer from "react-native-timer";
import { GetSessionInfoLinguist } from "./SessionInfoReducer";
import { REASON, STATUS_TOKBOX, TIME } from "../Util/Constants";
import { networkError } from "./NetworkErrorsReducer";
import {modifyAVModePreference} from "./NewSessionReducer";
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
import { cleanReducerAndKeepLangConfig } from './NewSessionReducer';
import { displayTimeAlert, displayEndCall } from "../Util/Alerts";
import { Sessions, CallHistory } from "../Api";
import {
  changeStatus,
  updateSettings as updateProfileLinguist
} from "./ProfileLinguistReducer";
import SoundManager from "../Util/SoundManager";
import DeviceInfo from "react-native-device-info";

const ACTIONS = {
  CLEAR: "activeSession/clear",
  UPDATE: "activeSession/update",
  ERROR: "activeSession/error",
  TOKEVENT: "activeSession/tokboxevent",
  SET_SESSION: "activeSession/setSession",
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
  customerName: null,
  isLinguist: false,
  firstName: "",
  lastInitial: "",
  avatarURL: "",
  endingSession: false,
  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 60, // Initial time selected: 10 min
  allowTimeSelection: true,
  isHeadsetConnected: false,

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
  isConnectedToInternet: true,
  publisherSubscriberError: false,
  processing: false,

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
    //await InCallManager.setForceSpeakerphoneOn(true);
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
      if (response.data.session.ended) {
        timer.clearInterval("verifyCallId");
        timer.clearInterval("timer");
        timer.clearInterval("counterId");
        dispatch(endSession());
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

export const remountPublisherAndSubscriber = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  console.log(
    "Trying to remount: ",
    activeSessionReducer.isConnectedToInternet
  );
  dispatch(update({ publisherSubscriberError: true }));
  setTimeout(() => {
    dispatch(update({ publisherSubscriberError: false }));
  }, 1000);
};

//Punlisher events

export const publisherStart = () => async (dispatch, getState) => {
  const { userProfile } = getState();
  if (userProfile.linguistProfile) {
    InCallManager.start({ media: "audio" });
    //InCallManager.setForceSpeakerphoneOn(true);
  }
};

//Subscriber events

export const subscriberStart = () => async (dispatch, getState) => {
  const { userProfile, contactLinguist, activeSessionReducer } = getState();
  if (userProfile.linguistProfile) {
    dispatch(startTimerLinguist());
  } else {
    timer.clearInterval("counterId");
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

  //TODO: if something is wrong with the timer
  //      set counterId: null in the update
  //      and timer.clearInterval("counterId");
  dispatch(
    update({
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
      console.log(response, sessionID, reason, token);
      if (reason === REASON.CANCEL) {
        dispatch(clear());
        dispatch(clearEvents());
        dispatch(cleanReducerAndKeepLangConfig());
      } else if (reason === REASON.RETRY) {
        dispatch(update({ verifyCallId: null }));
        dispatch(clear());
        dispatch(cleanReducerAndKeepLangConfig());
      } else {
        dispatch(clear());
        dispatch(cleanReducerAndKeepLangConfig());
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(clear());
      dispatch(cleanReducerAndKeepLangConfig());
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

export const tryAgainCall = (sessionID, reason, token) => async dispatch => {
  await Sessions.EndSession(sessionID, reason, token)
    .then(response => {
      dispatch(endSession());
      timer.clearInterval("timer");
      timer.clearInterval("verifyCallId");
      BackgroundCleanInterval(activeSessionReducer.timer);
      dispatch(resetTimerAsync());
      cleanNotifications();
      if (reason === REASON.RETRY) {
        dispatch({ type: "CustomerView" });
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(clear());
      dispatch({ type: "Home" });
    });
};

export const HandleEndCall = (sessionID, reason, token, alert) => (
  dispatch,
  getState
) => {
  const { activeSessionReducer } = getState();
  dispatch(endSession());
  dispatch(EndCall(sessionID, reason, token))
    .then(response => {
      if (reason === REASON.CANCEL) {
        if (alert) {
          dispatch({ type: "Home", params: { alertFail: true } });
        } else {
          dispatch({ type: "Home", params: { alertCancelCall: true } });
        }
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
  location,
  video
}) => (dispatch, getState) => {
  let avModePreference;
  if (video) {
    avModePreference = "video";
  } else {
    avModePreference = "audio";
  }
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
    location,
    avModePreference
  )
    .then(response => {
      if (response) {
        const { data } = response;
        // Set session data
        dispatch(setSession(data));
        dispatch(updateRate({ sessionID: data.sessionID }));
        // verify if there is linguist available
        dispatch(
          update({
            verifyCallId: timer.setInterval(
              "verifyCallId",
              () => dispatch(verifyCall(data.sessionID, token)),
              5000
            )
          })
        );
        return response.data;
      } else {
        dispatch({ type: "Home" });
      }
    })
    .catch(error => {
      //dispatch(networkError(error));
      const { contactLinguist, activeSessionReducer } = getState();
      timer.clearInterval("counterId");
      timer.clearInterval("verifyCallId");
      timer.clearInterval("timer");
      // dispatch(endSession());
      // dispatch(resetCounter());
      // dispatch(resetCounterVerify());
      // dispatch(clear());
      dispatch({ type: "Home", params: { alertCreateSessionFail: true, apiError: error.response } });
    });
};

export const verifyCall = (sessionID, token) => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer } = getState();
  Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      const { data } = response;

      if (data.status !== "assigned") {
        if (contactLinguist.counter >= 55) {
          timer.clearInterval("counterId");
          timer.clearInterval("verifyCallId");
          dispatch(resetCounter());
          dispatch(resetCounterVerify());
          dispatch(
            updateContactLinguist({
              modalContact: true,
              counter: TIME.RECONNECT,
              messageReconnect: I18n.t("allLinguistsAreBusy")
            })
          );
          sessionID &&
            dispatch(HandleEndCall(sessionID, REASON.TIMEOUT, token));
        } else {
          if (
            contactLinguist.counter >= 55 ||
            data.queue.declined === data.queue.total
          ) {
            timer.clearInterval("counterId");
            timer.clearInterval("verifyCallId");
            dispatch(resetCounter());
            dispatch(resetCounterVerify());
            dispatch(
              updateContactLinguist({
                modalContact: true,
                counter: TIME.RECONNECT,
                messageReconnect: I18n.t("allLinguistsAreBusy")
              })
            );
            sessionID &&
              dispatch(HandleEndCall(sessionID, REASON.TIMEOUT, token));
          }
        }
      } else {
        if (contactLinguist.counter >= 55) {
          timer.clearInterval("counterId");
          timer.clearInterval("verifyCallId");
          dispatch(resetCounter());
          dispatch(resetCounterVerify());
          dispatch(
            updateContactLinguist({
              modalContact: true,
              counter: TIME.RECONNECT,
              messageReconnect: I18n.t("unableToConnect")
            })
          );
          sessionID &&
            dispatch(HandleEndCall(sessionID, REASON.TIMEOUT, token));
        }
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      timer.clearInterval("counterId");
      timer.clearInterval("verifyCallId");
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
    timer.clearInterval("counterId");
    dispatch(resetCounter());
    dispatch(closeCall(REASON.CANCEL, true));
  }
};

export const startReconnect = () => (dispatch, getState) => {
  dispatch(
    update({
      counterId: timer.setInterval(
        "counterId",
        () => {
          dispatch(incrementReconnect());
        },
        1000
      )
    })
  );
};

export const startTimer = () => (dispatch, getState) => {
  const { activeSessionReducer, events } = getState();
  const callTime = !!activeSessionReducer.selectedTime
    ? activeSessionReducer.selectedTime * 60
    : 60 * 60;

  dispatch(
    update({
      timer: timer.setInterval(
        "timer",
        () => {
          const {
            elapsedTime,
            extraTime,
            showAlert
          } = getState().activeSessionReducer;
          let availableMinutes;
          let paymentDetail;
          if (events.id && events.id !== "") {
            availableMinutes = 60;
          } else {
            availableMinutes = getState().userProfile.availableMinutes;
            paymentDetail = getState().userProfile.stripePaymentToken;
          }
          if (elapsedTime + extraTime < 60 * 60) {
            if (
              elapsedTime >= availableMinutes * 60 + extraTime - 2 * 60 &&
              !!!paymentDetail
            ) {
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
                SoundManager["ExtraTime"].play(success => {
                  if (success) {
                    //console.log("successfully finished playing");
                  } else {
                    console.log("playback failed due to audio decoding errors");
                  }
                });
                displayTimeAlert(extraTime, event => {
                  dispatch(update(event));
                });
              }
            }
            if (
              elapsedTime > availableMinutes * 60 + extraTime &&
              !!!paymentDetail
            ) {
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
        },
        1000
      )
    })
  );
};

export const closeCall = (reason, alert) => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer, auth } = getState();
  timer.clearInterval("counterId");
  timer.clearInterval("timer");
  timer.clearInterval("verifyCallId");
  if (reason != REASON.RETRY) {
    dispatch(
      updateContactLinguist({
        modalContact: false,
        customScenarioNote: ""
      })
    );
  } else {
    dispatch(
      updateContactLinguist({
        modalContact: false
      })
    );
  }
  dispatch(resetCounter());

  if (reason === REASON.RETRY) {
    BackgroundCleanInterval(activeSessionReducer.timer);
    dispatch(resetTimerAsync());
    cleanNotifications();
    dispatch(update({ modalReconnect: false }));
  }

  SoundManager["EndCall"].play();
  if (reason !== "Abort") {
    if (activeSessionReducer.sessionID) {
      activeSessionReducer.sessionID &&
        dispatch(
          HandleEndCall(
            activeSessionReducer.sessionID,
            reason,
            auth.token,
            alert
          )
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
    dispatch(update({ modalReconnect: false }));
  }
  if (reason == "Abort") {
    dispatch(update({ modalReconnect: false }));
    dispatch({ type: "Home" });
  }
};

export const cleanCall = reason => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer, auth } = getState();
  timer.clearInterval("counterId");
  timer.clearInterval("timer");
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
        timer.clearInterval("verifyCallId");
        Vibration.cancel();
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      timer.clearInterval("verifyCallId");
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
  const acceptInvitePromise = new Promise((resolve, reject) => {
    if (reason && reason.accept) {
      Sessions.linguistFetchesInvite(invitationID, token)
        .then(res => {
          let video = true;
          if (res.data.session.avModePreference == "audio") {
            video = false;
          }
          if (!res.data.session.endReason) {
            Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
              .then(response => {
                dispatch(setSession(response.data));
                dispatch(
                  update({
                    sessionID: callLinguistSettings.sessionID,
                    customerName: callLinguistSettings.customerName,
                    avatarURL: callLinguistSettings.avatarURL,
                    isLinguist: true,
                    video: video
                  })
                );
                dispatch(
                  modifyAVModePreference({ 
                    avModePreference: res.data.session.avModePreference 
                  })
                  );
                dispatch(
                  updateRate({
                    customerName: callLinguistSettings.customerName,
                    sessionID: callLinguistSettings.sessionID,
                    avatarURL: callLinguistSettings.avatarURL
                  })
                );
                resolve({
                  ...response,
                  type: "LinguistView",
                  params: {},
                  buttonDisabled: true
                });
              })
              .catch(error => {
                dispatch(clear());
                dispatch(networkError(error));
                reject({
                  ...error.response,
                  type: "Home",
                  params: { alertAssigned: true },
                  buttonDisabled: false
                });
              });
          } else {
            dispatch(clear());
            resolve({
              ...res,
              type: "Home",
              params: { alertCancelled: true },
              buttonDisabled: false
            });
          }
        })
        .catch(error => {
          dispatch(networkError(error));
          dispatch(clear());
          reject({
            ...error,
            type: "Home",
            params: { alert: true },
            buttonDisabled: false
          });
        });
    } else {
      Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
        .then(response => {
          dispatch(clear());
          resolve({
            ...response,
            type: "Home",
            params: {},
            buttonDisabled: true
          });
        })
        .catch(error => {
          dispatch(clear());
          dispatch(networkError(error));
          reject({ ...error, type: "Home", params: {}, buttonDisabled: false });
        });
    }
  });
  return acceptInvitePromise;
};

export const startTimerLinguist = () => (dispatch, getState) => {
  const { activeSessionReducer } = getState();
  dispatch(
    update({
      timer: timer.setInterval(
        "timer",
        () => {
          dispatch(incrementTimer());
          const { elapsedTime } = getState().activeSessionReducer;
          emitLocalNotification({
            title: I18n.t("call"),
            message: `${I18n.t("callInProgress")} ${fmtMSS(elapsedTime)}`
          });
        },
        1000
      )
    })
  );
  dispatch(updateLinguistSettings({ timer: activeSessionReducer.timer }));
};

export const closeCallReconnect = reason => dispatch => {
  //CHECK
  SoundManager["EndCall"].play();
  dispatch(update({ modalReconnect: false }));
  dispatch(sendSignal(REASON.DONE, "Ended by Linguist"));
  dispatch({ type: "RateView" });
};

export const cleanAllIntervals = () => getState => {
  const { activeSessionReducer } = getState();
  timer.clearInterval("counterId");
  timer.clearInterval("timer");
  timer.clearInterval("verifyCallId");
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
        ...state,
        endingSession: true
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
