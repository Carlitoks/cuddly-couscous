import { StackNavigator, DrawerNavigator } from "react-navigation";

import LandingContainer from "../Containers/LandingContainer";
import Profile from "../Profile";

import LoginView from "../Onboarding/LoginView/LoginView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import MenuView from "../Components/MenuView/MenuView";
import Home from "../Components/Home/Home";

import CustomerAccount from "../Onboarding/CustomerAccountView/CustomerAccountView";
import CustomerProfile from "../Onboarding/CustomerProfileView/CustomerProfileView";

import IncomingCallView from "../Containers/IncomingCallView/IncomingCallView";
import CallHistory from "../Containers/CallHistory/CallHistory";

const Navigation = StackNavigator(
  {
    ForgotPasswordView: { screen: ForgotPasswordView },
    LandingContainer: { screen: LandingContainer },
    LoginView: { screen: LoginView },
    Profile: { screen: Profile },
    SelectRoleView: { screen: SelectRoleView },
    Home: { screen: Home },
    CustomerAccount: { screen: CustomerAccount },
    CustomerProfile: { screen: CustomerProfile },
    IncomingCallView: { screen: IncomingCallView },
    CallHistory: { screen: CallHistory }
  },
  {
    initialRouteName: "SelectRoleView",
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
