import { CallHistory } from "../Api";
import { networkError } from "./NetworkErrorsReducer";

const ACTIONS = {
  CLEAR: "callHistory/clearCallHistory",
  CUSTOMERCALLS: "callHistory/customerCalls",
  LINGUISTCALLS: "callHistory/linguistCalls",
  MISSEDCALLS: "callHistory/linguistMissedCalls",
  SELECTED: "callHistory/indexOnChange"
};

export const customerCalls = payload => ({
  type: ACTIONS.CUSTOMERCALLS,
  payload
});
export const linguistCalls = payload => ({
  type: ACTIONS.LINGUISTCALLS,
  payload
});
export const linguistMissedCalls = payload => ({
  type: ACTIONS.MISSEDCALLS,
  payload
});

export const indexOnChange = payload => ({
  type: ACTIONS.SELECTED,
  payload
});

export const clearCallHistory = () => ({
  type: ACTIONS.CLEAR
});

// get all calls for customers

export const getAllCustomerCalls = (userId, token) => dispatch => {
  return CallHistory.getAllCustomerCalls(userId, token)
    .then(response => {
      return response.data;
    })
    .catch(error => dispatch(networkError(error)));
};

//get all calls for linguist

export const getAllLinguistCalls = (userId, token) => dispatch => {
  return CallHistory.getAllLinguistCalls(userId, token)
    .then(response => {
      return response.data;
    })
    .catch(error => dispatch(networkError(error)));
};

//get missed calls for linguist

export const getMissedLinguistCalls = (userId, token) => dispatch => {
  return CallHistory.getMissedLinguistCalls(userId, token)
    .then(response => {
      return response.data;
    })
    .catch(error => dispatch(networkError(error)));
};

const initialState = {
  allCustomerCalls: [],
  allLinguistCalls: [],
  linguistMissedCalls: [],
  recentCalls: [],
  selectedIndex: 0
};

const callHistory = (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }
    case ACTIONS.SELECTED: {
      return { ...state, selectedIndex: payload };
    }
    case ACTIONS.CUSTOMERCALLS: {
      return { ...state, allCustomerCalls: payload };
    }
    case ACTIONS.LINGUISTCALLS: {
      return { ...state, allLinguistCalls: payload };
    }
    case ACTIONS.MISSEDCALLS: {
      return { ...state, linguistMissedCalls: payload };
    }
    default: {
      return state;
    }
  }
};

export default callHistory;
