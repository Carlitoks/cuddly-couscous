import { StackNavigator, DrawerNavigator } from "react-navigation";

import LandingContainer from "../Containers/LandingContainer";
import Profile from "../Profile";

import LoginView from "../Onboarding/LoginView/LoginView";
import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import MenuView from "../Components/MenuView/MenuView";

const Navigation = StackNavigator(
  {
    LandingContainer: { screen: LandingContainer },
    LoginView: { screen: LoginView },
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
