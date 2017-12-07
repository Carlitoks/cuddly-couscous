import { combineReducers } from "redux";

import dataReducer from "./DataReducer";
import loginReducer from "./LoginReducer";
import navReducer from "./NavigationReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
  loginReducer,
  nav: navReducer
  // [ANOTHER REDUCER],
  // [ANOTHER REDUCER]
});

export default rootReducer;
