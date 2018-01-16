import { Sessions } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

import moment from "moment";
import _sortBy from "lodash/sortBy";

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
    callLinguistSettings: { polling }
  } = getState();

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
        // from two minutes ago
        const lastInvitationDate = new moment(lastInvitation.createdAt);

        const minutesDiff = lastInvitationDate.diff(moment(), "minutes");

        // If the call if 2 minutes old we take the call
        if (minutesDiff <= 0 && minutesDiff >= -1 && polling) {
          const iid = sortedResponse[length - 1].id;
          const reason = { accept: true };

          // We turn off polling until HomeLinguistView is mounted again
          dispatch(updateSettings({ polling: false }));
          dispatch(AsyncAcceptsInvite(iid, reason, token));
        }
      } else {
        console.log("There are no invitations");
      }

      if (polling) {
        setTimeout(() => {
          dispatch(getInvitations());
        }, 10000);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const resetTimerAsync = () => (dispatch, getState) => {
  const { callCustomerSettings } = getState();

  clearInterval(callCustomerSettings.timer);
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

export const AsyncFetchInvitationDetail = (invitationID, token) => dispatch => {
  Sessions.LinguistFetchesInvite(invitationID, token)
    .then(response => {
      dispatch(invitationDetail(response.data));
    })
    .catch(error => {
      dispatch(networkError(error));
    });
};
export const AsyncAcceptsInvite = (invitationID, accept, token) => dispatch => {
  Sessions.LinguistAcceptsInvite(invitationID, accept, token)
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
  elapsedTime: 0,
  linguistTokboxSessionID: null,
  linguistTokboxSessionToken: null,
  accept: false,
  customerPreferredSex: "female",

  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min

  polling: true
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