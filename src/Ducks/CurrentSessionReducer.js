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
  inviteID: null,
  invite: {},

  // user info of the other person, either the linguist, or customer
  remoteUser: {},

  // One day:
  // remoteUsers: {}

  // basic existence state
  status: {
    began: false, // did both sides initially connect?
    ended: false,
    ending: false
  },

  // TODO: initial error handling?
  createError: null,
  acceptInviteError: null,
  respondingToInvite: false,
};

export const createNewSession = (params) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(clear());
    dispatch(update({
      role: 'customer',
      isLinguist: false,
      isCustomer: true,
      session: params
    }));
    api.post('/sessions', params).then((res) => {
      dispatch(update({
        credentials: res.data,
        sessionID: res.data.sessionID,
        session: {
          ...getState().currentSessionReducer.session,
          id: res.data.sessionID
        }
      }));
      resolve(res.data);
    }).catch((e) => {
      if (!!e.response) {
        dispatch(update({createError: e.response.data}));
      }
      reject(e);
    });
  });
};

export const setRemoteUser = (user) => (dispatch) => {
  dispatch(update({remoteUser: user}));
};

export const receiveSessionInvite = (invite) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(clear());
    dispatch(update({
      role: "linguist",
      isLinguist: true,
      isCustomer: false,
      invite,
      inviteID: invite.id,
      session,
      sessionID: invite.session.id,
      remoteUser: invite.createdBy,
      event: invite.event,
    }));
    resolve();
  });
};

export const acceptSessionInvite = () => (dispatch, getState) => {
  const {inviteID,respondingToInvite} = getState().currentSessionReducer;
  if (respondingToInvite) {
    return;
  }

  dispatch(update({respondingToInvite: true}));
  return new Promise((resolve, reject) => {
    api.put(`/session-invitations/${inviteID}`, {accept: true})
    .then((res) => {
      dispatch(update({
        credentials: res.data,
        acceptInviteError: null
      }));
      resolve(res);
    })
    .catch((e) => {
      dispatch(update({acceptInviteError: e}));
      reject(e);
    })
    .finally(() => {
      dispatch(update({respondingToInvite: false}));
    });
  });
};

export const declineSessionInvite = () => (dispatch, getState) => {
  const {inviteID,respondingToInvite} = getState().currentSessionReducer;
  if (respondingToInvite) {
    return;
  }

  dispatch(update({respondingToInvite: true}));
  return new Promise((resolve, reject) => {
    api.put(`/session-invitations/${inviteID}`, {accept: false})
    .then(resolve)
    .catch(reject)
    .finally(() => {
      dispatch(update({respondingToInvite: false}));
    });
  });
};

export const setSessionBegan = () => (dispatch, getState) => {
  dispatch(update({
    status: {
      ...getState().currentSessionReducer.status,
      began: true
    }
  }));
}

export const canRejoinSession = () => (dispapch) => {
  // TODO: check status route - if remote user is still
  // connected, user could rejoin that session
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