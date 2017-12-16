import { Sessions } from "../Api";

// Actions
export const ACTIONS = {
  CLEAR: "callCustomerSettings/clear",
  UPDATE: "callCustomerSettings/update",
  CREATESESSION: "callCustomerSettings/session",
  CREATEINVITATION: "callCustomerSettings/invitation",
  INCREMENT_TIMER: "callCustomerSettings/incrementTimer",
  RESET_TIMER: "callCustomerSettings/resetTimer"
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
  tokenBLAH
}) => dispatch => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTM0MzQxMDcsImp0aSI6IjZlZTljMzRjLTU5Y2UtNDBlNi04NGUyLTMxZTAyZWIwZDMzMiIsImlhdCI6MTUxMzM0NzcwNywiaXNzIjoic29sby5hcGkuY29tIiwic3ViIjoiMjIyMjIyMjItMjIyMi0yMjIyLTIyMjItMjIyMjIyMjIyMjIyIiwidXNlciI6eyJpZCI6IjIyMjIyMjIyLTIyMjItMjIyMi0yMjIyLTIyMjIyMjIyMjIyMiIsImZpcnN0TmFtZSI6IkJvYiIsImxhc3ROYW1lIjoiQmFydG9uIiwiZW1haWwiOiJib2JAZXhhbXBsZS5jb20ifX0.A6sHR7hBMgdScZaSXVq1DSeCtCWJmVaXyJ4C2Ioa4Zo";

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
      console.log(error);
    });
};

// create customer Invitation, and return invitationID
// example input values
// linguistID: "11111111-1111-1111-1111-111111111111"
// role: "linguist";
export const AsyncCreateInvitation = async (
  sessionID,
  linguistID,
  role,
  token
) => {
  await Sessions.customerInvitation(sessionID, linguistID, role, token)
    .then(response => {
      dispatch(createInvitation(response.data));
    })
    .catch(error => {
      console.log(error);
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
  invitationID: null
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