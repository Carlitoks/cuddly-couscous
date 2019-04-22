import { StackNavigator, DrawerNavigator } from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import { Animated, Easing } from "react-native";
import { getS } from "../Config/CreateStore";

import CallHistory from "../Containers/CallHistory/CallHistoryView";
import ContactingLinguist from "../Call/Customer/ContactingLinguist/ContactingLinguistView";
import NameCustomerView from "../Onboarding/NameCustomerView/NameCustomerView";
import PreferredNameCustomerView from "../Onboarding/PreferredNameCustomerView/PreferredNameCustomerView";
import EmailCustomerView from "../Onboarding/EmailCustomerView/EmailCustomerView";
import PasswordCustomerView from "../Onboarding/PasswordCustomerView/PasswordCustomerView";
import GenderCustomerView from "../Onboarding/GenderCustomerView/GenderCustomerView";
import WelcomeCustomerView from "../Onboarding/WelcomeCustomerView/WelcomeCustomerView";

import LanguageCustomerView from "../Onboarding/LanguageCustomerView/LanguageCustomerView";
import CustomerProfile from "../Onboarding/CustomerProfileView/CustomerProfileView";
import CustomerView from "../Call/Customer/Call/CustomerView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import CheckYourEmailView from "../Onboarding/ForgotPasswordView/CheckYourEmailView";
import Home from "../Home/Home";
import IncomingCallView from "../Call/Linguist/IncomingCall/IncomingCallView";
import LinguistView from "../Call/Linguist/Call/LinguistView";
import MenuView from "../Components/MenuView/MenuView";

// Onboarding - Select Language
import SelectLanguageView from "../LinguistForm/SelectLanguageView/SelectLanguageView";
import LanguageSettingsView from "../LinguistForm/LanguageSettingsView/LanguageSettingsView";

//List Views
import NativeLanguageView from "../Lists/NativeLanguageView/NativeLanguageView";

import SelectRoleView from "../Onboarding/SelectRoleView/SelectRoleView";
import RateView from "../RateCall/RateExperience/RateView";
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
import SettingsView from "../Settings/SettingsView";
import InterfaceLanguageView from "../Settings/InterfaceLanguageView";
import ScanScreenView from "../Containers/ScanScreen/ScanScreenView";
import StaticView from "../StaticView/StaticView";
import TextView from "../Components/TextView/TextView";
import PromoCodeView from "../Containers/PromoCode/PromoCodeView";
import PromotionView from "../Containers/PromoCode/PromotionView";
import PromoCodeListView from "../Containers/PromoCode/PromoCodeListView";
import ConnectingView from "../Call/Linguist/Connecting/ConnectingView";
import PaymentsView from "../Payments/PaymentsView";
import OnboardingScreen from "../Containers/Onboarding/OnboardingScreen";
import LoginScreen from "../Containers/Login/LoginScreen";
import RegisterScreen from "../Containers/Register/RegisterScreen";
import LocationPermissionView from "../Containers/Permissions/LocationPermissionView";
import NotificationPermissionView from "../Containers/Permissions/NotificationPermissionView";
import CameraMicPermissionView from "../Containers/Permissions/CameraMicPermissionView";
import PaymentScreen from "../Containers/Payments/PaymentScreen";
import PaymentDetailScreen from "../Containers/Payments/PaymentDetailScreen";
import CardInfoScreen from "../Containers/Payments/CardInfoScreen";
import EditCardScreen from "../Containers/Payments/EditCardScreen";

const Navigation = StackNavigator(
  {
    CallHistory: {
      screen: CallHistory,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PaymentsView: {
      screen: PaymentScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PaymentDetailScreen: {
      screen: PaymentDetailScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CardInfoScreen: {
      screen: CardInfoScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EditCardScreen: {
      screen: EditCardScreen,
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
    LoginView: {
      screen: LoginScreen,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    RegisterView: {
      screen: RegisterScreen,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    ConnectingView: {
      screen: ConnectingView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
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
    IncomingCallView: {
      screen: IncomingCallView,
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
    IntroView: {
      screen: OnboardingScreen,
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
    SettingsView: {
      screen: SettingsView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    InterfaceLanguageView: {
      screen: InterfaceLanguageView,
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
    PromoCodeView: {
      screen: PromoCodeView,
      navigationOptions: {
        gesturesEnabled: false
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
    },
    RateView: {
      screen: RateView,
      navigationOptions: {
        navigationOptions: {
          gesturesEnabled: false,
          drawerLockMode: "locked-closed"
        }
      }
    },
    LocationPermissionView: {
      screen: LocationPermissionView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    NotificationPermissionView: {
      screen: NotificationPermissionView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CameraMicPermissionView: {
      screen: CameraMicPermissionView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    }
  },
  {
    initialRouteName: "IntroView",
    headerMode: "none",
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        // Disable the transition animation when resetting to the home screen.
        // if (
        //   sceneProps.index === 0 &&
        //   sceneProps.scene.route.routeName !== "Home" &&
        //   sceneProps.scenes.length > 2
        // )
        //   return null;

        if (sceneProps.scene.route.routeName === "RateView") {
          return CardStackStyleInterpolator.forFadeFromBottomAndroid(sceneProps);
        } else {
          return CardStackStyleInterpolator.forHorizontal(sceneProps);
        }
        // Otherwise, use the usual horizontal animation.
      }
    })
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
