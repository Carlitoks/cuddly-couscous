import React from "react";
import { Provider } from "react-redux";

import store from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";

const App = () => (
  <Provider store={store}>
    <ReduxNavigation />
  </Provider>
);

export default App;
