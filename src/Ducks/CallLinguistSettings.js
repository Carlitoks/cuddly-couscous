import { Sessions, CallHistory } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import {
  changeStatus,
  updateSettings as updateProfileLinguist
} from "./ProfileLinguistReducer";
import { setSession, clear, update, sendSignal } from "./tokboxReducer";
import timer from "react-native-timer";
import moment from "moment";
import _sortBy from "lodash/sortBy";
import I18n from "../I18n/I18n";
import { Vibration } from "react-native";
import { fmtMSS } from "../Util/Helpers";
import { BackgroundInterval } from "../Util/Background";
import { REASON } from "../Util/Constants";
import { displayEndCall } from "../Util/Alerts";
import { emitLocalNotification } from "../Util/PushNotification";
import SoundManager from "../Util/SoundManager";

// Actions
export const ACTIONS = {
  CLEAR: "callLinguistSettings/clear",
  UPDATE: "callLinguistSettings/update",
  INVITATIONDETAIL: "callLinguistSettings/invitationDetail",
  INVITATIONACCEPT: "callLinguistSettings/invitationAccept",
  INCREMENT_TIMER: "callLinguistSettings/incrementTimer",
  RESET_TIMER: "callLinguistSettings/resetTimer",
  ENDSESSION: "callLinguistSettings/endSession"
};

// Action Creator
export const invitationDetail = payload => ({
  type: ACTIONS.INVITATIONDETAIL,
  payload
});

export const invitationAccept = payload => ({
  type: ACTIONS.INVITATIONACCEPT,
  payload
});

export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const incrementTimer = () => ({
  type: ACTIONS.INCREMENT_TIMER
});

export const resetTimerAsync = () => (dispatch, getState) => {
  const { callLinguistSettings } = getState();
  dispatch(
    updateSettings({
      timer: null,
      elapsedTime: 0
    })
  );
};

export const endSession = () => ({ type: ACTIONS.ENDSESSION });

export const resetTimer = () => ({
  type: ACTIONS.RESET_TIMER
});

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
        dispatch(clearSettings());
        dispatch(clear());
      }
    })
    .catch(error => {
      dispatch(clearSettings());
      dispatch(clear());
      dispatch(networkError(error));
    });
};

export const verifyCall = (sessionID, token, verifyCallId) => (
  dispatch,
  getState
) => {
  const { callLinguistSettings } = getState();
  Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      if (response.data.status == "cancelled") {
        dispatch({ type: "Home", params: { alertCancelled: true } });
        timer.clearInterval("verifyCallId");
        Vibration.cancel();
      }
      if (response.data.status == "assigned") {
        if (callLinguistSettings.sessionID) {
          dispatch({ type: "Home", params: { alertAssigned: true } });
          timer.clearInterval("verifyCallId");
          Vibration.cancel();
        }
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
) => dispatch => {
  if (reason && reason.accept) {
    dispatch(connectCall());
    Sessions.linguistFetchesInvite(invitationID, token)
      .then(res => {
        if (!res.data.session.endReason) {
          Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
            .then(response => {
              dispatch(setSession(response.data));
              dispatch(update({ sessionID: linguistSessionId }));
            })
            .catch(error => {
              dispatch(clear());
              dispatch(clearSettings());
              dispatch({ type: "Home" });
              dispatch(networkError(error));
            });
        } else {
          dispatch(clear());
          dispatch(clearSettings());
          dispatch({ type: "Home", params: { alert: true } });
          dispatch(clear());
        }
      })
      .catch(error => {
        dispatch(networkError(error));
        dispatch(clear());
        dispatch(clearSettings());
        dispatch({ type: "Home", params: { alert: true } });
        dispatch(clear());
      });
  } else {
    Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
      .then(response => {
        dispatch(clear());
        dispatch(clearSettings());
        dispatch({ type: "Home" });
      })
      .catch(error => {
        dispatch(clear());
        dispatch(clearSettings());
        dispatch({ type: "Home" });
        dispatch(networkError(error));
      });
  }
};

export const startTimer = () => (dispatch, getState) => {
  dispatch(
    updateSettings({
      timer: timer.setInterval(
        "timer",
        () => {
          dispatch(incrementTimer());
          const { elapsedTime } = getState().callLinguistSettings;
          emitLocalNotification({
            title: I18n.t("call"),
            message: `${I18n.t("callInProgress")} ${fmtMSS(elapsedTime)}`
          });
        },
        1000
      )
    })
  );
};

export const closeCall = reason => (dispatch, getState) => {
  displayEndCall(() => {
    SoundManager["EndCall"].play();
    dispatch(EndCall());
  });
};

export const EndCall = () => (dispatch, getState) => {
  const { tokbox, auth } = getState();
  return Sessions.EndSession(tokbox.sessionID, REASON.DONE, auth.token)
    .then(response => {
      dispatch({ type: "RateView" });
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch({ type: "RateView" });
    });
};

export const closeCallReconnect = reason => dispatch => {
  SoundManager["EndCall"].play();
  dispatch(sendSignal(REASON.DONE, "Ended by Linguist"));
  dispatch({ type: "RateView" });
};

// Initial State
const initialState = {
  // Call Settings
  mic: true,
  video: true,
  rotate: true,
  speaker: true,
  timer: null,
  invitationID: null,
  verifyCallId: null,
  elapsedTime: 0,
  accept: false,
  customerPreferredSex: "any",

  customerName: null,
  invitationID: "",
  reconnecting: false,
  sessionID: "",
  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min

  // IncomingCall
  firstName: "",
  lastInitial: "",
  avatarURL: "",
  estimatedMinutes: null,
  languages: "",
  customScenarioNote: "",
  customerScenario: "",
  reconnecting: false
};

// Reducer
const callLinguistSettings = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }

    case ACTIONS.INVITATIONDETAIL: {
      return { ...state, ...payload };
    }

    case ACTIONS.ENDSESSION: {
      return {
        ...state,
        reason: payload
      };
    }

    case ACTIONS.INCREMENT_TIMER: {
      return { ...state, elapsedTime: state.elapsedTime + 1 };
    }

    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export default callLinguistSettings;
