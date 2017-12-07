import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import forgotPassword from "./ForgotPassowrdReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import registrationCustomer from "./RegistrationCustomerReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,

  forgotPassword,
  login,
  nav,
  registrationCustomer
});

export default rootReducer;
