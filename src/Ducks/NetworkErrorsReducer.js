import { clearView as clearUserProfile } from "./UserProfileReducer";
import { clearCallHistory as clearHistory } from "./CallHistoryReducer";
import { displayNetworkAlert } from "./NetworkInfoReducer";
import { logOut } from "./AuthReducer";
import I18n from "../I18n/I18n";
import { displayAlert } from "../Util/Helpers";

const ACTIONS = {
  CLEAR: "networkErrors/clear",
  ERROR: "networkErrors/error",
  UPDATE: "networkErrors/update"
};

export const clearError = () => ({
  type: ACTIONS.CLEAR
});

export const setError = error => ({
  type: ACTIONS.ERROR,
  payload: error
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const networkError = error => (dispatch, getState) => {
  dispatch(displayNetworkAlert());
  dispatch(setError(error));
  if (error && error.response && error.response.status) {
    console.log(error.response.status);
  }
};


const initialState = {
  errors: null,
  networkModal: false
};

const networkErrors = (state = initialState, action = {}) => {
  const { payload, type } = action;
  const errors = {};
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE:
      return {
        ...state,
        ...payload
      };

    case ACTIONS.ERROR: {
      if (payload.request._hasError) {
        return {
          ...state,
          errors: payload.request._response
        };
      } else if (payload) {
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
