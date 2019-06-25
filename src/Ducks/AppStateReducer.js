import {NetInfo} from "react-native";
import _merge from "lodash/merge";
import _debounce from "lodash/debounce";

// The purpose of this is to manage app UI & config state that is either 
// determined or modifiable by the user.

const initState = () => {
  return {
    uiLangCode: 'en', // the current localization for i18n, replace SettingsReducer
    isCustomerMode: true,
    isLinguistMode: false,
    hasNetworkConnection: true,
    connectionInfo: null, // the raw connection info response from NetInfo

    // TODO: app state (background/foreground, etc)
  }
};

// TODO: ensure app state is restored properly
export const init = () => (dispatch, getState) => {
  
};

// TODO: validate, record code, choose default if necessary, configure i18n
export const setInterfaceLanguage = (code) => (dispatch, getState) => {
  
};

// TODO: debounce trigger to check for active network connection
export const detectNetworkStatus = () => (dispatch, getState) => {
  // check is connected
  NetInfo.isConnected.fetch().then((isConnected) => {
    dispatch(update({hasNetworkConnection: isConnected}));
  });

  // get connection info
  NetInfo.getConnectionInfo().then((info) => {
    dispatch(update({connectionInfo: info}));
  });
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

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }

    case ACTIONS.MERGE: {
      return _merge({}, state || initState(), payload);
    }

    case ACTIONS.UPDATE: {
      return {
        ...state || initState(),
        ...payload
      };
    }

    default: {
      return state || initState();
    }
  }
};

export default reducer;
