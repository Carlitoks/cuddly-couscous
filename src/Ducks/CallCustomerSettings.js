import { networkError } from "./NetworkErrorsReducer";
import { Sessions } from "../Api";

// Actions
export const ACTIONS = {
  CLEAR: "callCustomerSettings/clear",
  UPDATE: "callCustomerSettings/update",
  CREATESESSION: "callCustomerSettings/session",
  CREATEINVITATION: "callCustomerSettings/invitation",
  INCREMENT_TIMER: "callCustomerSettings/incrementTimer",
  RESET_TIMER: "callCustomerSettings/resetTimer",
  ENDSESSION: "callCustomerSettings/endSession"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const createSession = payload => ({
  type: ACTIONS.CREATESESSION,
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
  Sessions.EndSession(sessionID, reason, token)
    .then(response => {
      dispatch(endSession());
      dispatch({ type: "RateCallView" });
    })
    .catch(error => {
      console.log(error);
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

export const AsyncCreateSession = ({
  type,
  matchMethod,
  primaryLangCode,
  secundaryLangCode,
  estimatedMinutes,
  token
}) => dispatch => {
  return Sessions.createSession(
    type,
    matchMethod,
    primaryLangCode,
    secundaryLangCode,
    estimatedMinutes,
    token
  )
    .then(response => {
      return dispatch(createSession(response.data));
    })
    .catch(error => {
      dispatch(networkError(error));
      console.log(error);
      if (error.response) {
        console.log(error.response);
      }
    });
};

// create customer Invitation, and return invitationID
// example input values
// linguistID: "11111111-1111-1111-1111-111111111111"
// role: "linguist";
export const AsyncCreateInvitation = (
  sessionID,
  linguistID,
  role,
  token
) => dispatch => {
  Sessions.customerInvitation(sessionID, linguistID, role, token)
    .then(response => {
      dispatch(createInvitation(response.data));
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
  sessionID: null,
  customerTokboxSessionID: null,
  customerTokboxSessionToken: null,
  invitationID: null,
  customerPreferredSex: "any",

  // Max Call Time
  timeOptions: 12, // Ammount of options on the Picker
  selectedTime: 10 // Initial time selected: 10 min
};

// Reducer
const callCustomerSettings = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CREATESESSION: {
      return {
        ...state,
        sessionID: payload.sessionID,
        customerTokboxSessionID: payload.tokboxSessionID,
        customerTokboxSessionToken: payload.tokboxSessionToken
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
