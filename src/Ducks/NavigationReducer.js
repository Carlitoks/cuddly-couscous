import { NavigationActions } from "react-navigation";

import AppNavigation from "../Navigation/AppNavigation";

/*
const firstAction = AppNavigation.router.getActionForPathAndParams(
  "LandingContainer"
);
const tempNavState = AppNavigation.router.getStateForAction(firstAction);

const secondAction = AppNavigation.router.getActionForPathAndParams("Profile");

const initialNavState = AppNavigation.router.getStateForAction(
  secondAction,
  tempNavState
);
*/
export default (reducer = (state, action) => {
  newState = AppNavigation.router.getStateForAction(
    NavigationActions.navigate({ routeName: action.type }),
    state
  );

  return newState || state;
});
