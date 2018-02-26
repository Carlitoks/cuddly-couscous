import { StackNavigator, DrawerNavigator } from "react-navigation";

import { getS } from "../Config/CreateStore";

import Profile from "../Profile";

import AssistanceView from "../ContactLinguist/AssistanceView/AssistanceView";
import CallHistory from "../Containers/CallHistory/CallHistory";
import CallTimeView from "../ContactLinguist/CallTimeView/CallTimeView";
// import ContactingLinguist from "../CallCustomer/ContactingLinguist/ContactingLinguistView";
import ContactingLinguist from "../Call/Customer/ContactingLinguist/ContactingLinguistView";
import ContactLinguist from "../ContactLinguist/SelectLanguageView/SelectLanguageView";
import NameCustomerView from "../Onboarding/NameCustomerView/NameCustomerView";
import PreferredNameCustomerView from "../Onboarding/PreferredNameCustomerView/PreferredNameCustomerView";
import EmailCustomerView from "../Onboarding/EmailCustomerView/EmailCustomerView";
import PasswordCustomerView from "../Onboarding/PasswordCustomerView/PasswordCustomerView";
import GenderCustomerView from "../Onboarding/GenderCustomerView/GenderCustomerView";
import WelcomeCustomerView from "../Onboarding/WelcomeCustomerView/WelcomeCustomerView";
import PhoneCustomerView from "../Onboarding/PhoneCustomerView/PhoneCustomerView";
import LanguageCustomerView from "../Onboarding/LanguageCustomerView/LanguageCustomerView";
import CustomerProfile from "../Onboarding/CustomerProfileView/CustomerProfileView";
// import CustomerView from "../Containers/CallConection/Customer/CustomerView";
import CustomerView from "../Call/Customer/Call/CustomerView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import CheckYourEmailView from "../Onboarding/ForgotPasswordView/CheckYourEmailView";
import Home from "../Home/Home";
//import IncomingCallView from "../CallLinguist/IncomingCallView/IncomingCallView";
import IncomingCallView from "../Call/Linguist/IncomingCall/IncomingCallView";
//import LinguistView from "../Containers/CallConection/Linguist/LinguistView";
import LinguistView from "../Call/Linguist/Call/LinguistView";
import SessionDetails from "../RateCall/SessionInfo/SessionInfoView";

import LoginView from "../Onboarding/LoginView/LoginView";
import MenuView from "../Components/MenuView/MenuView";

// Onboarding - Select Language
import SelectLanguageView from "../LinguistForm/SelectLanguageView/SelectLanguageView";
import LanguageSettingsView from "../LinguistForm/LanguageSettingsView/LanguageSettingsView";

import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import RateCallView from "../RateCall/RateExperience/RateExperienceView";
import NameLinguistView from "../LinguistForm/NameLinguistView/NameLinguistView";
import GenderLinguistView from "../LinguistForm/GenderLinguistView/GenderLinguistView";
import EmailLinguistView from "../LinguistForm/EmailLinguistView/EmailLinguistView";
import PasswordLinguistView from "../LinguistForm/PasswordLinguistView/PasswordLinguistView";
import SelectListView from "../LinguistForm/SelectListView/SelectListView";
import FamiliarityView from "../LinguistForm/FamiliarityView/FamiliarityView";

import PhoneLinguistView from "../LinguistForm/PhoneLinguistView/PhoneLinguistView";
import VerifyPhoneLinguistView from "../LinguistForm/VerifyPhoneLinguistView/VerifyPhoneLinguistView";
import CallSettings from "../CallSettings/CallSettings";
import ScanScreenView from "../Containers/ScanScreen/ScanScreenView";
import UserProfileView from "../Profile/UserProfile/UserProfileView";
import CallConfirmationView from "../Call/Customer/CallConfirmation/CallConfirmationView";
import StaticView from "../StaticView/StaticView";

import CustomScenarioView from "../Home/CustomScenario/CustomScenarioView";
import PromoCodeView from "../Containers/PromoCode/PromoCodeView";

const Navigation = StackNavigator(
  {
    AssistanceView: { screen: AssistanceView },
    CallHistory: {
      screen: CallHistory
    },
    CallTimeView: { screen: CallTimeView },
    ContactingLinguist: {
      screen: ContactingLinguist,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    ContactLinguist: { screen: ContactLinguist },
    NameCustomerView: {
      screen: NameCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PreferredNameCustomerView: {
      screen: PreferredNameCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    EmailCustomerView: {
      screen: EmailCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PasswordCustomerView: {
      screen: PasswordCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    GenderCustomerView: {
      screen: GenderCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PhoneCustomerView: {
      screen: PhoneCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    WelcomeCustomerView: {
      screen: WelcomeCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    LanguageCustomerView: {
      screen: LanguageCustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CustomerProfile: { screen: CustomerProfile },
    CustomerView: {
      screen: CustomerView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    ForgotPasswordView: {
      screen: ForgotPasswordView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CheckYourEmailView: {
      screen: CheckYourEmailView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    Home: {
      screen: Home
    },
    CustomScenarioView: {
      screen: CustomScenarioView
    },
    IncomingCallView: {
      screen: IncomingCallView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    RateCallView: { screen: RateCallView },
    NameLinguistView: {
      screen: NameLinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    GenderLinguistView: {
      screen: GenderLinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    EmailLinguistView: {
      screen: EmailLinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PhoneLinguistView: {
      screen: PhoneLinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PasswordLinguistView: {
      screen: PasswordLinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    VerifyPhoneLinguistView: { screen: VerifyPhoneLinguistView },
    LinguistView: {
      screen: LinguistView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    LoginView: {
      screen: LoginView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    Profile: { screen: Profile },
    ScanScreenView: {
      screen: ScanScreenView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    SelectLanguageView: {
      screen: SelectLanguageView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    StaticView: {
      screen: StaticView
    },
    SelectListView: {
      screen: SelectListView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    LanguageSettingsView: {
      screen: LanguageSettingsView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    FamiliarityView: {
      screen: FamiliarityView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    SelectRoleView: {
      screen: SelectRoleView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CallSettings: { screen: CallSettings },
    UserProfileView: { screen: UserProfileView },
    CallConfirmationView: { screen: CallConfirmationView },
    SessionDetails: { screen: SessionDetails },
    PromoCodeView: {
      screen: PromoCodeView,
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
