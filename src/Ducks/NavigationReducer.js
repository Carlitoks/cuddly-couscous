import { NavigationActions } from "react-navigation";

import AppNavigation from "../Navigation/AppNavigation";

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigation.router.getActionForPathAndParams("Login");
const tempNavState = AppNavigation.router.getStateForAction(firstAction);

const secondAction = AppNavigation.router.getActionForPathAndParams("Profile");
const initialNavState = AppNavigation.router.getStateForAction(
  secondAction,
  tempNavState
);

export default (reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "back":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;

    case "Logout":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        state
      );
      break;

    case "Login":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        state
      );
      break;

    case "Profile":
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Profile" }),
        state
      );
      break;

    default:
      newState = AppNavigation.router.getStateForAction(action, state);
      break;
  }

  return newState || state;
});
