import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./Ducks";
import ReduxNavigation from "./Navigation/ReduxNavigation";

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

const store = createStore(
  rootReducer,
  /* preloadedState, */
  getComposeEnhancers()
);

const App = () => (
  <Provider store={store}>
    <ReduxNavigation />
  </Provider>
);

export default App;
