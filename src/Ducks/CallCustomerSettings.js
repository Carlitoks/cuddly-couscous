import OpenTok from "react-native-opentok";
import { networkError } from "./NetworkErrorsReducer";
import { Sessions } from "../Api";
import { REASON, TIME } from "../Util/Constants";
import { updateSettings as updateContactLinguist } from "./ContactLinguistReducer";
import { setSession, clear } from "./tokboxReducer";

// Actions
export const ACTIONS = {
  CLEAR: "callCustomerSettings/clear",
  UPDATE: "callCustomerSettings/update",
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

  dispatch(
    updateSettings({
      timer: null,
      elapsedTime: 0
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
      } else if (reason === REASON.RETRY) {
        dispatch(clearSettings());
        dispatch(clear());
        dispatch({ type: "CustomerView" });
      } else if (reason === REASON.TIMEOUT) {
        dispatch(
          updateContactLinguist({
            modalReconnect: true,
            counter: TIME.RECONNECT
          })
        );
      } else {
        dispatch({ type: "RateCallView" });
      }
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(clearSettings());
      dispatch(clear());
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

export const AsyncCreateSession = ({
  type,
  matchMethod,
  primaryLangCode,
  secundaryLangCode,
  estimatedMinutes,
  scenarioID,
  token
}) => dispatch => {
  return Sessions.createSession(
    type,
    matchMethod,
    primaryLangCode,
    secundaryLangCode,
    estimatedMinutes,
    scenarioID,
    token
  )
    .then(response => {
      // verify if there is linguist available
      return Sessions.GetSessionInfoLinguist(response.data.sessionID, token)
        .then(res => {
          dispatch(setSession(response.data));
          if (
            (!res.data.queue || !res.data.queue.pending) &&
            !res.data.queue.sending
          ) {
            response.data.notLinguistAvailable = true;
          }
          return response;
        })
        .catch(error => dispatch(networkError(error)));
    })
    .catch(error => dispatch(networkError(error)));
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
  return Sessions.customerInvitation(sessionID, linguistID, role, token)
    .then(response => {
      return dispatch(createInvitation(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

export const closeOpenConnections = () => dispatch => {
  OpenTok.disconnectAll();
  dispatch(clearSettings());
  dispatch(clear());
};

// Initial State
const initialState = {
  // Call Settings
  mute: false,
  video: false,
  speaker: true,
  rotate: true,
  timer: null,
  elapsedTime: 0,
  invitationID: null,
  customerPreferredSex: "any",
  customerExtraTime: true,

  // Max Call Time
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 8 // Initial time selected: 10 min
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
