import React, { Component } from "react";
import { Provider } from "react-redux";
import { NetInfo, Text, AppState, Platform } from "react-native";
import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";
import { codePushAndroidKey, codePushiOSKey, analyticsKey } from "./Config/env";

import { delayUpdateInfo } from "./Ducks/NetworkInfoReducer";
import { updateSettings } from "./Ducks/SettingsReducer";
import { addListeners } from "./Ducks/PushNotificationReducer";

import { switchLanguage } from "./I18n/I18n";
import deviceinfo from "react-native-device-info";
import { InterfaceSupportedLanguages } from "./Config/Languages";
import Crashes from "appcenter-crashes";
import codePush from "react-native-code-push";
import branch, { BranchEvent } from 'react-native-branch';
import analytics from "@segment/analytics-react-native";

import I18n from "./I18n/I18n";
import { init, setAuthToken, recordAppStateEvent, persistEvents, recordNetworkEvent } from "./Util/Forensics";
import AppErrorBoundary from "./AppErrorBoundary/AppErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loadingStore: true,
      store: null,
      appState: AppState.currentState
    };

    // Font doesn't scale
    Text.allowFontScaling = false;

    codePush.sync({
      deploymentKey: Platform.OS === "ios" ? codePushiOSKey : codePushAndroidKey
    });
    if(__DEV__) {
      import('./Config/ReactotronConfig').then(() => console.log('Reactotron Configured'));
    }
  }

  disableAppCenterCrashes = async () => {
    await Crashes.setEnabled(false);
  };

  componentWillMount() {
    this.disableAppCenterCrashes();
    init();
    createStore()
      .then(store => {
        const {
          settings: {
            segmentSettings,
            userLocaleSet,
            interfaceLocale: storeInterfaceLocale
          }
        } = store.getState();

        // ================================
        if (!userLocaleSet) {
          const deviceLocale = deviceinfo.getDeviceLocale();
          const shortDeviceLocale = deviceLocale.substring(0, 2);
          let interfaceLocaleCode = '';

          if (shortDeviceLocale === 'zh') {
            interfaceLocaleCode = deviceLocale.substring(0, 7).toLowerCase();
          } else {
            interfaceLocaleCode = shortDeviceLocale || "en";
          }

          const interfaceLocale = InterfaceSupportedLanguages.find(
            language => language[1] === interfaceLocaleCode
          );

          if (interfaceLocale) {
            store.dispatch(updateSettings({ interfaceLocale }));

            switchLanguage(interfaceLocaleCode, this);
          }
        } else {
          switchLanguage(storeInterfaceLocale[1], this);
        }
        // ================================
        if (!segmentSettings) {
          analytics
            .setup(analyticsKey, {trackAppLifecycleEvents: true})
            .then(() =>
              store.dispatch(updateSettings({ segmentSettings: true }))
            )
            .catch(error => console.log(error));
        }
        return store;
      })
      .then(store => {
        const { auth } = store.getState();
        setAuthToken(auth.token);

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
        NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);

        // We Get The Initial Network Information
        return NetInfo.getConnectionInfo();
      })
      .then(connectionInfo => {
        const { store } = this.state;

        NetInfo.getConnectionInfo().then(connectionInfo => {
          store.dispatch(delayUpdateInfo(connectionInfo));
        });

        // Even Listener to Detect Network Change
        NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
      });
    // PushNotificationIOS.addEventListener('register', (token) => console.log('TOKEN', token))
    // PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification, "APP state", AppStateIOS.currentState))
    // you could check the app state to respond differently to push notifications depending on if the app is running in the background or is currently active.
  }

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
<<<<<<< HEAD
    NetInfo.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
=======
    AppState.removeEventListener('change', this._handleAppStateChange);
    persistEvents();
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
>>>>>>> recording app state events
  }

  handleFirstConnectivityChange = connectionInfo => {
    recordNetworkEvent(connectionInfo);
    const { store } = this.state;

    if (store) {
      store.dispatch(delayUpdateInfo(connectionInfo));
    }
  };

<<<<<<< HEAD
  componentDidMount() {}

  // dumpAsyncStorage().then(data => console.log(data));
=======
  _handleAppStateChange = (nextState) => {
    recordAppStateEvent(this.state.appState, nextState);
    this.setState({appState: nextState});

    // if app is being killed or shutdown for whatever
    // reason, try to persist
    if (nextState == 'inactive') {
      persistEvents();
    }
  };
>>>>>>> recording app state events

  render() {
    if (this.state.loadingStore) {
      // TODO: return static loading screen, like the splash screen
      // right now we have a flash of blank white screen
      return null;
    }

    return (
      <AppErrorBoundary>
        <Provider store={this.state.store}>
          <ReduxNavigation />
        </Provider>
      </AppErrorBoundary>
    );
  }
}

export default codePush(App);
