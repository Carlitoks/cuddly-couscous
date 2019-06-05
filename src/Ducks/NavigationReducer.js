import { NavigationActions, StateUtils } from "react-navigation";
import AppNavigation from "../Navigation/AppNavigation";
import Instabug from "instabug-reactnative";
import analytics from "@segment/analytics-react-native";
import { loadState } from "../Config/LocalStorage";
import { recordNavigationEvent } from "../Util/Forensics";

const initialState = AppNavigation.router.getStateForAction(
  AppNavigation.router.getActionForPathAndParams("")
);

export default (reducer = (state, action) => {
  let newState;

  if (state) {
    const [currentRoute] = state.routes[0].routes[0].routes.slice(-1);
    if (action.type === currentRoute.routeName) {
      return state;
    }
  }

  switch (action.type) {
    case "back":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(NavigationActions.back(), state);
      break;

    case "Navigation/NAVIGATE":
      Instabug.setAttachmentTypesEnabled(true, true, true, true, true);
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      );
      break;

    case "Home":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
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

    case "RateView":
      analytics.screen(action.type.toString());
      analytics.track("Order Completed");
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "RateView" })]
        })
      );
      break;

    case "SelectRoleView/Reset":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "SelectRoleView" })]
        })
      );
      break;

    case "NameCustomerView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "NameCustomerView" })]
        })
      );
      break;

    case "LoginView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: "IntroView" }),
            NavigationActions.navigate({ routeName: "LoginView" })
          ]
        })
      );
      break;

    case "RegisterView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: "IntroView" }),
            NavigationActions.navigate({ routeName: "RegisterView" })
          ]
        })
      );
      break;

    case "SessionView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      // NOTE: setting the stack to 2 actions here (Home -> SessionView) caused instability for both
      // the Linguist and Customer side... so don't do that.
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "SessionView" })
          ]
        })
      );
      break;

    case "LinguistIncomingCallView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: "Home" }),
            NavigationActions.navigate({ routeName: "LinguistIncomingCallView" })
          ]
        })
      );
      break;

    case "CustomerMatchingView":
      analytics.screen(action.type.toString());
      analytics.track("Checkout Started");
      recordNavigationEvent(action.type.toString());

      // the user could arrive at this screen from another session ("try another Jeenie" option) - so if that happens, we
      // want to ensure that the previous session views are no longer present in the stack, which prevents them
      // from being properly cleaned up
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "CustomerMatchingView" })
          ]
        })
      );
      break;

      default:
      if (!action.payload && (action.type.indexOf("View") != -1 || action.type.indexOf("Screen") != -1)) {
        recordNavigationEvent(action.type.toString());
        analytics.screen(action.type.toString());
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
