import api from '../Config/AxiosConfig';
import lodashMerge from 'lodash/merge';
import { getGeolocationCoords } from '../Util/Helpers';
import {SESSION} from "../Util/Constants";

import {
  loadUser,
  loadCustomerCallHistory,
  loadLinguistCallHistory,
} from "./AccountReducer";

// The purpose of this reducer is to manage the status of an active Jeenie session.
// Note that this does NOT include anything related to connection handling with
// Tokbox.

const ACTIONS = {
  UPDATE: 'currentSessionReducer/update', // set the state
  MERGE: 'currentSessionReducer/merge', // merge in nested updates to state
  CLEAR: 'currentSessionReducer/clear' // reset state to initial state
}

const initState = () => ({
  // role info for convenience elsewhere
  role: '', // linguist|customer
  isLinguist: false,
  isCustomer: true,

  // session params sent to the server
  sessionID: null,
  session: {},

  // related session event data, if relevant
  event: {},

  // credentials for joining session (Opentok)
  credentials: {},

  // incoming invite
  inviteID: null,
  invite: {},

  // user info of the other person, either the linguist, or customer
  remoteUser: {},
  // remoteUsers: [] // one day...

  // basic existence state
  status: {
    creating: true,
    created: false,
    began: false, // did both sides initially connect?
    ended: false,
    ending: false,
    endedLocally: false,
    endedRemotely: false,
  },

  // status of the session timer, contains a log of start/stop/reset events
  timer: {
    running: false,
    // list of events, each item in format of `{action: "start|stop|reset", time: Date().getTime()}`
    events: [],
  },

  // TODO: timestamped technical issue reports during session
  issues: [],

  // TODO: initial error handling?
  createError: null,
  acceptInviteError: null,
  respondingToInvite: false,
});

const localTestHack = (dispatch) => {
  setTimeout(() => {
    dispatch(setRemoteUser({
      id: "22222222-2222-2222-2222-222222222223",
      firstName: "Evan",
      lastInitial: "V"
    }));
  }, 2000);
};

