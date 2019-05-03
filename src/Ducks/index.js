import { combineReducers } from "redux";

import auth from "./AuthReducer";
import callHistory from "./CallHistoryReducer";
import contactLinguist from "./ContactLinguistReducer";
import customerProfile from "./CustomerProfileReducer";

import events from "./EventsReducer";
import forgotPassword from "./ForgotPasswordReducer";
import homeFlow from "./HomeFlowReducer";
import linguistForm from "./LinguistFormReducer";
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
import LogicReducer from "./LogicReducer";
import currentSessionReducer from "./CurrentSessionReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  appConfigReducer,
  auth,
  callHistory,
  contactLinguist,
  customerProfile,

  events,
  forgotPassword,
  homeFlow,
  linguistForm,
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
  currentSessionReducer
});

export default rootReducer;
