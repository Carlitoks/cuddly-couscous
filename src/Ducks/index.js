import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import auth from "./AuthReducer";
import contactLinguist from "./ContactLinguistReducer";
import forgotPassword from "./ForgotPassowrdReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import registrationCustomer from "./RegistrationCustomerReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer, // Borrar

  auth,
  contactLinguist,
  forgotPassword,
  login,
  nav,
  registrationCustomer
});

export default rootReducer;
