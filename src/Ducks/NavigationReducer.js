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
    //if(action.type !== 'contactLinguist/incrementCounter')
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

    case "CustomerView":
      analytics.screen(action.type.toString());
      analytics.track("Checkout Started");
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "CustomerView" })]
        })
      );
      break;

    case "LinguistView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "LinguistView" })]
        })
      );
      break;

    case "IncomingCallView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "IncomingCallView" })]
        })
      );
      break;

    case "CheckYourEmailView":
      analytics.screen(action.type.toString());
      recordNavigationEvent(action.type.toString());
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "CheckYourEmailView" })]
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

    default:
      if (
        !action.payload &&
        (action.type.indexOf("View") != -1 || action.type.indexOf("Screen") != -1)
      ) {
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