// create a new session as a customer
export const createNewSession = (params) => (dispatch, getState) => {

  // TODO: clear the new session reducer?

  // localTestHack(dispatch);

  // ... why?  Would like to remove this hack
  if ('custom' == params.scenarioID) {
    delete params.scenarioID;
  }

  // this is because an old mistake on the server named the field incorrectly in one place
  if (!!params.customScenarioNote) {
    params.customScenario = params.customScenarioNote
  }

  return new Promise((resolve, reject) => {
    dispatch(clear());
    dispatch(update({
      role: 'customer',
      isLinguist: false,
      isCustomer: true,
      session: params,
      status: { creating: true, created: false, began: false, ending: false, ended: false }
    }));

    getGeolocationCoords()
    .then((res) => {
      params.location = [res.coords.longitude, res.coords.latitude];
    })
    .finally(() => {
      return api.post('/sessions', params)
    })
    .then((res) => {
      dispatch(update({
        credentials: res.data,
        sessionID: res.data.sessionID,
        session: {
          ...getState().currentSessionReducer.session,
          id: res.data.sessionID,
          durationBalanceLimit: res.data.durationBalanceLimit || null,
          durationTimeLimit: res.data.durationTimeLimit || null
        },
        status: { creating: false, created: true, began: false, ending: false, ended: false }
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

// sets the remote user, generally set when a linguist accepts an incoming call
export const setRemoteUser = (user) => (dispatch, getState) => {
  dispatch(update({remoteUser: user}));
};

// as a linguist, receive a session invite - it is assumed tkat the invite
// is valid to recive at this point
export const receiveSessionInvite = (invite) => (dispatch, getState) => {
  return new Promise((resolve) => {
    dispatch(clear());
    dispatch(update({
      role: "linguist",
      isLinguist: true,
      isCustomer: false,
      invite,
      inviteID: invite.id,
      session: invite.session,
      sessionID: invite.session.id,
      remoteUser: invite.createdBy,
      event: invite.event,
      status: { creating: false, created: true, began: false, ending: false, ended: false }
    }));
    resolve();
  });
};

export const viewSessionInvite = () => (dispatch, getState) => {
  const {inviteID} = getState().currentSessionReducer;
  return new Promise((resolve, reject) => {
    let payload = {
      viewed: true
    };

    getGeolocationCoords()
    .then((res) => {
      payload.location = [res.coords.longitude, res.coords.latitude];
    })
    .finally(() => {
      return api.put(`/session-invitations/${inviteID}`, payload);
    })
    .then(resolve)
    .catch(reject);
  });
};

// accept a previously received session invite
export const acceptSessionInvite = () => (dispatch, getState) => {
  const {inviteID, respondingToInvite} = getState().currentSessionReducer;
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

// decline the previously received session invite
export const declineSessionInvite = () => (dispatch, getState) => {
  const {inviteID, respondingToInvite} = getState().currentSessionReducer;
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

// mark the session as having begun, and start the session timer
export const setSessionBegan = () => (dispatch, getState) => {
  const {status} = getState().currentSessionReducer;
  dispatch(update({
    status: {
      ...status,
      began: true
    }
  }));
  dispatch(startTimer());
}

// start the session timer
export const startTimer = () => (dispatch, getState) => {
  const {running, events} = getState().currentSessionReducer.timer;
  if (running) {
    return;
  }
  let e = events;
  e.push({
    action: "start",
    time: new Date().getTime()
  });
  dispatch(update({timer: {
    running: true,
    events: e,
  }}));
};

// stop the session timer
export const stopTimer = () => (dispatch, getState) => {
  const {running, events} = getState().currentSessionReducer.timer;
  if (!running) {
    return;
  }
  let e = events;
  e.push({
    action: "stop",
    time: new Date().getTime()
  });
  dispatch(update({timer: {
    running: false,
    events: e,
  }}));
};

// reset the timer
export const resetTimer = (elapsed, source) => (dispatch, getState) => {
  const {timer} = getState().currentSessionReducer;
  let e = timer.events;
  const now = new Date().getTime();
  if (timer.running) {
    e.push({action: "stop", time: now});
  }
  e.push({
    action: "reset",
    time: new Date().getTime(),
    source,
    elapsed
  });
  if (timer.running) {
    e.push({action: "start", time: now});
  }
  dispatch(update({timer: {
    running: timer.running,
    events: e
  }}));
};

export const getElapsedTime = () => (dispatch, getState) => {
  const {events} = getState().currentSessionReducer.timer;

  let elapsed = 0;
  let startedAt = null;
  for (e of events) {
    switch (e.action) {
      case 'start': startedAt = e.time; break;
      case 'stop': elapsed += e.time - startedAt; break;
      case 'reset': elapsed = e.elapsed; break;
    }
  }
  return elapsed;
};

export const canRejoinSession = () => (dispatch, getState) => {
  const {session, status} = getState().currentSessionReducer;
  if (!session.id || status.ending || status.ended) {
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    api.get(`/sessions/${session.id}/status`)
    .then((res) => {
      if (res.data.session.ended) {
        dispatch(clear());
        resolve(false);
      } else {
        resolve(true);
      }
    })
    .catch(reject);
  });
};

// initiate ending the session
export const endSession = (reason) => (dispatch, getState) => {
  const {sessionID, status, session, timer, isCustomer} = getState().currentSessionReducer;

  dispatch(update({
    status: {
      ...status,
      ending: true,
      ended: false,
    },
    session: {
      ...session,
      endReason: reason
    }
  }));
  dispatch(stopTimer());

  return new Promise((resolve, reject) => {
    api.put(`/sessions/${sessionID}/end`, {
      reason,
      timer: timer.events
    })
    .then((res) => {

      // reload the users data, but we're not going to
      // wait for it to succeed or fail - just need to
      // ensure that cached data is reloaded
      dispatch(loadUser(false));
      if (isCustomer) {
        dispatch(loadCustomerCallHistory(false));
      } else {
        dispatch(loadLinguistCallHistory(false));
      }

      // resolve the result of ending the session
      resolve(res);
    })
    .catch(reject)
    .finally(() => {
      dispatch(update({
        status: {
          ...getState().currentSessionReducer.status,
          ending: false,
          endedLocally: true,
          ended: true
        }
      }));
    });
  });
};

// session was ended by another participant.  The received reason is the
// reason as sent from their client.  Therefore, it is modified here
// to be accurate from the perspective of this client.
//
// Example: if the remote user ends the call because of "failure_local" on THEIR client,
// that implies that on this client the end reason is "failure_remote".
export const handleEndedSession = (reason) => (dispatch, getState) => {
  const {status, session, isCustomer} = getState().currentSessionReducer;
  let endReason = reason;
  switch (reason) {
    case SESSION.END.FAILURE_LOCAL: {
      endReason = SESSION.END.FAILURE_REMOTE; break;
    }
    case SESSION.END.FAILURE_REMOTE: {
      endReason = SESSION.END.FAILURE_LOCAL; break;
    }
    case SESSION.END.DISCONNECT_LOCAL: {
      endReason = SESSION.END.DISCONNECT_REMOTE; break;
    }
    case SESSION.END.DISCONNECT_REMOTE: {
      endReason = SESSION.END.DISCONNECT_LOCAL; break;
    }
  }
  dispatch(update({
    status: {
      ...status,
      ending: false,
      ended: true,
      endedRemotely: true,
    },
    session: {
      ...session,
      endReason
    }
  }));

  // reload the users data, but we're not going to
  // wait for it to succeed or fail - just need to
  // ensure that cached data is reloaded
  dispatch(loadUser(false));
  if (isCustomer) {
    dispatch(loadCustomerCallHistory(false));
  } else {
    dispatch(loadLinguistCallHistory(false));
  }

  return Promise.resolve(true);
};

// action creators
export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

// the exported reducer
export default currentSessionReducer = (state = null, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...(state || initState()),
        ...payload
      }
    }

    case ACTIONS.MERGE: {
      return lodashMerge({}, state || initState(), payload);
    }

    case ACTIONS.CLEAR: {
      return initState();
    }

    default: {
      return state || initState();
    }
  }
};
