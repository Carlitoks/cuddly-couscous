import { InterfaceSupportedLanguages } from "../Config/Languages";
// Actions
export const ACTIONS = {
  CLEAR: "settings/clear",
  UPDATE: "settings/update"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const clearSettingsInterface = () => ({
  type: ACTIONS.UPDATE,
  payload: {
    interfaceLocale: null,
    userLocaleSet: false
  }
});

const initialState = {
  interfaceLocale: InterfaceSupportedLanguages.find(
    language => language[1] === "en"
  ),
  userLocaleSet: false,
};

// Reducer
const settings = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }

    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export default settings;
