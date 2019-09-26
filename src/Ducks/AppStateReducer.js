import _merge from "lodash/merge";
import {requestPermissions as requestPermissionsUtil} from "../Util/Permission";
import Permissions from "react-native-permissions";
import {NetInfo, Platform} from "react-native";
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

    // device permission status
    permissions: {
      camera: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      },
      microphone: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      },
      location: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      },
      photo: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      },
      // ios only
      notification: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      },
      // android only
      storage: {
        granted: false,
        status: 'undetermined',
        requestedThisSession: false,
        lastRequestedAt: null
      }
    }
  }
};

// TODO: ensure app state is restored properly
export const init = () => (dispatch, getState) => {
  // TODO: init app locale stuff
  dispatch(update(_merge({}, getState().appState, {
    permissions: {
      camera: {
        requestedThisSession: false,
      },
      microphone: {
        requestedThisSession: false,
      },
      location: {
        requestedThisSession: false,
      },
      photo: {
        requestedThisSession: false,
      },
      notification: {
        requestedThisSession: false,
      },
      storage: {
        requestedThisSession: false,        
      }
    }
  })));
  return dispatch(detectPermissions());
};

// trigger OS permission request dialogues, they are activated in the order specified
export const requestPermissions = (perms) => (dispatch, getState) => {
  return requestPermissionsUtil(perms).finally(() => {
    let updates = {permissions: {}};
    perms.forEach((perm) => {
      updates.permissions[perm] = {
        requestedThisSession: true,
        lastRequestedAt: new Date().getTime()
      };
    });
    dispatch(update(_merge({}, getState().appState, updates)));
    return dispatch(detectPermissions());
  });
};

// detect & set OS permission status in state
export const detectPermissions = () => (dispatch, getState) => {
  let perms = ['camera', 'microphone', 'location', 'photo'];
  if ("ios" == Platform.OS) {
    perms.push('notification');
  }
  if ("android" == Platform.OS) {
    perms.push("storage");
  }

  return new Promise((resolve, reject) => {
    Permissions.checkMultiple(perms)
    .then((res) => {
      let updates = {permissions: {}};
      // Set the updates object 
      perms.forEach((perm) => {
        updates.permissions[perm] = {
          status: '', granted: false
        };
      });

      // update state
      perms.forEach((perm) => {
        if (!!res && !!res[perm]) {
          updates.permissions[perm].status = res[perm];
          if ("authorized" == res[perm]) {
            updates.permissions[perm].granted = true;
          }
        }
      });
      dispatch(update(_merge({}, getState().appState, updates)));
      resolve(res);
    })
    .catch(reject);
  });
};

// detect network connection status from device
export const detectNetworkStatus = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    NetInfo.getConnectionInfo()
    .then((connectionInfo) => {
      const hasNetworkConnection = connectionInfo.type != "none"
      dispatch(update({ connectionInfo, hasNetworkConnection }));
      resolve(connectionInfo);
    })
    .catch(reject);
  });
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
