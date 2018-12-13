import { NavigationActions } from "react-navigation";
import AppNavigation from "../Navigation/AppNavigation";
import Instabug from "instabug-reactnative";
import RNAmplitude from "react-native-amplitude-analytics";
import { amplitudKey } from "../Config/env";
import { loadState } from "../Config/LocalStorage";

const initialState = AppNavigation.router.getStateForAction(
  AppNavigation.router.getActionForPathAndParams("SelectRoleView")
);

const amplitude = new RNAmplitude(amplitudKey);

loadState().then(response => {
  amplitude.setUserId(response.auth.uuid === "" ? null : response.auth.uuid);
});

export default (reducer = (state, action) => {
  let newState;

  if (state) {
    //if(action.type !== 'contactLinguist/incrementCounter')
    const [currentRoute] = state.routes[0].routes[0].routes.slice(-1);
    //amplitude.logEvent("Navigation", { view: currentRoute.routeName });
    if (action.type === currentRoute.routeName) {
      return state;
    }
  }

  switch (action.type) {
    case "back":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;

    case "Navigation/NAVIGATE":
      Instabug.setAttachmentTypesEnabled(true, true, true, true, true);
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      );
      break;

    case "Home":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Home",
              params: action.params
            })
          ]
        })
      );
      break;

    case "CustomerView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "CustomerView" })]
        })
      );
      break;

    case "LinguistView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "LinguistView" })]
        })
      );
      break;

    case "IncomingCallView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "IncomingCallView" })
          ]
        })
      );
      break;

    case "CheckYourEmailView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "CheckYourEmailView" })
          ]
        })
      );
      break;

    case "RateView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "RateView" })]
        })
      );
      break;

    case "SelectRoleView/Reset":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "SelectRoleView" })]
        })
      );
      break;

    case "NameCustomerView":
      amplitude.logEvent("Navigation", { "View Name": action.type.toString() });
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "NameCustomerView" })
          ]
        })
      );
      break;

    default:
      if (!action.payload && action.type.indexOf("View") != -1) {
        amplitude.logEvent("Navigation", {
          "View Name": action.type.toString()
        });
      }

      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.type,
          params: action.params
        }),
        state
      );
  }

  return newState || state;
});
