import { Alert } from "react-native";
import I18n, { translateApiError, translateApiErrorString } from "../I18n/I18n";
import { createNewSession } from "../Ducks/CurrentSessionReducer";
import { ensureSessionDefaults, setEvent, sessionSelector, update as updateSessionReducer, cleanReducerAndUpdateSession } from "../Ducks/NewSessionReducer";
import NavigationService from '../Util/NavigationService';
import Permissions from "react-native-permissions";
import { loadUser } from "../Ducks/AccountReducer";
import { update as updateAppState } from "../Ducks/AppStateReducer";
import { Events } from "../Api";
import { userSelector } from "../Ducks/AuthReducer2";

const navigate = (navigation, type, screenName, params) => {
  if(type === "SERVICE"){
    return navigation.dispatch(screenName, params);
  }
  return navigation.dispatch({type: "Navigation/NAVIGATE", ...params});
};

export const createCall = async (store, evt, navigation, type) => {
  await store.dispatch(ensureSessionDefaults());
  // should the call automatically be started?
  // otherwise, it's an event for a session
  const sessionObj = await store.dispatch(setEvent(evt)); // from NewSessionReducer
  if (evt.initiateCall) {
    await store.dispatch(createNewSession(sessionObj.session)); // from CurrentSessionReducer
    return navigate(navigation, type, "CustomerMatchingView", null);
  }
};

export const handleCallEvent = async (evt, store) => {
  let navigation = store.navigation;
  let type = "STORE";
  if(!navigation){
    navigation = NavigationService;
    type = "SERVICE";
  }

  try {
    const cameraPermission = await Permissions.request('camera');
    const micPermission = await Permissions.request('microphone');
    if (cameraPermission === "authorized" && micPermission === "authorized") {
      await store.dispatch(ensureSessionDefaults());
      let session = await store.dispatch(sessionSelector());

      if (!!evt.primaryLangCode) {
        session.primaryLangCode = evt.primaryLangCode;
      }
      if (!!evt.secondaryLangCode) {
        session.secondaryLangCode = evt.secondaryLangCode;
      }
      if (!!evt.avModePreference) {
        session.avModePreference = evt.avModePreference;
      }
      if (!!evt.scenarioID) {
        session.scenarioID = evt.scenarioID;
      }
      if (!!evt.note) {
        session.customScenario = evt.note;
      }
      if (!!evt.eventID) {
        session.eventID = evt.eventID;
      }

      store.dispatch(updateSessionReducer({ session }));

      const currentSessionState = await store.dispatch(sessionSelector());

      store.dispatch(cleanReducerAndUpdateSession(currentSessionState));

      if(evt.start != "false") {
        try {
          await store.dispatch(createNewSession(currentSessionState));
          return navigate(navigation, type, "CustomerMatchingView", null);
        } catch (e) {
          if(e.response.status === 500){
            return Alert.alert(I18n.t("error"), I18n.t("session.createSessionFailed"));
          } else {
            return Alert.alert(I18n.t("error"), translateApiError(e));
          }
        }
      }
    } else {
      Alert.alert(I18n.t("appPermissions"), I18n.t("acceptAllPermissionsCustomer"), [
        { text: I18n.t("ok") },
      ]);
    }
  }catch (e) {
    Alert.alert(I18n.t("error"), translateApiError(e));
  }
};

export const handleEvent = async (evt, store) => {
  let navigation = store.navigation;
  let type = "STORE";
  if(!navigation){
    navigation = NavigationService;
    type = "SERVICE";
  }
  // any usage error?
  if (!!evt.usageError) {
    // alert usage error, nav to home
    return Alert.alert(
      I18n.t("invalidCode"),
      translateApiErrorString(evt.usageError, "api.errEventUnavailable"),
      [{
        text: I18n.t("actions.ok")
      }]
    );
  }

  // minutes added to user?
  if (evt.addMinutesToUser && evt.maxMinutesPerUser > 0) {
    // alert about minutes added, nave to home
    Alert.alert(
      I18n.t("minutesAdded"),
      I18n.t("complimentMinutes", {
        maxMinutesPerUser: evt.maxMinutesPerUser,
        organizer: evt.organization.name,
      }),
      [{
        text: I18n.t("actions.ok")
      }]
    );
    return await store.dispatch(loadUser(false));
  }

  try {
    const cameraPermission = await Permissions.request('camera');
    const micPermission = await Permissions.request('microphone');
    if (cameraPermission === "authorized" && micPermission === "authorized") {
      return createCall(store, evt, navigation, type);
    } else {
      return Alert.alert(I18n.t("appPermissions"), I18n.t("acceptAllPermissionsCustomer"), [
        { text: I18n.t("ok") },
      ]);
    }
  }catch (e) {
    return Alert.alert(I18n.t("error"), translateApiError(e));
  }
};

