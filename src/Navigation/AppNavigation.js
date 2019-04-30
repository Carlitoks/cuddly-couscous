import { StackNavigator, DrawerNavigator } from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";

import CallHistory from "../Containers/CallHistory/CallHistoryView";

import PasswordCustomerView from "../Onboarding/PasswordCustomerView/PasswordCustomerView";
import ForgotPasswordView from "../Onboarding/ForgotPasswordView/ForgotPasswordView";
import CheckYourEmailView from "../Onboarding/ForgotPasswordView/CheckYourEmailView";

import Home from "../Home/Home";
import SessionDetails from "../RateCall/SessionInfo/SessionInfoView";

import MenuView from "../Components/MenuView/MenuView";

import RateView from "../RateCall/RateExperience/RateView";

// User Profile
import UserProfileView from "../Profile/UserProfile/UserProfileView";
import EditNameView from "../Profile/EditName/EditNameView";
import EditGenderView from "../Profile/EditGender/EditGenderView";
import EditNativeLanguageView from "../Profile/EditNativeLanguage/EditNativeLanguageView";

import SettingsView from "../Settings/SettingsView";
import InterfaceLanguageView from "../Settings/InterfaceLanguageView";
import ScanScreenView from "../Containers/ScanScreen/ScanScreenView";
import StaticView from "../StaticView/StaticView";
import TextView from "../Components/TextView/TextView";
import PromoCodeView from "../Containers/PromoCode/PromoCodeView";
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

// new session views
import SessionView from "../Containers/Session/SessionView";
import CustomerMatchingView from "../Containers/Session/CustomerMatchingView"
import CustomerRetryView from "../Containers/Session/CustomerRetryView";
import LinguistIncomingCallView from "../Containers/Session/LinguistIncomingCallView";

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

    PasswordCustomerView: {
      screen: PasswordCustomerView,
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

    Home: {
      screen: Home
    },

    CheckYourEmailView: {
      screen: CheckYourEmailView,
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

    IntroView: {
      screen: OnboardingScreen,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
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
        gesturesEnabled: false
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
    },

    // New session handling routes
    SessionView: {
      screen: SessionView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CustomerMatchingView: {
      screen: CustomerMatchingView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CustomerRetryView: {
      screen: CustomerRetryView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    LinguistIncomingCallView: {
      screen: LinguistIncomingCallView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    }
  },
  {
    initialRouteName: "RegisterView",
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
