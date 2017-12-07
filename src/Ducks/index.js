import { combineReducers } from "redux";

import dataReducer from "./DataReducer";

import forgotPassword from "./ForgotPassowrdReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,

  forgotPassword,
  login,
  nav
  // [ANOTHER REDUCER],
  // [ANOTHER REDUCER]
});

export default rootReducer;
