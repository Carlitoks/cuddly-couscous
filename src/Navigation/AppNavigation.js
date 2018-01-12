import { StackNavigator, DrawerNavigator } from "react-navigation";

import { getS } from "../Config/CreateStore";

import LandingContainer from "../Containers/LandingContainer";
import Profile from "../Profile";

import AssistanceView from "../ContactLinguist/AssistanceView/AssistanceView";
import CallHistory from "../Containers/CallHistory/CallHistory";
import CallTimeView from "../ContactLinguist/CallTimeView/CallTimeView";
import ContactingLinguist from "../CallCustomer/ContactingLinguist/ContactingLinguistView";
import ContactLinguist from "../ContactLinguist/SelectLanguageView/SelectLanguageView";
import CustomerAccount from "../Onboarding/CustomerAccountView/CustomerAccountView";
import CustomerProfile from "../Onboarding/CustomerProfileView/CustomerProfileView";
import CustomerView from "../Containers/CallConection/Customer/CustomerView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import RateCallView from "../RateCall/RateExperience/RateExperienceView";
import Home from "../Home/Home";
import IncomingCallView from "../CallLinguist/IncomingCallView/IncomingCallView";
import LinguistView from "../Containers/CallConection/Linguist/LinguistView";
import LoginView from "../Onboarding/LoginView/LoginView";
import MenuView from "../Components/MenuView/MenuView";
import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import NameLinguistView from "../LinguistForm/NameLinguistView/NameLinguistView";
import GenderLinguistView from "../LinguistForm/GenderLinguistView/GenderLinguistView";
import EmailLinguistView from "../LinguistForm/EmailLinguistView/EmailLinguistView";
import PhoneLinguistView from "../LinguistForm/PhoneLinguistView/PhoneLinguistView"
import VerifyPhoneLinguistView from "../LinguistForm/VerifyPhoneLinguistView/VerifyPhoneLinguistView"

const Navigation = StackNavigator(
  {
    AssistanceView: { screen: AssistanceView },
    CallHistory: { screen: CallHistory },
    CallTimeView: { screen: CallTimeView },
    ContactingLinguist: { screen: ContactingLinguist },
    ContactLinguist: { screen: ContactLinguist },
    CustomerAccount: {
      screen: CustomerAccount,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CustomerProfile: { screen: CustomerProfile },
    CustomerView: { screen: CustomerView },
    ForgotPasswordView: {
      screen: ForgotPasswordView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    Home: {
      screen: Home
    },
    IncomingCallView: { screen: IncomingCallView },
    LandingContainer: { screen: LandingContainer },
    RateCallView: { screen: RateCallView },
    NameLinguistView: { screen: NameLinguistView },
    GenderLinguistView: { screen: GenderLinguistView },
    EmailLinguistView: { screen: EmailLinguistView },
    PhoneLinguistView: { screen: PhoneLinguistView },
    VerifyPhoneLinguistView: { screen: VerifyPhoneLinguistView },
    LinguistView: { screen: LinguistView },
    LoginView: {
      screen: LoginView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    Profile: { screen: Profile },
    RateCallView: { screen: RateCallView },
    SelectRoleView: {
      screen: SelectRoleView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    }
  },
  {
    initialRouteName: "SelectRoleView",
    headerMode: "none"
  }
);

const AppNavigation = DrawerNavigator(
  {
    Navigation: {
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
