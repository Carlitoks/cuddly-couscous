// The purpose of this is to manage app UI & config state that is either 
// determined or modifiable by the user.

const initState = () => {
  return {
    uiLanguage: '',
    isCustomerMode: true,
    isLinguistMode: false,
  }
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
