import api from '../Config/AxiosConfig';
import { getLastUpdateTime } from 'react-native-device-info';

// The purpose of this reducer is to manage the status of an active Jeenie session.
// Note that this does NOT include anything related to connection handling with
// Tokbox.

const ACTIONS = {
  UPDATE: 'currentSessionReducer/update',
  CLEAR: 'currentSessionReducer/clear'
}

const initialState = {
  // role info for convenience elsewhere
  role: '', // linguist|customer
  isLinguist: false,
  isCustomer: true,

  // session params sent to the server
  sessionID: null,
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
  ending: false,
};

export const createNewSession = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(clear());
    dispatch(update({
      role: 'customer',
      isLinguist: false,
      isCustomer: true,
      session: params
    }));
    api.post('/sessions', params).then((res) => {
      console.log(res.data)
      dispatch(update({credentials: res.data, sessionID: res.data.sessionID}));
      resolve(res.data);
    }).catch((e) => {
      if (!!e.response) {
        dispatch(update({createError: e.response.data}));
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
export const endSession = (reason) => (dispatch, getState) => {
  const {sessionID} = getState().currentSessionReducer;

  dispatch(update({ending: true}));
  return new Promise((resolve, reject) => {
    api.put(`/sessions/${sessionID}/end`, {reason})
    .then(resolve)
    .catch(reject)
    .finally(() => {
      dispatch(update({ending: false, ended: true}));
    });
  });
  
  return Promise.reject('not implemented');
};

// session was ended by another participant
export const handleEndedSession = () => (dispatch) => {
  dispatch(clear());
};


// action creators
export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

// the exported reducer
export default currentSessionReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTIONS.UPDATE: {
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
      return state;
    }
  }
};