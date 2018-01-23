import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import auth from "./AuthReducer";
import contactLinguist from "./ContactLinguistReducer";
import forgotPassword from "./ForgotPasswordReducer";
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

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer, // Borrar
  userProfile,
  auth,
  callCustomerSettings,
  callLinguistSettings,
  contactLinguist,
  forgotPassword,
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
  sessionInfo
});

export default rootReducer;
