import { StackNavigator, DrawerNavigator } from "react-navigation";

import { getS } from "../Config/CreateStore";

import AssistanceView from "../ContactLinguist/AssistanceView/AssistanceView";
import CallHistory from "../Containers/CallHistory/CallHistory";
import CallTimeView from "../ContactLinguist/CallTimeView/CallTimeView";
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
import CustomerView from "../Call/Customer/Call/CustomerView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import CheckYourEmailView from "../Onboarding/ForgotPasswordView/CheckYourEmailView";
import Home from "../Home/Home";
import IncomingCallView from "../Call/Linguist/IncomingCall/IncomingCallView";
import LinguistView from "../Call/Linguist/Call/LinguistView";
import SessionDetails from "../RateCall/SessionInfo/SessionInfoView";

import LoginView from "../Onboarding/LoginView/LoginView";
import MenuView from "../Components/MenuView/MenuView";

// Onboarding - Select Language
import SelectLanguageView from "../LinguistForm/SelectLanguageView/SelectLanguageView";
import LanguageSettingsView from "../LinguistForm/LanguageSettingsView/LanguageSettingsView";
import ResetPasswordView from "../Onboarding/ResetPasswordView/ResetPasswordView";

//List Views
import NativeLanguageView from "../Lists/NativeLanguageView/NativeLanguageView";

import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import RateCallView from "../RateCall/RateExperience/RateExperienceView";
import NameLinguistView from "../LinguistForm/NameLinguistView/NameLinguistView";
import GenderLinguistView from "../LinguistForm/GenderLinguistView/GenderLinguistView";
import EmailLinguistView from "../LinguistForm/EmailLinguistView/EmailLinguistView";
import PasswordLinguistView from "../LinguistForm/PasswordLinguistView/PasswordLinguistView";
import SelectListView from "../LinguistForm/SelectListView/SelectListView";
import FamiliarityView from "../LinguistForm/FamiliarityView/FamiliarityView";

// User Profile
import UserProfileView from "../Profile/UserProfile/UserProfileView";
import EditNameView from "../Profile/EditName/EditNameView";
import EditGenderView from "../Profile/EditGender/EditGenderView";
import EditNativeLanguageView from "../Profile/EditNativeLanguage/EditNativeLanguageView";

import PhoneLinguistView from "../LinguistForm/PhoneLinguistView/PhoneLinguistView";
import VerifyPhoneLinguistView from "../LinguistForm/VerifyPhoneLinguistView/VerifyPhoneLinguistView";
import CallSettings from "../CallSettings/CallSettings";
import ScanScreenView from "../Containers/ScanScreen/ScanScreenView";
import CallConfirmationView from "../Call/Customer/CallConfirmation/CallConfirmationView";
import SessionLanguageView from "../Call/Customer/SessionLanguageView/SessionLanguageView";
import StaticView from "../StaticView/StaticView";
import TextView from "../Components/TextView/TextView";
import CustomScenarioView from "../Home/CustomScenario/CustomScenarioView";
import PromoCodeView from "../Containers/PromoCode/PromoCodeView";
import PromotionView from "../Containers/PromoCode/PromotionView";
import PromoCodeListView from "../Containers/PromoCode/PromoCodeListView";

const Navigation = StackNavigator(
  {
    AssistanceView: { screen: AssistanceView },
    CallHistory: {
      screen: CallHistory,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CallTimeView: {
      screen: CallTimeView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ContactingLinguist: {
      screen: ContactingLinguist,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    ContactLinguist: {
      screen: ContactLinguist,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
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
    CustomerProfile: {
      screen: CustomerProfile,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
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
      screen: CustomScenarioView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    IncomingCallView: {
      screen: IncomingCallView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    RateCallView: {
      screen: RateCallView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
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
    VerifyPhoneLinguistView: {
      screen: VerifyPhoneLinguistView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
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
    ScanScreenView: {
      screen: ScanScreenView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    EditNameView: {
      screen: EditNameView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EditGenderView: {
      screen: EditGenderView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EditNativeLanguageView: {
      screen: EditNativeLanguageView,
      navigationOptions: {
        gesturesEnabled: false
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
      screen: StaticView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    TextView: {
      screen: TextView
    },
    NativeLanguageView: {
      screen: NativeLanguageView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
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

    CallSettings: {
      screen: CallSettings,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    UserProfileView: {
      screen: UserProfileView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CallConfirmationView: {
      screen: CallConfirmationView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SessionLanguageView: {
      screen: SessionLanguageView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SessionDetails: {
      screen: SessionDetails,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PromoCodeView: {
      screen: PromoCodeView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PromotionView: {
      screen: PromotionView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    PromoCodeListView: {
      screen: PromoCodeListView,
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
