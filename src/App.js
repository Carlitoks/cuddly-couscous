import React, { Component } from "react";
import { Provider } from "react-redux";
import { Alert, Linking, NetInfo, Text, AppState, Platform } from "react-native";
import createStore from "./Config/CreateStore";
import ReduxNavigation from "./Navigation/ReduxNavigation";
import { codePushAndroidKey, codePushiOSKey, analyticsKey, promptUpdate } from "./Config/env";

import { delayUpdateInfo } from "./Ducks/NetworkInfoReducer";
import { updateSettings } from "./Ducks/SettingsReducer";
import { addListeners } from "./Ducks/PushNotificationReducer";

import { switchLanguage } from "./I18n/I18n";
import deviceinfo from "react-native-device-info";
import { InterfaceSupportedLanguages } from "./Config/Languages";
import Crashes from "appcenter-crashes";
import codePush from "react-native-code-push";
import branch, { BranchEvent } from "react-native-branch";
import analytics from "@segment/analytics-react-native";

import I18n from "./I18n/I18n";
import { init, setAuthToken, recordAppStateEvent, persistEvents, recordNetworkEvent } from "./Util/Forensics";
import AppErrorBoundary from "./AppErrorBoundary/AppErrorBoundary";
import SplashScreenLogo from "./Containers/Onboarding/Components/SplashScreen";
import { updateJeenieCounts, loadConfig, loadSessionScenarios } from "./Ducks/AppConfigReducer";
import {setAuthToken as setApiAuthToken} from "./Config/AxiosConfig";
import SplashScreen from 'react-native-splash-screen';
import { InitInstabug } from "./Settings/InstabugInit";
import { initializeUser, refreshDevice } from "./Ducks/AccountReducer";
import { init as initAuth, authorizeNewDevice } from "./Ducks/AuthReducer2";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loadingStore: true,
      store: null,
      appState: AppState.currentState,
      splashScreenTimer: false
    };

    // Font doesn't scale
    Text.allowFontScaling = false;

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

  componentWillMount() {
    this.disableAppCenterCrashes();
    init();
    createStore()
      // initialize app state: ui language and analytics
      .then(store => {
        const {
          settings: { segmentSettings, userLocaleSet, interfaceLocale: storeInterfaceLocale }
        } = store.getState();
        this.setState({store});

        // ================================
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
        // ================================
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
        this.setState({isLoggedIn: !!auth.userJwtToken});
        const auth = getState().auth2;

        // attempt to register new device if we don't have one yet
        if (!auth.deviceJwtToken) {
          return new Promise((resolve, reject) => {
            store.dispatch(authorizeNewDevice()).finally(resolve(true));
          });
        }

        return Promise.resolve(true);
      })
      // initialize app/user data & push notifications
      .then(() => {
        const {store} = this.state;
        const {auth} = store.getState().auth2;
        let promises = [
          store.dispatch(addListeners()), // register handler for push notifications
        ];

        // if we have a device, update some items
        if (!!auth.deviceJwtToken) {
          promises.push(store.dispatch(updateJeenieCounts(true))) // reinitialize jeenie counts if app reloads
          promises.push(store.dispatch(refreshDevice())); // refresh device, which will also set PN token
          promises.push(store.dispatch(loadConfig())); // load basic app config
        }

        // TODO: register FCM refresh handler if we have a device

        // if user is logged in, load/refresh other items
        if (!!auth.userJwtToken) {
          promises.push(store.dispatch(initializeUser(auth.userID))); // reload main user data, not cached
          promises.push(store.dispatch(loadSessionScenarios(true))); // reload scenarios, but cache is fine
        }

        return Promise.all(promises);
      })
      .then(() => {
        this.setState({
          loadingStore: false,
        });
        // Even Listener to Detect Network Change
        NetInfo.addEventListener("connectionChange", this.handleFirstConnectivityChange);

        // We Get The Initial Network Information
        return NetInfo.getConnectionInfo();
      })
      .then(connectionInfo => {
        const { store } = this.state;

        NetInfo.getConnectionInfo().then(connectionInfo => {
          store.dispatch(delayUpdateInfo(connectionInfo));
        });

        // Even Listener to Detect Network Change
        NetInfo.addEventListener("connectionChange", this.handleFirstConnectivityChange);

        this.updateAvailableAlert();
      }).then(() => {
        //Initializing instabug
      const { store } = this.state;
      const currentStore = store.getState();
      InitInstabug(
        currentStore.userProfile.firstName,
        currentStore.userProfile.lastName,
        currentStore.userProfile.preferredName,
        currentStore.userProfile.linguistProfile,
        currentStore.userProfile.email,
        currentStore.auth.deviceId,
        currentStore.currentSessionReducer.sessionID,
        currentStore.events.id);
    });
    // PushNotificationIOS.addEventListener('register', (token) => console.log('TOKEN', token))
    // PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification, "APP state", AppStateIOS.currentState))
    // you could check the app state to respond differently to push notifications depending on if the app is running in the background or is currently active.
  }

  async componentDidMount() {
    SplashScreen.hide();
    AppState.addEventListener("change", this._handleAppStateChange);
    setTimeout(() => {
      this.setState({ splashScreenTimer: true });
    }, 2000);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener("connectionChange", this.handleFirstConnectivityChange);
    AppState.removeEventListener("change", this._handleAppStateChange);
    persistEvents();
  }

  handleFirstConnectivityChange = connectionInfo => {
    recordNetworkEvent(connectionInfo);
    const { store } = this.state;

    if (store) {
      store.dispatch(delayUpdateInfo(connectionInfo));
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

  updateAvailableAlert() {
    if (!promptUpdate) {
      return;
    }
    const url = Platform.OS == "ios" ? "itms-apps://itunes.apple.com/app/apple-store/id1341871432?mt=8" : "market://details?id=com.newsolo";
    Alert.alert(
      I18n.t("appUpdateAlert.title"),
      I18n.t("appUpdateAlert.description"),
      [
        {
          text: I18n.t("actions.ok"),
          onPress: () => {
            try {
              Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                  console.log("Can't handle url: " + url);
                } else {
                  return Linking.openURL(url);
                }
              }).catch(err => console.error('An error occurred', err));
            } catch (e) {
              console.log('error from linking', e);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }

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
