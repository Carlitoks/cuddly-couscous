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
    migrateAuthState(initialState);

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
          auth: state.auth,
          auth2: state.auth2,
          userProfile: state.userProfile,
          tokbox: state.tokbox,
          profileLinguist: state.profileLinguist,
          pushNotification: state.pushNotification,
          onboardingRecord: state.onboardingRecord,
          homeFlow: state.homeFlow,
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

// convert old auth state to new auth state
const migrateAuthState = (state) => {
  auth2 = state.auth2 || {};
  auth = state.auth || {};
  if (!!auth.uuid) {
    auth2.userID = auth.uuid;
    delete auth.uuid;
  }
  if (!!auth.token) {
    auth2.userJwtToken = auth.token;
    delete auth.token;
  }
  if (!!auth.deviceId) {
    auth2.deviceID = auth.deviceId;
    delete auth.deviceId;
  }
  if (!!auth.deviceToken) {
    auth2.deviceJwtToken = auth.deviceToken;
    delete auth.deviceToken;
  }
  state.auth2 = auth2;
  delete state.auth;
};
