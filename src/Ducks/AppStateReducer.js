
// The purpose of this is to manage app UI & config state that is either 
// determined or modifiable by the user.

const initState = () => {
  return {
    uiLangCode: '', // the current localization for i18n
    isCustomerMode: true,
    isLinguistMode: false,
  }
};

// TODO: ensure app state is restored properly
export const init = () => (dispatch, getState) => {
  
};

// TODO: validate, record code, choose default if necessary, configure i18n
export const setInterfaceLanguage = (code) => (dispatch, getState) => {
  
};

const ACTIONS = {
  CLEAR: "appState/clear",
  MERGE: "appState/merge",
  UPDATE: "appState/update"
};

// action creators
export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

const appStateReducer = (state = null, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }

    case ACTIONS.MERGE: {
      return lodashMerge({}, state || initState(), payload);
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

export default appStateReducer;
