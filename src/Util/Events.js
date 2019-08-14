import { Alert } from "react-native";
import I18n, { translateApiError, translateApiErrorString } from "../I18n/I18n";
import { createNewSession } from "../Ducks/CurrentSessionReducer";
import { ensureSessionDefaults, setEvent, update as updateNewSessionReducer, sessionSelector } from "../Ducks/NewSessionReducer";
import NavigationService from '../Util/NavigationService';
import Permissions from "react-native-permissions";
import { loadUser } from "../Ducks/AccountReducer";
import { update as updateAppState } from "../Ducks/AppStateReducer";
import { Events } from "../Api";

const navigate = (navigation, type, screenName, params) => {
  if(type === "SERVICE"){
    return navigation.dispatch(screenName);
  }
  return navigation.dispatch({type: screenName, params});
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
        session.note = evt.note;
      }
      if (!!evt.eventID) {
        session.eventID = evt.eventID;
      }
      await store.dispatch(updateNewSessionReducer({ session }));
      const currentSessionState = await store.dispatch(sessionSelector());
      if(evt.start != "false") {
        await store.dispatch(createNewSession(currentSessionState));
        return navigate(navigation, type, "CustomerMatchingView", null);
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
    Alert.alert(
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
    await store.dispatch(loadUser(false));
  }

  try {
    const cameraPermission = await Permissions.request('camera');
    const micPermission = await Permissions.request('microphone');
    if (cameraPermission === "authorized" && micPermission === "authorized") {
      return createCall(store, evt, navigation, type);
    } else {
      Alert.alert(I18n.t("appPermissions"), I18n.t("acceptAllPermissionsCustomer"), [
        { text: I18n.t("ok") },
      ]);
    }
  }catch (e) {
    Alert.alert(I18n.t("error"), translateApiError(e));
  }
};

export const handleDeepLinkEvent = (user, params, dispatch, type) => {
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
      handleDeepLinkCall(user, params, dispatch, type);
      break;

    case "open":
      if (params.eventID) {
        handleDeepLinkOpen(user, params.eventID, dispatch, type);
      }
      break;

    default:
      if (params.eventID) {
        handleDeepLinkOpen(user, params.eventID, dispatch, type);
      }
      break;
  }
};

export const handleDeepLinkCall = async (user, params, dispatch, type) => {
  if (user.isLoggedIn && user.userJwtToken) {
    await handleCallEvent(params, { dispatch });
    if (type === "INSTALL") {
      await dispatch(updateAppState({ installUrlParamsHandled: true }));
    } else {
      await dispatch(updateAppState({ openUrlParamsHandled: true }));
    }
  }
};

export const handleDeepLinkOpen = (user, eventID, dispatch, type) => {
  if (user.isLoggedIn && user.userJwtToken) {
    Events.getScan(`${eventID.trim()}`, user.userJwtToken).then(async (evt) => {
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
