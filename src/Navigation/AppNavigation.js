import { StackNavigator } from "react-navigation";

import LandingContainer from "../Containers/LandingContainer";
import Login from "../Onboarding/Login";
import Profile from "../Profile";
import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";

const AppNavigation = StackNavigator(
  {
    LandingContainer: { screen: LandingContainer },
    Login: { screen: Login },
    Profile: { screen: Profile },
    SelectRoleView: { screen: SelectRoleView }
  },
  {
    initialRouteName: "LandingContainer",
    headerMode: "none"
  }
);

export default AppNavigation;
