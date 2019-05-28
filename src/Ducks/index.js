import { combineReducers } from "redux";

import auth from "./AuthReducer";
import callHistory from "./CallHistoryReducer";
import customerProfile from "./CustomerProfileReducer";

import events from "./EventsReducer";
import forgotPassword from "./ForgotPasswordReducer";
import homeFlow from "./HomeFlowReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import networkErrors from "./NetworkErrorsReducer";
import networkInfo from "./NetworkInfoReducer";
import onboardingRecord from "./OnboardingRecordReducer";
import payments from "./PaymentsReducer";
import profileLinguist from "./ProfileLinguistReducer";
import promoCode from "./PromoCodeReducer";
import pushNotification from "./PushNotificationReducer";
import rateCall from "./RateCallReducer";
import registrationCustomer from "./RegistrationCustomerReducer";
import resetPassword from "./ResetPasswordReducer";
import sessionInfo from "./SessionInfoReducer";
import settings from "./SettingsReducer";
import userProfile from "./UserProfileReducer";
import newSessionReducer from "./NewSessionReducer";
import onboardingReducer from "./OnboardingReducer";
import appConfigReducer from "./AppConfigReducer";
import account from "./AccountReducer";
import appState from "./AppStateReducer";
import LogicReducer from "./LogicReducer";
import currentSessionReducer from "./CurrentSessionReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  appConfigReducer,
  auth,
  callHistory,
  customerProfile,
  events,
  forgotPassword,
  homeFlow,
  login,
  nav,
  networkErrors,
  networkInfo,
  onboardingRecord,
  payments,
  profileLinguist,
  promoCode,
  pushNotification,
  rateCall,
  registrationCustomer,
  resetPassword,
  sessionInfo,
  settings,
  userProfile,
  newSessionReducer,
  onboardingReducer,
  LogicReducer,
  currentSessionReducer,
  account,
  appState,
});

export default rootReducer;
