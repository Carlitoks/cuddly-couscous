import React, { Component } from "react";
import { Provider } from "react-redux";
import { NetInfo, Text } from "react-native";
import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";

import { delayUpdateInfo } from "./Ducks/NetworkInfoReducer";
import {
  remoteNotificationReceived,
  registerFCM,
  addListeners
} from "./Ducks/PushNotificationReducer";

import { dumpAsyncStorage, clearState } from "./Config/LocalStorage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loadingStore: true,
      store: null
    };

    //Font doesn't scale
    Text.defaultProps.allowFontScaling = false;
  }

  componentWillMount() {
    createStore()
      .then(store => {
        const { auth } = store.getState();

        this.setState({
          isLoggedIn: auth.isLoggedIn,
          loadingStore: false,
          store
        });

        if (auth.isLoggedIn) {
          store.dispatch(addListeners());
        }
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

        NetInfo.getConnectionInfo().then(connectionInfo => {
          store.dispatch(delayUpdateInfo(connectionInfo));
        });

        // Even Listener to Detect Network Change
        NetInfo.addEventListener(
          "connectionChange",
          this.handleFirstConnectivityChange
        );
      });
    //PushNotificationIOS.addEventListener('register', (token) => console.log('TOKEN', token))
    //PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification, "APP state", AppStateIOS.currentState))
    // you could check the app state to respond differently to push notifications depending on if the app is running in the background or is currently active.
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
      store.dispatch(delayUpdateInfo(connectionInfo));
    }
  };

  componentDidMount() {}

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
