import { StackNavigator } from "react-navigation";

import LandingContainer from "../Containers/LandingContainer";
import Login from "../Onboarding/Login";
import Profile from "../Profile";

const AppNavigation = StackNavigator(
  {
    LandingContainer: { screen: LandingContainer },
    Login: { screen: Login },
    Profile: { screen: Profile }
  },
  {
    initialRouteName: "LandingContainer"
  }
);

export default AppNavigation;
