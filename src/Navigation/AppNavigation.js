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
import ContactLinguist from "../ContactLinguist/SelectLanguageView/SelectLanguageView";
import AssistanceView from "../ContactLinguist/AssistanceView/AssistanceView";
import CallTimeView from "../ContactLinguist/CallTimeView/CallTimeView";
import IncomingCallView from "../CallLinguist/IncomingCallView/IncomingCallView";
import CallHistory from "../Containers/CallHistory/CallHistory";
import CustomerView from "../Containers/CallConection/Customer/CustomerView";
import LinguistView from "../Containers/CallConection/Linguist/LinguistView";
import ContactingLinguist from "../CallCustomer/ContactingLinguist/ContactingLinguistView";

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
    ContactLinguist: { screen: ContactLinguist },
    AssistanceView: { screen: AssistanceView },
    CallHistory: { screen: CallHistory },
    CallTimeView: { screen: CallTimeView },
    CustomerView: { screen: CustomerView },
    LinguistView: { screen: LinguistView },
    ContactingLinguist: { screen: ContactingLinguist }
  },
  {
    initialRouteName: "Home",
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
