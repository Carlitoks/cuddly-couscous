import { combineReducers } from "redux";

import events from "./EventsReducer";
import forgotPassword from "./ForgotPasswordReducer";
import login from "./LoginReducer";
import nav from "./NavigationReducer";
import networkErrors from "./NetworkErrorsReducer";
import networkInfo from "./NetworkInfoReducer";
import payments from "./PaymentsReducer";
import profileLinguist from "./ProfileLinguistReducer";
import promoCode from "./PromoCodeReducer";
import resetPassword from "./ResetPasswordReducer";
import sessionInfo from "./SessionInfoReducer";
import settings from "./SettingsReducer";
import newSessionReducer from "./NewSessionReducer";
import onboardingReducer from "./OnboardingReducer";
import appConfigReducer from "./AppConfigReducer";
import account from "./AccountReducer";
import appState from "./AppStateReducer";
import LogicReducer from "./LogicReducer";
import currentSessionReducer from "./CurrentSessionReducer";
import auth2 from "./AuthReducer2";

// Combine all the reducers
const rootReducer = combineReducers({
  appConfigReducer,
  events,
  forgotPassword,
  login,
  nav,
  networkErrors,
  networkInfo,
  payments,
  profileLinguist,
  promoCode,
  resetPassword,
  sessionInfo,
  settings,
  userProfile,
  newSessionReducer,
  onboardingReducer,
  LogicReducer,
  currentSessionReducer,
  account,
  appState,
  auth2
});

export default rootReducer;
