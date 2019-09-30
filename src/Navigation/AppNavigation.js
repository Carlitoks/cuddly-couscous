import { DrawerNavigator, StackNavigator } from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";

import CallHistory from "../Containers/CallHistory/CallHistoryView";

import Home from "../Home/Home";
import SessionDetails from "../RateCall/SessionInfo/SessionInfoView";

import MenuView from "../Components/MenuView/MenuView";
import LoadingView from "../Containers/LoadingView";
// User Profile
import UserProfileView from "../Profile/UserProfile/UserProfileView";
import EditNameView from "../Profile/EditName/EditNameView";
import EditGenderView from "../Profile/EditGender/EditGenderView";

import SettingsView from "../Settings/SettingsView";
import InterfaceLanguageView from "../Settings/InterfaceLanguageView";
import ScanScreenView from "../Containers/ScanScreen/ScanScreenView";
import PromoCodeView from "../Containers/PromoCode/PromoCodeView";
import OnboardingScreen from "../Containers/Onboarding/OnboardingScreen";
import LoginScreen from "../Containers/Login/LoginScreen";
import RegisterScreen from "../Containers/Register/RegisterScreen";
import NotificationPermissionView from "../Containers/Permissions/NotificationPermissionView";
import CameraMicPermissionView from "../Containers/Permissions/CameraMicPermissionView";
import PackageCheckoutView from "../Containers/Payments/PackageCheckoutView";
import PackagePurchaseSuccessView from "../Containers/Payments/PackagePurchaseSuccessView";
import AccountDetailsView from "../Containers/Payments/AccountDetailsView";
import AvailablePackagesView from "../Containers/Payments/AvailablePackagesView";
import ReportProblemScreen from "../Containers/Rating/ReportProblemScreen";
import EditCardScreen from "../Containers/Payments/EditCardScreen";
import MissingRequiredPermissionsView from "../Containers/Permissions/MissingRequiredPermissionsView";
import RatingsScreen from "../Containers/Rating/RatingScreen";
import ForgotPasswordScreen from "../Containers/ForgotPassword/ForgotPasswordScreen";
import LanguageListScreen from "../Containers/Register/Components/LanguageListScreen";
// new session views
import SessionView from "../Containers/Session/SessionView";
import CustomerMatchingView from "../Containers/Session/CustomerMatchingView";
import CustomerRetryView from "../Containers/Session/CustomerRetryView";
import LinguistIncomingCallView from "../Containers/Session/LinguistIncomingCallView";

// by default, this is the screen that will
// be shown first when the app loads
let initialScreen = "LoadingView";

// change the initial screen, this must be called before
// the router is initialized
//
// NOTE: this doesn't actually work because the navigator gets initialized
// before this can be called.
export const setInitialScreen = (name) => {
  initialScreen = name;
};

const Navigation = StackNavigator(
  {
    LoadingView: {
      screen: LoadingView,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    CallHistory: {
      screen: CallHistory,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PackageCheckoutView: {
      screen: PackageCheckoutView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PackagePurchaseSuccessView: {
      screen: PackagePurchaseSuccessView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AccountDetailsView: {
      screen: AccountDetailsView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AvailablePackagesView: {
      screen: AvailablePackagesView,
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
    MissingRequiredPermissionsView: {
      screen: MissingRequiredPermissionsView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReportProblemScreen: {
      screen: ReportProblemScreen,
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
    LanguageListScreen: {
      screen: LanguageListScreen,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    ForgotPasswordView: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        gesturesEnabled: false,
        drawerLockMode: "locked-closed"
      }
    },
    Home: {
      screen: Home
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
      screen: RatingsScreen,
      navigationOptions: {
        navigationOptions: {
          gesturesEnabled: false,
          drawerLockMode: "locked-closed"
        }
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
    initialRouteName: initialScreen,
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
