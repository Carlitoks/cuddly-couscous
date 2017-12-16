import { Sessions } from "../Api";
// Actions
export const ACTIONS = {
  CLEAR: "callLinguistSettings/clear",
  UPDATE: "callLinguistSettings/update",
  INVITATIONDETAIL: "callLinguistSettings/invitationDetail",
  INVITATIONACCEPT: "callLinguistSettings/invitationAccept",
  INCREMENT_TIMER: "callLinguistSettings/incrementTimer",
  RESET_TIMER: "callLinguistSettings/resetTimer"
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

export const AsyncFetchInvitationDetail = async (invitationID, token) => {
  await Sessions.LinguistFetchesInvite(invitationID, token)
    .then(response => {
      dispatch(invitationDetail(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};
export const AsyncAcceptsInvite = async (invitationID, accept, token) => {
  Sessions.LinguistAcceptsInvite(invitationID, accept, token)
    .then(reponse => {
      dispatch(invitationAccept(response.data));
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
  linguistTokboxSessionID: null,
  linguistTokboxSessionToken: null,
  accept: false
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
    case ACTIONS.INVITATIONACCEPT: {
      return {
        ...state,
        linguistTokboxSessionID: payload.tokboxSessionID,
        LinguistTokboxSessionToken: payload.tokboxSessionToken,
        accept: payload.accept
      };
    }
    case ACTIONS.INCREMENT_TIMER: {
      return {
        ...state,
        elapsedTime: state.elapsedTime + 1
      };
    }
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export default callLinguistSettings;
