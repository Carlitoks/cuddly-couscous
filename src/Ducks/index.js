import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import auth from "./AuthReducer";
import contactLinguist from "./ContactLinguistReducer";
import forgotPassword from "./ForgotPasswordReducer";
import resetPassword from "./ResetPasswordReducer";
import login from "./LoginReducer";
import networkInfo from "./NetworkInfoReducer";
import networkErrors from "./NetworkErrorsReducer";
import nav from "./NavigationReducer";
import userProfile from "./UserProfileReducer";
import registrationCustomer from "./RegistrationCustomerReducer";
import callCustomerSettings from "./CallCustomerSettings";
import callLinguistSettings from "./CallLinguistSettings";
import settings from "./SettingsReducer";
import customerProfile from "./CustomerProfileReducer";
import rateCall from "./RateCallReducer";
import tokbox from "./tokboxReducer";
import profileLinguist from "./ProfileLinguistReducer";
import linguistForm from "./LinguistFormReducer";
import sessionInfo from "./SessionInfoReducer";
import events from "./EventsReducer";
import homeFlow from "./HomeFlowReducer";
import callHistory from "./CallHistoryReducer";
import pushNotification from "./PushNotificationReducer";
import promoCode from "./PromoCodeReducer";
import onboardingRecord from "./OnboardingRecordReducer";

// Combine all the reducers
const rootReducer = combineReducers({
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
  profileLinguist,
  promoCode,
  pushNotification,
  rateCall,
  registrationCustomer,
  resetPassword,
  sessionInfo,
  settings,
  tokbox,
  userProfile
});

export default rootReducer;
