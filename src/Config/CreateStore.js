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
