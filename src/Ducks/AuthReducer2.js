import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import analytics from '@segment/analytics-react-native';
import lodashMerge from "lodash/merge";

import { setAuthToken as setForensicsAuthToken } from "../Util/Forensics";
import api, { setAuthToken as setApiAuthToken } from "../Config/AxiosConfig";

import {
  initializeUser,
  clear as clearAccount,
  init as initAccount,
  initializeDevice
} from "./AccountReducer";
import {
  computePayAsYouGoRate,
} from "./AppConfigReducer";
import { clear as clearCurrentSession } from "./CurrentSessionReducer";
import { clear as clearNewSession } from "./NewSessionReducer";

// deprecated reducers
import { clear as clearOnboarding } from './OnboardingReducer';

// The purpose of this is to manage the core actions of registering a device
// and logging a user in and out.

const initState = () => ({
  isLoggedIn: false,
  deviceJwtToken: null,
  deviceID: null,
  userJwtToken: null,
  userID: null,
  refreshToken: null,
});

// set any initial state and configuration - make sure IDs and
// auth tokens are set where needed
export const init = () => (dispatch, getState) => {
  const { userJwtToken, deviceJwtToken, userID, deviceID } = getState().auth2;
  const jwt = (!!userJwtToken) ? userJwtToken : deviceJwtToken;
  if (!!jwt) {
    setApiAuthToken(jwt);
    setForensicsAuthToken(jwt);
  }
  let account = {};
  if (!!userID) {
    account.userID = userID;
    analytics.identify(userID);
  }
  if (!!deviceID) {
    account.currentDeviceID = deviceID;
  };
  dispatch(initAccount(account));
  return Promise.resolve(true);
};

// create a new device record
export const authorizeNewDevice = () => (dispatch, getState) => {

  // clear all auth state and api keys, because if we're authorizing a new
  // device, any other JWT we have will be invalid
  dispatch(clear());
  setApiAuthToken(null);
  setForensicsAuthToken(null);

  return new Promise((resolve, reject) => {
    let device = {
      deviceOS: Platform.OS,
      deviceOSVersion: Platform.Version.toString(),
      deviceType: DeviceInfo.isTablet() ? "tablet" : "phone",
      mobileAppVersion: DeviceInfo.getReadableVersion(),
      name: DeviceInfo.getDeviceName(),
      locale: DeviceInfo.getDeviceLocale(),
      notificationToken: null
    };

    api.post("/auth/device", device).then((res) => {
      // set auth tokens
      const deviceID = res.data.id;
      const jwt = res.data.token;
      setApiAuthToken(jwt);
      setForensicsAuthToken(jwt);
      dispatch(update({
        deviceID,
        deviceJwtToken: jwt,
      }));
      dispatch(initializeDevice(deviceID));
      dispatch(computePayAsYouGoRate());
      resolve(res.data);
    })
    .catch(reject);
  });
};

// log the user in with their email/password combination
export const logIn = (email, password) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {

    const login = () => {
      api.post("/auth/user", {email, password})
      .then((res) => {
        const userID = res.data.id;
        const jwt = res.data.token;
        setApiAuthToken(jwt);
        setForensicsAuthToken(jwt);
        dispatch(update({
          userID,
          userJwtToken: jwt,
          isLoggedIn: true
        }));
        dispatch(computePayAsYouGoRate());
        return dispatch(initializeUser(userID));
      })
      .then(resolve)
      .catch(reject);
    };

    // if there's no device, ensure one is created first
    const {deviceJwtToken} = getState().auth2;
    if (!!deviceJwtToken) {
      dispatch(authorizeNewDevice()).then(() => { login() });
    } else {
      login();
    }
  });
};

// register a new user and log them in
export const registerNewUser = (user) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const register = () => {
      api.post("/users", user)
      .then((res) => {
        return dispatch(logIn(user.email, user.password))
      })
      .then(resolve)
      .catch(reject)
    };

    // if there's no device yet, create one before trying to register
    const {deviceJwtToken} = getState().auth2;
    if (!!deviceJwtToken) {
      dispatch(authorizeNewDevice()).then(() => {register()});
    } else {
      register();
    }
  });
};

// log out, and clear relevant internal app state
export const logOut = () => (dispatch, getState) => {
  // clear local app state immediately
  dispatch(clear()); // clear own auth state
  dispatch(clearAccount()); // clear account reducer
  dispatch(clearCurrentSession()); // clear current session reducer
  dispatch(clearNewSession()); // clear new session reducer
  dispatch(computePayAsYouGoRate());

  // clear depreacted reducers, TODO: remove this once feasible
  dispatch(clearOnboarding());

  // reconfigure other stuff in the system
  analytics.reset();

  // make the actual logout request to the server
  return new Promise((resolve, reject) => {
    api.get("/auth/logout")
    .finally(() => {
      // clear api auth tokens
      setForensicsAuthToken(null);
      setApiAuthToken(null);      
      // attempt to register a new device immediately
      return dispatch(authorizeNewDevice()).finally(resolve).catch(reject);
    });
  });
};

export const requestPasswordReset = (email) => () => {
  return new Promise((resolve, reject) => {
    api.get(`/auth/password-reset/${email}`).then(resolve).catch(reject);
  });
};

const ACTIONS = {
  CLEAR: "auth2/clear",
  MERGE: "auth2/merge",
  UPDATE: "auth2/update"
};

// action creators
export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

const reducer = (state = null, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }

    case ACTIONS.MERGE: {
      return lodashMerge({}, state || initState(), payload);
    }

    case ACTIONS.UPDATE: {
      return {
        ...state || initState(),
        ...payload
      };
    }

    default: {
      return state || initState();
    }
  }
};

export default reducer;
