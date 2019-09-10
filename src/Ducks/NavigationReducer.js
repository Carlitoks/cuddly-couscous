import { NavigationActions, StateUtils } from "react-navigation";
import AppNavigation from "../Navigation/AppNavigation";
import Instabug from "instabug-reactnative";
import {EVENTS, recordAnalyticsEvent, recordNavigationEvent} from "../Util/Analytics";

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
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(NavigationActions.back(), state);
      break;

    case "Navigation/NAVIGATE":
      Instabug.setEnabledAttachmentTypes(true, true, true, true, true);
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName, params: action.params }),
        state
      );
      break;

    // This is here to reset the stack because you can log out from SettingsView.
    // When that happens the app state is cleared, so if the Home screen is loaded
    // in the background it will re-render with null references to the user
    case "SettingsView":
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "SettingsView",
              params: action.params
            })
          ]
        })
      );
      break;

    case "Home":
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
      recordNavigationEvent(action.type.toString());
      recordAnalyticsEvent(EVENTS.SESSION_END);
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "RateView", params: action.params })]
        })
      );
      break;

    case "SelectRoleView/Reset":
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "SelectRoleView" })]
        })
      );
      break;

    case "NameCustomerView":
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "NameCustomerView" })]
        })
      );
      break;

    case "LoginView":
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
      recordNavigationEvent(action.type.toString());
      recordAnalyticsEvent(EVENTS.REGISTRATION_BEGAN);
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
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "LinguistIncomingCallView" })
          ]
        })
      );
      break;

    case "CustomerMatchingView":
      recordNavigationEvent(action.type.toString());
      recordAnalyticsEvent(EVENTS.SESSION_ATTEMPTED);

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
