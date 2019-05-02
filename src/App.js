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
import SplashScreen from "./Containers/Onboarding/Components/SplashScreen";
import LoadingScreen from "./Containers/Onboarding/Components/LoadingScreen";
import { loadConfig, loadSessionScenarios } from "./Ducks/AppConfigReducer";
import {setAuthToken as setApiAuthToken} from "./Config/AxiosConfig";

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
      .then(store => {
        const {
          settings: { segmentSettings, userLocaleSet, interfaceLocale: storeInterfaceLocale }
        } = store.getState();

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
      .then(store => {
        const { auth } = store.getState();
        setAuthToken(auth.token);
        setApiAuthToken(auth.token);
        this.setState({
          isLoggedIn: auth.isLoggedIn,
          loadingStore: false,
          store
        });

        if (auth.isLoggedIn) {
          store.dispatch(addListeners());

          // things that should be reloaded periodically
          // store.dispatch(loadConfig(true)).catch(console.log),
        }
      })
      .then(() => {
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
      });
    // PushNotificationIOS.addEventListener('register', (token) => console.log('TOKEN', token))
    // PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification, "APP state", AppStateIOS.currentState))
    // you could check the app state to respond differently to push notifications depending on if the app is running in the background or is currently active.
  }

  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
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
    setTimeout(() => {
      this.setState({ splashScreenTimer: true });
    }, 2000);
    if (!this.state.splashScreenTimer) {
      return <SplashScreen />;
    } else {
      if (this.state.loadingStore) {
        // TODO: return static loading screen, like the splash screen
        // right now we have a flash of blank white screen
        return <LoadingScreen />;
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
}

export default codePush(App);
