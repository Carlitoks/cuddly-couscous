import api from '../Config/AxiosConfig';

// The purpose of this reducer is to manage the status of an active Jeenie session.
// Note that this does NOT include anything related to connection handling with
// Tokbox.
const ACTIONS = {
  UPDATE: 'currentSessionReducer/update',
  CLEAR: 'currentSessionReducer/clear'
}

const initialState = {
  role: '', // linguist|customer
  // session params sent to the server
  session: {},
  // related session event data, if relevant
  event: {},
  // credentials for joining session
  credentials: {},
  // incoming invite
  invite: {},
  // data about remote user, either the linguist, or customer
  remoteParticipant: {},

  // TODO: initial error handling?
  createError: null,
  acceptInviteError: null,
  began: false,
  ended: false,
};

export const createNewSession = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(clear());
    dispatch(update({role: 'customer', session: params}));
    api.post('/sessions').then((res) => {
      dispatch(update({credentials: res.data}));
      resolve(res.data);
    }).catch((e) => {
      if (!!e.response) {
        dispatch(update({createError: e.response.data}))
      }
      reject(e);
    });
  });
};

export const acceptSessionInvite = (params) => (dispatch) => {
  return Promise.reject('not implemented');
};

export const declineSessionInvite = (inviteID) => (dispatch) => {
  return Promise.reject('not implemented');
};

// initiate ending the session
export const endSession = (reason) => (dispatch) => {
  return Promise.reject('not implemented');
};

// session was ended by another participant
export const handleEndedSession = () => (dispatch) => {
  dispatch(clear());
};


// action creators
export const update = () => ({
  type: ACTIONS.UPDATE,
  payload
});
export const clear = () => ({type: ACTIONS.CLEAR});

// the exported reducer
export default currentSessionReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case UPDATE: {
      return {
        ...state,
        ...payload
      }
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    default: {
      throw new Error('unknown action');
    }
  }
};