import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import auth from "./AuthReducer";
import contactLinguist from "./ContactLinguistReducer";
import forgotPassword from "./ForgotPassowrdReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import home from "./HomeReducer";
import registrationCustomer from "./RegistrationCustomerReducer";
import callCustomerSettings from "./CallCustomerSettings";
import callLinguistSettings from "./CallLinguistSettings";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer, // Borrar
  home,
  auth,
  callCustomerSettings,
  callLinguistSettings,
  contactLinguist,
  forgotPassword,
  login,
  nav,
  registrationCustomer
});

export default rootReducer;
