import { Sessions, CallHistory } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

import {
  changeStatus,
  updateSettings as updateProfileLinguist
} from "./ProfileLinguistReducer";
import { setSession, clear, update } from "./tokboxReducer";

import moment from "moment";
import _sortBy from "lodash/sortBy";
import { Vibration } from "react-native";
import { LANG_CODES, REASON } from "../Util/Constants";

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

export const EndCall = (sessionID, reason, token) => dispatch => {
  Sessions.EndSession(sessionID, { reason: REASON.DONE }, token)
    .then(response => {
      dispatch(endSession(REASON.DONE));
    })
    .catch(error => dispatch(networkError(error)));
};

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
      const res = response.data;
      if (!res.session.endReason) {
        dispatch(
          updateSettings({
            customerName: res.createdBy
              ? `${res.createdBy.firstName} ${res.createdBy.lastInitial}.`
              : "",
            estimatedMinutes: res.session.estimatedMinutes
              ? `~ ${res.session.estimatedMinutes} mins`
              : res.session.estimatedMinutes,
            languages: `${LANG_CODES.get(
              res.session.primaryLangCode
            )} - ${LANG_CODES.get(res.session.secondaryLangCode)}`
          })
        );
        if (redirect) {
          dispatch({ type: "LinguistView" });
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

export const verifyCall = (sessionID, token, verifyCallId) => dispatch => {
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
export const asyncAcceptsInvite = (
  invitationID,
  reason,
  token,
  linguistSessionId
) => dispatch => {
  if (reason && reason.accept) {
    Sessions.linguistFetchesInvite(invitationID, token)
      .then(res => {
        if (!res.data.session.endReason) {
          Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
            .then(response => {
              dispatch(setSession(response.data));
              dispatch({ type: "LinguistView" });
              dispatch(changeStatus(false));
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

// Initial State
const initialState = {
  // Call Settings
  mic: true,
  video: false,
  rotate: true,
  speaker: true,
  timer: null,
  invitationID: null,
  verifyCallId: null,
  elapsedTime: 0,
  accept: false,
  customerPreferredSex: "any",

  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min

  // IncomingCall
  firstName: "",
  lastInitial: "",
  avatarURL: "",
  estimatedMinutes: "",
  languages: "",
  customerScenario: ""
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
