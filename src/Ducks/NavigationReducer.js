import { NavigationActions } from "react-navigation";

import AppNavigation from "../Navigation/AppNavigation";

export default (reducer = (state, action) => {
  let newState;

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

    default:
      newState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.type }),
        state
      );
  }

  return newState || state;
});
