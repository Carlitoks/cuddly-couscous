import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";

import { saveState, loadState } from "./LocalStorage";
import rootReducer from "../Ducks";

import { SETTINGS } from "../Util/Constants";

const middleware = [thunk];

const store = null;

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

    store = createStore(rootReducer, initialState, getComposeEnhancers());

    // Persisting the store on the asyncStorage
    store.subscribe(
      throttle(() => {
        const settings = store.getState().userProfile.linguistProfile
          ? SETTINGS.LINGUIST
          : SETTINGS.CUSTOMER;
        saveState({
          auth: store.getState().auth,
          userProfile: store.getState().userProfile,
          tokbox: store.getState().tokbox,
          [settings]: store.getState()[settings],
          settings: store.getState().settings,
          profileLinguist: store.getState().profileLinguist,
          pushNotification: store.getState().pushNotification,
          onboardingRecord: store.getState().onboardingRecord,
          homeFlow: store.getState().homeFlow
        }).then(() => {
          // console.log("STATE PERSISTED")
        });
      }, 1000)
    );

    return store;
  });

export default getStore;
