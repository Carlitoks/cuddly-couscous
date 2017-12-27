import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import auth from "./AuthReducer";
import contactLinguist from "./ContactLinguistReducer";
import forgotPassword from "./ForgotPasswordReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import userProfile from "./UserProfileReducer";
import registrationCustomer from "./RegistrationCustomerReducer";
import callCustomerSettings from "./CallCustomerSettings";
import callLinguistSettings from "./CallLinguistSettings";
import customerProfile from "./CustomerProfileReducer";
import rateCall from "./RateCallReducer";
import tokbox from "./tokboxReducer";
import profileLinguist from "./ProfileLinguistReducer"

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
  nav,
  registrationCustomer,
  customerProfile,
  rateCall,
  tokbox,
  profileLinguist
});

export default rootReducer;
