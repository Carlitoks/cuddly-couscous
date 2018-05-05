import { networkError } from "./NetworkErrorsReducer";
import { Sessions, Scenarios } from "../Api";

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

export const cleanSelected = () => dispatch => {
  dispatch(
    updateSettings({
      customScenario: "",
      categoryIndex: -1,
      listItemSelected: -1,
      formHasErrors: false
    })
  );
};

export const getCategories = token => dispatch => {
  Scenarios.get(token)
    .then(response => {
      const categories = response.data.map(cat => cat.category);
      categories.push("qr");
      dispatch(updateSettings({ categories: [...new Set(categories)] }));
    })
    .catch(error => dispatch(networkError(error)));
};

export const getScenarios = token => dispatch => {
  Scenarios.get(token)
    .then(response => {
      dispatch(updateSettings({ scenarios: response.data }));
    })
    .catch(error => dispatch(networkError(error)));
};

// Initial State
const initialState = {
  categories: [],
  formHasErrors: false,
  customScenario: "",
  scenarios: [],
  carouselFirstItem: 0,
  categoryIndex: -1,
  listItemSelected: -1,
  categorySelected: "",
  selectedScenarioIndex: -1,
  scenariosList: null
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
