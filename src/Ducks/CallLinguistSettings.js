import { Sessions } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

import {
  changeStatus,
  updateSettings as updateProfileLinguist
} from "./ProfileLinguistReducer";
import { setSession, clear, update } from "./tokboxReducer";

import moment from "moment";
import _sortBy from "lodash/sortBy";

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

export const getInvitations = () => (dispatch, getState) => {
  const {
    auth: { uuid, token },
    userProfile: { isLinguist },
    profileLinguist: { available, polling }
  } = getState();

  if (isLinguist && polling && available) {
    Sessions.GetInvitations(uuid, token)
      .then(response => {
        const length = response.data.length;

        // There's at least one call. Let's get the most recent one
        if (length > 0) {
          // We order the invitations by Date
          const sortedResponse = _sortBy(
            response.data,
            o => new moment(o.createdAt)
          );

          // We get the most recent invitation
          const lastInvitation = sortedResponse[length - 1];

          // We Calculate de time difference, we are only going to take invitations
          // from 30 seconds ago
          const lastInvitationDate = new moment(lastInvitation.createdAt);

          const secondsDiff = lastInvitationDate.diff(moment(), "seconds");

          console.log(">> polling", secondsDiff);

          // If the call if 30 seconds old we take the call
          if (secondsDiff <= 0 && secondsDiff >= -30 && polling) {
            const invitation = sortedResponse[length - 1];

            // We turn off polling until HomeLinguistView is mounted again
            dispatch(
              updateSettings({
                invitationID: invitation.id
              })
            );
            dispatch(update({ sessionID: invitation.session.id }));
            dispatch(updateProfileLinguist({ polling: false }));
            dispatch({ type: "IncomingCallView" });
          }
        } else {
          console.log("There are no invitations");
        }
      })
      .catch(err => {
        console.log(err.response);
      })
      .finally(() => {
        if (polling && available) {
          this.setTimeout(() => {
            dispatch(getInvitations());
          }, 10000);
        }
      });
  }
};

dispatchInvitations = () => dispatch => {};

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
    .catch(error => {
      console.log(error.response);
    });
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
      console.log(res);
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
      console.log(error, error.response);
      dispatch(clearSettings());
      dispatch(clear());
      dispatch(networkError(error));
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
        if (res.data.session.endReason !== REASON.CANCEL) {
          Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
            .then(response => {
              dispatch(setSession(response.data));
              dispatch({ type: "LinguistView" });
              dispatch(update({ sessionID: linguistSessionId }));
            })
            .catch(error => {
              dispatch(networkError(error));
            });
        } else {
          dispatch({ type: "Home" });
          console.log("Ended call by customer");
        }
      })
      .catch(err => {
        dispatch({ type: "Home" });
        console.log("Ended call by customer");
      });
  } else {
    Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
      .then(response => {
        dispatch({ type: "Home" });
        dispatch(changeStatus());
      })
      .catch(error => {
        dispatch({ type: "Home" });
        dispatch(networkError(error));
      });
  }
};

// Initial State
const initialState = {
  // Call Settings
  mute: false,
  video: false,
  speaker: true,
  timer: null,
  invitationID: null,
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
  languages: ""
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
