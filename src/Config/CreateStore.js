import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";

import { saveState, loadState } from "./LocalStorage";
import rootReducer from "../Ducks";

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

export const getS = () => {
  return store;
};

const getStore = () =>
  // Rehydrating the store
  loadState().then(persistedStore => {
    const initialState = persistedStore || {};

    store = createStore(rootReducer, initialState, getComposeEnhancers());

    // Persisting the store on the asyncStorage
    store.subscribe(
      throttle(() => {
        saveState({
          auth: store.getState().auth
        }).then(() => {
          // console.log("STATE PERSISTED")
        });
      }, 1000)
    );

    return store;
  });

export default getStore;
