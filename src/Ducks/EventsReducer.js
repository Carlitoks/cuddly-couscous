import { Events } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

const ACTIONS = {
  SCAN: "events/scan",
  CLEAR: "events/clear"
};

export const scanQR = payload => ({
  type: ACTIONS.SCAN,
  payload
});

const initialState = {
  scanned: ""
};

export const asyncScanQR = (id, token) => dispatch => {
  return Events.getScan(id, token)
    .then(response => {
      return dispatch(scanQR(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

const eventReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.SCAN:
      return {
        ...state,
        ...payload
      };
      break;

    default: {
      return state;
    }
  }
};

export default eventReducer;
