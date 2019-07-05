import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./LocalStorage";
import rootReducer from "../Ducks";

const middleware = [thunk];

const getComposeEnhancers = () => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return compose(applyMiddleware(...middleware));
};

const getStore = () =>
  // Rehydrating the store
  loadState().then(persistedStore => {
    const initialState = persistedStore || {};

    let store = null;

    // handle any state conversions required as the result of updating
    // from one version to another
    migrateInitialState(initialState);

    // ensure old top-level state keys are removed
    sanitizeInitialState(initialState);

    // it's possible for an error to be thrown because the store includes
    // old keys that are no longer needed.
    try {
      store = createStore(rootReducer, initialState, getComposeEnhancers());
    } catch (e) {
      console.log(e);
    }

    // Persisting the store on the asyncStorage
    store.subscribe(
      throttle(() => {
        const state = store.getState();
        saveState({
          settings: state.settings,
          auth2: state.auth2,
          appConfigReducer: state.appConfigReducer,
          appState: state.appState,
          account: state.account,
          onboardingReducer: {
            completedLocation: state.onboardingReducer.completedLocation,
            completedNotification: state.onboardingReducer.completedNotification,
            completedMicAndCamera: state.onboardingReducer.completedMicAndCamera
          },
        }).then(() => {
          // console.log("STATE PERSISTED")
        });
      }, 1000)
    );

    return store;
  });

export default getStore;

// Any keys not explicitly defined here will be deleted
// from the initial state object before the store
// is initialized.  This is to prevent errors during creating
// the store that could happen when updating to a new version
// that no longer uses state stored in previous versions.
//
// This takes care of removing old invalid top-level state, so
// migrations don't need to worry about that.
const sanitizeInitialState = (state = {}) => {
  const allowedKeys = [
    'settings',
    'auth2',
    'appConfigReducer',
    'appState',
    'account',
    'onboardingReducer'
  ];

  Object.keys(state).forEach((item) => {
    if (allowedKeys.indexOf(item) == -1) {
      delete state[item];
    }
  });
};

// if any old state is detected and needs to be converted to new
// state, handle that here
const migrateInitialState = (state ={}) => {
  migrateOldAuthState(state);
};

// convert old auth state to new auth state
const migrateOldAuthState = (state = {}) => {
  auth2 = state.auth2 || {};
  auth = state.auth || {};
  if (!!auth.uuid) {
    auth2.userID = auth.uuid;
  }
  if (!!auth.token) {
    auth2.userJwtToken = auth.token;
    auth2.isLoggedIn = true;
  }
  if (!!auth.deviceId) {
    auth2.deviceID = auth.deviceId;
  }
  if (!!auth.deviceToken) {
    auth2.deviceJwtToken = auth.deviceToken;
  }
  state.auth2 = auth2;
};
