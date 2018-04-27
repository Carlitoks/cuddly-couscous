import { NavigationActions } from "react-navigation";

import AppNavigation from "../Navigation/AppNavigation";
import Instabug from "instabug-reactnative";
const initialState = AppNavigation.router.getStateForAction(
  AppNavigation.router.getActionForPathAndParams("SelectRoleView")
);

// console.log(AppNavigation.router.getActionForPathAndParams("LoginView"));

export default (reducer = (state, action) => {
  let newState;

  if (state) {
    const [currentRoute] = state.routes[0].routes[0].routes.slice(-1);

    if (action.type === currentRoute.routeName) return state;
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
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "CustomerView" })]
        })
      );
      break;

    case "LinguistView":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "LinguistView" })]
        })
      );
      break;

    case "IncomingCallView":
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
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "RateView" })]
        })
      );
      break;

    case "SelectRoleView/Reset":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "SelectRoleView" })]
        })
      );
      break;

    default:
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
