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

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer, // Borrar
  userProfile,
  auth,
  callCustomerSettings,
  callLinguistSettings,
  callHistory,
  contactLinguist,
  forgotPassword,
  resetPassword,
  login,
  networkInfo,
  networkErrors,
  nav,
  registrationCustomer,
  customerProfile,
  rateCall,
  tokbox,
  profileLinguist,
  linguistForm,
  sessionInfo,
  events,
  pushNotification,
  homeFlow,
  promoCode
});

export default rootReducer;
