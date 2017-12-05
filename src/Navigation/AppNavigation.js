import { StackNavigator, DrawerNavigator } from "react-navigation";

import LandingContainer from "../Containers/LandingContainer";
import Login from "../Onboarding/Login";
import Profile from "../Profile";
import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import MenuView from "../Components/MenuView/MenuView";

const Navigation = StackNavigator(
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

const AppNavigation = DrawerNavigator(
  {
    Home: {
      screen: Navigation
    },
    Stack: {
      screen: MenuView
    }
  },
  {
    contentComponent: MenuView,
    contentOptions: {
      activeTintColor: "#e91e63",
      style: {
        flex: 1,
        paddingTop: 15
      }
    }
  }
);
export default AppNavigation;
