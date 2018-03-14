import React, { Component } from "react";
import { Provider } from "react-redux";
import { NetInfo } from "react-native";
import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";

import { delayUpdateInfo } from "./Ducks/NetworkInfoReducer";
import {
  remoteNotificationReceived,
  registerFCM
} from "./Ducks/PushNotificationReducer";

import { dumpAsyncStorage, clearState } from "./Config/LocalStorage";

import PushNotifications, {
  emitLocalNotification
} from "./Util/PushNotification";

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

        // Listener to notificaciones received by the app in active state
        PushNotifications.addListener(notif => {
          store.dispatch(remoteNotificationReceived(notif.invitationID));
        });
        // set callback for the remote notifications received by the app in background state
        PushNotifications.setCallbackRemoteNotifications(notif => {
          if (notif) {
            store.dispatch(remoteNotificationReceived(notif.invitationID));
          }
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

    PushNotifications.cleanListeners();
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
