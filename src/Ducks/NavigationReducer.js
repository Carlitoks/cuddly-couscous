import { NavigationActions } from "react-navigation";

import AppNavigation from "../Navigation/AppNavigation";

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
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      );
      break;
      
      case "Home":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
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

    case "RateCallView":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "RateCallView" })]
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
        NavigationActions.navigate({ routeName: action.type }),
        state
      );
  }

  return newState || state;
});
