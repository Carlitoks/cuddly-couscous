import { Sessions } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

import { updateSettings as updateProfileLinguist } from "./ProfileLinguistReducer";

import moment from "moment";
import _sortBy from "lodash/sortBy";

import { LANG_CODES } from "../Util/Constants";

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

  if (isLinguist) {
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
            const iid = sortedResponse[length - 1].id;

            // We turn off polling until HomeLinguistView is mounted again
            dispatch(updateSettings({ invitationID: iid }));
            dispatch(updateProfileLinguist({ polling: false }));
            dispatch({ type: "IncomingCallView" });
          }
        } else {
          console.log("There are no invitations");
        }

        if (polling && available) {
          setTimeout(() => {
            dispatch(getInvitations());
          }, 10000);
        }
      })
      .catch(err => {
        if (polling && available) {
          setTimeout(() => {
            dispatch(getInvitations());
          }, 10000);
        }
        console.log(err);
      });
  }
};

export const resetTimerAsync = () => (dispatch, getState) => {
  const { callLinguistSettings } = getState();

  clearInterval(callLinguistSettings.timer);
  dispatch(
    updateSettings({
      timer: null,
      elapsedTime: 0
    })
  );
};

export const endSession = () => ({ type: ACTIONS.ENDSESSION });

export const EndCall = (sessionID, reason, token) => dispatch => {
  Sessions.EndSession(sessionID, { reason: "done" }, token)
    .then(response => {
      dispatch(endSession("done"));
    })
    .catch(error => {
      console.log(error.response);
    });
};

export const resetTimer = () => ({
  type: ACTIONS.RESET_TIMER
});

export const asyncGetInvitationDetail = (invitationID, token) => dispatch => {
  return Sessions.LinguistFetchesInvite(invitationID, token)
    .then(response => {
      const res = response.data;

      dispatch(
        updateSettings({
          customerName: `${res.createdBy.firstName} ${res.createdBy
            .lastInitial}.`,
          estimatedMinutes: `~ ${res.session.estimatedMinutes} mins`,
          languages: `${LANG_CODES.get(
            res.session.primaryLangCode
          )} - ${LANG_CODES.get(res.session.secondaryLangCode)}`
        })
      );
    })
    .catch(error => {
      dispatch(networkError(error));
    });
};

export const asyncAcceptsInvite = (invitationID, reason, token) => dispatch => {
  Sessions.LinguistIncomingCallResponse(invitationID, reason, token)
    .then(response => {
      dispatch(invitationAccept(response.data));
      dispatch({ type: "LinguistView" });
    })
    .catch(error => {
      dispatch(networkError(error));
    });
};

// Initial State
const initialState = {
  // Call Settings
  mute: false,
  video: true,
  speaker: true,
  timer: null,
  invitationID: null,
  elapsedTime: 0,
  linguistTokboxSessionID: null,
  linguistTokboxSessionToken: null,
  accept: false,
  customerPreferredSex: "any",

  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min

  // IncomingCall
  firstName: "",
  lastInitial: "",
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

    case ACTIONS.INVITATIONACCEPT: {
      return {
        ...state,
        linguistTokboxSessionID: payload.tokboxSessionID,
        linguistTokboxSessionToken: payload.tokboxSessionToken,
        accept: payload.accept,
        sessionID: payload.sessionID
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