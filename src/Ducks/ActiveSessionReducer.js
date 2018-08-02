const ACTIONS = {
  CLEAR_SESSION: "activeSession/clearSession",
  UPDATE_SESSION: "activeSession/updateSession",
  ENSURE_SESSION: "activeSession/ensureSession",
  END_SESSION: "activeSession/endSession",

  ERROR: "activeSession/error"
};

export const ensureSession = payload => ({
  type: ENSURE_SESSION,
  payload
});

export const clearSession = () => ({
  type: CLEAR_SESSION
});

export const updateSession = payload => ({
  type: UPDATE_SESSION,
  payload
});

export const endSession = () => ({
  type: END_SESSION
});

export const error = payload => ({
  type: ACTIONS.ERROR,
  payload
});

export const sessionEvent = payload => ({
  type: type,
  payload: payload
});

const initialState = {};

const activeSessionReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default activeSessionReducer;
