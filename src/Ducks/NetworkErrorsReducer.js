import { clearView as clearUserProfile } from "./UserProfileReducer";
import { clearCallHistory as clearHistory } from "./CallHistoryReducer";
import { clearSettings as clearCustomerSettings } from "./CallCustomerSettings";
import { clearSettings as clearLinguistSettings } from "./CallLinguistSettings";
import { clear as clearTokbox } from "./tokboxReducer";
import { logOut } from "./AuthReducer";

const ACTIONS = {
  CLEAR: "networkErrors/clear",
  ERROR: "networkErrors/error"
};

export const clearError = () => ({
  type: ACTIONS.CLEAR
});

export const setError = error => ({
  type: ACTIONS.ERROR,
  payload: error
});

export const networkError = error => dispatch => {
  dispatch(setError(error));
  if (error && error.response && error.response.status) {
    dispatch(handleError(error.response.status));
  }
};

const handleError = status => dispatch => {
  switch (status) {
    case 401:
      dispatch(unauthorizedError());
      break;

    case 404:
      dispatch(notFoundError());
      break;

    case 500:
      dispatch(serverError());
      break;

    default:
      dispatch(serverError());
      break;
  }
};

const unauthorizedError = () => dispatch => {
  dispatch(logOut());
  dispatch(clearUserProfile());
  dispatch(clearHistory());
  dispatch(clearSettings());
  dispatch(clearError());
  dispatch({ type: "SelectRoleView" });
};

const notFoundError = () => dispatch => {
  dispatch(logOut());
  dispatch(clearUserProfile());
  dispatch(clearHistory());
  dispatch(clearSettings());
  dispatch(clearError());
  dispatch({ type: "SelectRoleView" });
};

const serverError = () => (dispatch, getState) => {
  dispatch(clearSettings());
  dispatch(clearTokbox());
  dispatch({ type: "Home" });
};

const clearSettings = () => (dispatch, getState) => {
  const { userProfile } = getState();

  if (userProfile.linguistProfile) {
    dispatch(clearLinguistSettings());
  } else {
    dispatch(clearCustomerSettings());
  }
};

const initialState = {
  errors: null
};

const networkErrors = (state = initialState, action = {}) => {
  const { payload, type } = action;
  const errors = {};
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.ERROR: {
      if (payload.request._hasError) {
        return {
          ...state,
          errors: payload.request._response
        };
      } else if (payload) {
        console.log(payload);
        return {
          ...state,
          errors: payload
        };
      }
    }

    default: {
      return state;
    }
  }
};

export default networkErrors;