export const handleDeepLinkEvent = (params, dispatch, type) => {
  let urlType = null;
  if (params.$deeplink_path) {
    urlType = params.$deeplink_path.split("/")[1];
  } else if (params["+non_branch_link"]) {
    urlType = params["+non_branch_link"].split("//")[1].split("?")[0];
  } else {
    urlType = "open";
  }

  switch (urlType) {
    case "call":
      handleDeepLinkCall(params, dispatch, type);
      break;

    case "open":
      if (params.eventID) {
        handleDeepLinkOpen(params.eventID, dispatch, type);
      }
      break;

    case "scan-qr": {
      handleNavLink("ScanScreenView", dispatch, type);
      break;
    }

    case "event-code": {
      handleNavLink("PromoCodeView", dispatch, type);
      break;
    }

    case "packages": {
      handleNavLink("AvailablePackagesView", dispatch, type, params);
      break;
    }

    case "account/history": {
      handleNavLink("CallHistory", dispatch, type);
      break;
    }

    case "account/home": {
      handleNavLink("Home", dispatch, type);
      break;
    }

    case "account/details": {
      handleNavLink("AccountDetailsView", dispatch, type);
      break;
    }

    case "account/settings": {
      handleNavLink("SettingsView", dispatch, type);
      break;
    }

    case "account/profile": {
      handleNavLink("UserProfileView", dispatch, type);
      break;
    }

    default:
      if (params.eventID) {
        handleDeepLinkOpen(params.eventID, dispatch, type);
      }
      break;
  }
};

export const handleNavLink = async (screen, dispatch, type, params) => {
  const currentUser = await dispatch(userSelector());
  let navigation = dispatch.navigation;
  let navType = "STORE";
  if(!navigation){
    navigation = NavigationService;
    navType = "SERVICE";
  };
  if (currentUser.isLoggedIn && currentUser.userJwtToken) {
    await navigate(navigation, navType, screen, params);
    if (type === "INSTALL") {
      await dispatch(updateAppState({ installUrlParamsHandled: true }));
    } else {
      await dispatch(updateAppState({ openUrlParamsHandled: true }));
    }
  }
};

export const handleDeepLinkCall = async (params, dispatch, type) => {
  const currentUser = await dispatch(userSelector());
  if (currentUser.isLoggedIn && currentUser.userJwtToken) {
    await handleCallEvent(params, { dispatch });
    if (type === "INSTALL") {
      await dispatch(updateAppState({ installUrlParamsHandled: true }));
    } else {
      await dispatch(updateAppState({ openUrlParamsHandled: true }));
    }
  }
};

export const handleDeepLinkOpen = async (eventID, dispatch, type) => {
  const currentUser = await dispatch(userSelector());
  if (currentUser.isLoggedIn && currentUser.userJwtToken) {
    Events.getScan(`${eventID.trim()}`, currentUser.userJwtToken).then(async (evt) => {
      await handleEvent(evt.data, { dispatch });
    }).catch((e) => {
      if (e.response.status === 404) {
        Alert.alert(I18n.t("error"), I18n.t("api.errEventUnavailable"));
      } else {
        Alert.alert(I18n.t("error"), translateApiError(e));
      }
    }).finally(async () => {
      if (type === "INSTALL") {
        await dispatch(updateAppState({ installUrlParamsHandled: true }));
      } else {
        await dispatch(updateAppState({ openUrlParamsHandled: true }));
      }
    });
  }
};
