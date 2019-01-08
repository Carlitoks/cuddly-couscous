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
import { setAuthToken } from "./Config/AxiosConfig";
import { init, recordAppStateEvent, persist } from "./Util/Forensics";

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

    branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }
      console.log("Branch params: " + JSON.stringify(params))

      // params will never be null if error is null
    })
    
    // let lastParams = await branch.getLatestReferringParams() // params from last open
    // let installParams = await branch.getFirstReferringParams() // params from original install
    // console.log("Last", lastParams);
    // console.log("Install", installParams);

  }

  componentWillUnmount() {
<<<<<<< HEAD
    NetInfo.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
=======
    AppState.removeEventListener('change', this._handleAppStateChange);
    persist();
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
>>>>>>> recording app state events
  }

  handleFirstConnectivityChange = connectionInfo => {
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
  };
>>>>>>> recording app state events

  render() {
    if (this.state.loadingStore) {
      // TODO: return static loading screen, like the splash screen
      // right now we have a flash of blank white screen
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <ReduxNavigation />
      </Provider>
    );
  }
}

export default codePush(App);
