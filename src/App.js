import React, { Component } from "react";
import { Provider } from "react-redux";
import { Text, NetInfo, SafeAreaView, StyleSheet } from "react-native";

import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";


import { updateNetworkInfo } from "./Ducks/NetworkInfoReducer";

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
    createStore()
      .then(store => {
        this.setState({
          isLoggedIn: store.getState().auth.isLoggedIn,
          loadingStore: false,
          store
        });
      })
      .then(() => {
        // Even Listener to Detect Network Change
        NetInfo.addEventListener(
          "connectionChange",
          this.handleFirstConnectivityChange
        );

        // We Get The Initial Network Information
        return NetInfo.getConnectionInfo();
      })
      .then(connectionInfo => {
        const { store } = this.state;

        store.dispatch(updateNetworkInfo(connectionInfo));
      });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = connectionInfo => {
    const { store } = this.state;

    if (store) {
      store.dispatch(updateNetworkInfo(connectionInfo));
    }
  };

  componentDidMount() {
  }

  // dumpAsyncStorage().then(data => console.log(data));

  render() {
    if (this.state.loadingStore) return null;

    return (
      <Provider store={this.state.store}>
      <SafeAreaView style={styles.safeArea}>
        <ReduxNavigation />
      </SafeAreaView>  
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
})