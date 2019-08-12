import { Alert } from "react-native";
import I18n, { translateApiError, translateApiErrorString } from "../I18n/I18n";
import { createNewSession } from "../Ducks/CurrentSessionReducer";
import { ensureSessionDefaults, setEvent } from "../Ducks/NewSessionReducer";
import NavigationService from '../Util/NavigationService';
import Permissions from "react-native-permissions";
import { loadUser } from "../Ducks/AccountReducer";

const navigate = (navigation, type, screenName, params) => {
  if(type === "SERVICE"){
    return navigation.dispatch(screenName);
  }
  return navigation.dispatch({type: screenName, params});
};

const createCall = async (store, evt, navigation, type) => {
  await store.dispatch(ensureSessionDefaults());
  // should the call automatically be started?
  // otherwise, it's an event for a session
  const sessionObj = await store.dispatch(setEvent(evt)); // from NewSessionReducer
  if (evt.initiateCall) {
    await store.dispatch(createNewSession(sessionObj.session)); // from CurrentSessionReducer
    return navigate(navigation, type, "CustomerMatchingView", null);
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
    return navigate(navigation, type, "Home", null);
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
    return navigate(navigation, type, "Home", null);
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
      return navigate(navigation, type, "Home", null);
    }
  }catch (e) {
    Alert.alert(I18n.t("error"), translateApiError(e));
    return navigate(navigation, type, "Home", null);
  }
};
