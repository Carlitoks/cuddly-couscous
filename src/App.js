import React, { Component } from "react";
import { Provider } from "react-redux";
import { Text } from "react-native";

import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";


import { haveSession } from "./Ducks/AuthReducer";

import { dumpAsyncStorage, clearState } from "./Config/LocalStorage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loadingStore: true,
      store: null
    };
  }

  componentWillMount() {
    createStore().then(store => {
      this.setState({
        isLoggedIn: store.getState().auth.isLoggedIn,
        loadingStore: false,
        store
      });
    });
  }

  componentDidMount() {
  }

  // dumpAsyncStorage().then(data => console.log(data));

  render() {
    if (this.state.loadingStore) return null;

    return (
      <Provider store={this.state.store}>
        <ReduxNavigation />
      </Provider>
    );
  }
}

export default App;
