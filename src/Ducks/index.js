import { combineReducers } from "redux";

import activeSessionReducer from "./ActiveSessionReducer";
import auth from "./AuthReducer";
import callCustomerSettings from "./CallCustomerSettings";
import callHistory from "./CallHistoryReducer";
import callLinguistSettings from "./CallLinguistSettings";
import contactLinguist from "./ContactLinguistReducer";
import customerProfile from "./CustomerProfileReducer";
import dataReducer from "./DataReducer";
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
import tokbox from "./tokboxReducer";
import userProfile from "./UserProfileReducer";
import newSessionReducer from './NewSessionReducer';

// Combine all the reducers
const rootReducer = combineReducers({
  activeSessionReducer,
  auth,
  callCustomerSettings,
  callHistory,
  callLinguistSettings,
  contactLinguist,
  customerProfile,
  dataReducer, // Borrar
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
  tokbox,
  userProfile,
  newSessionReducer
});

export default rootReducer;
