import React, { Component } from "react";
import { Provider } from "react-redux";
import { Alert, Linking, NetInfo, Text, AppState, Platform } from "react-native";
import FCM, { FCMEvent } from "react-native-fcm";
import Crashes from "appcenter-crashes";
import codePush from "react-native-code-push";
import analytics from "@segment/analytics-react-native";
import deviceinfo from "react-native-device-info";
import SplashScreen from 'react-native-splash-screen';

import { codePushAndroidKey, codePushiOSKey, analyticsKey, promptUpdate } from "./Config/env";
import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";

import { updateSettings } from "./Ducks/SettingsReducer";
import { addListeners } from "./Ducks/PushNotificationReducer";

import { InterfaceSupportedLanguages } from "./Config/Languages";

import I18n, { switchLanguage } from "./I18n/I18n";
import { init as initForensics, recordAppStateEvent, persistEvents, recordNetworkEvent } from "./Util/Forensics";
import AppErrorBoundary from "./AppErrorBoundary/AppErrorBoundary";
import SplashScreenLogo from "./Containers/Onboarding/Components/SplashScreen";
import { updateJeenieCounts, loadConfig, loadSessionScenarios } from "./Ducks/AppConfigReducer";
import { InitInstabug } from "./Settings/InstabugInit";
import { clear as clearAccount, initializeUser, refreshDevice } from "./Ducks/AccountReducer";
import { init as initAuth, clear as clearAuth, authorizeNewDevice } from "./Ducks/AuthReducer2";
import PushNotification from "./Util/PushNotification";
import { setInitialScreen } from "./Navigation/AppNavigation";
import { detectNetworkStatus } from "./Ducks/AppStateReducer";
import { displayNoNetworkConnectionAlert, displayUpdateAvailableAlert } from "./Util/Alerts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStore: true,
      store: null,
      appState: AppState.currentState,
      splashScreenTimer: false
    };

    // Font doesn't scale
    Text.allowFontScaling = false;

    this.updateFcmTokenListener = null;

    codePush.sync({
      deploymentKey: Platform.OS === "ios" ? codePushiOSKey : codePushAndroidKey
    });
    if (__DEV__) {
      import("./Config/ReactotronConfig").then(() => console.log("Reactotron Configured"));
    }
  }

  disableAppCenterCrashes = async () => {
    await Crashes.setEnabled(false);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splashScreenTimer: true });
    }, 2000);
    this.disableAppCenterCrashes();
    SplashScreen.hide();
    initForensics();
    AppState.addEventListener("change", this._handleAppStateChange);

    // load store and initialize all the things
    createStore()
      // initialize app state: ui language and analytics
      .then(store => {
        this.setState({store});

        const {
          settings: { segmentSettings, userLocaleSet, interfaceLocale: storeInterfaceLocale }
        } = store.getState();

        // set app UI language
        if (!userLocaleSet) {
          const deviceLocale = deviceinfo.getDeviceLocale();
          const shortDeviceLocale = deviceLocale.substring(0, 2);
          let interfaceLocaleCode = "";

          if (shortDeviceLocale === "zh") {
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

        // set connection data in app state, and track any connection status changes
        store.dispatch(detectNetworkStatus());
        NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);

        // initialize analytics
        if (!segmentSettings) {
          analytics
            .setup(analyticsKey, { trackAppLifecycleEvents: true })
            .then(() => store.dispatch(updateSettings({ segmentSettings: true })))
            .catch(error => console.log(error));
        }

        return store;
      })
      // initialize device
      .then(store => {

        store.dispatch(initAuth()); // restores any auth tokens and sets them in api/forensic services
        const auth = store.getState().auth2 || {};
    
        // attempt to register new device if we don't have one yet
        if (!auth.deviceJwtToken) {
          return store.dispatch(authorizeNewDevice());
        } else {
          // otherwise refresh the existing device
          return store.dispatch(refreshDevice(true))
          .catch((e) => {
            // if device wasn't found, we have old data and should reset
            if (!!e.response && 404 == e.response.status) {
              store.dispatch(clearAuth());
              store.dispatch(clearAccount());
              return store.dispatch(authorizeNewDevice());
            }
          });
        }
      })
      // initialize app/user data & push notifications
      .then(() => {
        const {store} = this.state;
        const auth = store.getState().auth2 || {};

        let promises = [];

        // if we have a device, update some items
        if (!!auth.deviceJwtToken) {
          promises.push(store.dispatch(updateJeenieCounts(true))); // reinitialize jeenie counts if app reloads
          promises.push(store.dispatch(loadConfig())); // load basic app config
        }

        // if user is logged in, load/refresh other items, and change the initial
        // app screen to be the users home
        if (!!auth.userJwtToken) {
          setInitialScreen("Home");
          promises.push(store.dispatch(initializeUser(auth.userID))); // reload main user data, not cached
          promises.push(store.dispatch(loadSessionScenarios(true))); // reload scenarios, but cache is fine
        }

        return Promise.all(promises);
      }).then(() => {
        //Initializing instabug
        const { store } = this.state;
        const currentStore = store.getState();
        const user = !!currentStore.account && !!currentStore.account.user ? currentStore.account.user : {};
        InitInstabug(
          user.firstName,
          user.lastName,
          user.preferredName,
          user.linguistProfile,
          user.email,
          currentStore.auth2.deviceID,
          currentStore.currentSessionReducer.sessionID,
        );
      })
      .catch((e) => {
        // in the case of an error, we'll say we're done loading anyway
        console.log("error during boot");
        console.log(e);
      })
      // even if there were failures, we still want to register
      // some services
      .finally(() => {
        this.setState({loadingStore: false});
        
        // should user update?
        if (promptUpdate) {
          displayUpdateAvailableAlert();
        }

        const {store} = this.state;
        if (!store) {
          return;
        }

        // if there's no internet connection, then the user can't do much...
        if (!store.getState().appState.hasNetworkConnection) {
          displayNoNetworkConnectionAlert();
        }

        // check device, do we start FCM or Pushy background services? Right now only
        // FCM is supported, so just registering all of those services here
        store.dispatch(addListeners());  // register handlers for notifications
        PushNotification.getNotificationsBackground(); // start background services
        // FCM tokens must be periodically updated
        this.updateFcmTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
          const device = store.getState().account.currentDevice;
          if (!!device) {
            dispatch(updateDevice({notificationToken: token})).catch(console.log);
          }
        });
      });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener("connectionChange", this.handleConnectivityChange);
    AppState.removeEventListener("change", this._handleAppStateChange);
    PushNotification.cleanListeners();
    persistEvents();
    if (!!this.updateFcmTokenListener) {
      this.updateFcmTokenListener.remove();
    }
  }

  handleConnectivityChange = (connectionInfo) => {
    recordNetworkEvent(connectionInfo);
    const { store } = this.state;
    if (store) {
      store.dispatch(detectNetworkStatus());
    }
  };

  _handleAppStateChange = nextState => {
    recordAppStateEvent(this.state.appState, nextState);
    this.setState({ appState: nextState });

    // if app is being killed or shutdown for whatever
    // reason, try to persist
    if (nextState == "inactive") {
      persistEvents();
    }
  };

  render() {
    if (this.state.loadingStore || !this.state.splashScreenTimer) {
      return <SplashScreenLogo />
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
