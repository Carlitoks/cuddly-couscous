import _merge from "lodash/merge";

// The purpose of this is to manage app UI & config state that is either
// determined or modifiable by the user.

const initState = () => {
  return {
    uiLangCode: 'en', // the current localization for i18n, replace SettingsReducer
    isCustomerMode: true,
    isLinguistMode: false,
    hasNetworkConnection: true,
    // the raw connection info response from NetInfo
    connectionInfo: null,

    // was the last opened link processed?
    openUrlParamsHandled: false,
    // key/value data sent via the last opened link
    openUrlParams: {},

    // was the install link processed?
    installUrlParamsHandled: false,
    // key/value data sent via initial link when app was installed
    installUrlParams: {},

    // TODO: app state (background/foreground, etc)
  }
};

// TODO: ensure app state is restored properly
export const init = () => (dispatch, getState) => {
  // TODO: init app locale stuff
};

// TODO: validate, record code, choose default if necessary, configure i18n
export const setInterfaceLanguage = (code) => (dispatch, getState) => {
  // TODO: set locale in all the places needed:
  //  * i18n
  //  * instabug
  //  * moment.js
};


const ACTIONS = {
  CLEAR: "appState/clear",
  MERGE: "appState/merge",
  UPDATE: "appState/update"
};

// action creators
// update state
export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
// merge in nested state updates
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
// reset to initial state
export const clear = () => ({type: ACTIONS.CLEAR});

const reducer = (state = null, action = {}) => {
  const { payload, type } = action;
  console.log(type, payload);
  //debugger
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }

    case ACTIONS.MERGE: {
      return _merge({}, state || initState(), payload);
    }

    case ACTIONS.UPDATE: {
      return {
        ...(state || initState()),
        ...payload
    };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
