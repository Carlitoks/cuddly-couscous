import { combineReducers } from "redux";
import dataReducer from "./DataReducer";
import navReducer from "./NavigationReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
  nav: navReducer
  // [ANOTHER REDUCER],
  // [ANOTHER REDUCER]
});

export default rootReducer;
