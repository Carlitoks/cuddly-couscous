import { networkError } from "./NetworkErrorsReducer";
import { Sessions } from "../Api";

// Actions
export const ACTIONS = {
  CLEAR: "homeFlow/clear",
  UPDATE: "homeFlow/update"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const getCategories = () => dispatch => {
  const categories = Sessions.GetCategories();
  return dispatch(updateSettings({ categories }));
};

// Initial State
const initialState = {
  categories: [],
  formHasErrors: false,
  customScenario: ""
};

// Reducer
const homeFlow = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};

export default homeFlow;
