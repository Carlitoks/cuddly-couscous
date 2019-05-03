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
    try {
      store = createStore(rootReducer, initialState, getComposeEnhancers());
    } catch (e) {
      console.log(e);
    }

    // Persisting the store on the asyncStorage
    store.subscribe(
      throttle(() => {
        saveState({
          auth: store.getState().auth,
          userProfile: store.getState().userProfile,
          tokbox: store.getState().tokbox,
          profileLinguist: store.getState().profileLinguist,
          pushNotification: store.getState().pushNotification,
          onboardingRecord: store.getState().onboardingRecord,
          homeFlow: store.getState().homeFlow,
          appConfigReducer: store.getState().appConfigReducer,
          onboardingReducer: {
            completedLocation: store.getState().onboardingReducer.completedLocation,
            completedNotification: store.getState().onboardingReducer.completedNotification,
            completedMicAndCamera: store.getState().onboardingReducer.completedMicAndCamera
          },
        }).then(() => {
          // console.log("STATE PERSISTED")
        });
      }, 1000)
    );

    return store;
  });

export default getStore;
