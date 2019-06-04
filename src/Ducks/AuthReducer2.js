import { Platform, DeviceInfo } from "react-native";
import { setAuthToken as setForensicsAuthToken } from "../Util/Forensics";
import api, { setAuthToken as setApiAuthToken } from "../Config/AxiosConfig";

import { initializeUser, clear as clearAccount } from "./AccountReducer";
import { clear as clearCurrentSession } from "./CurrentSessionReducer";
import { clear as clearNewSession } from "./NewSessionReducer";

// deprecated reducers
import { clearView as clearUserProfile } from "./UserProfileReducer";
import { clearSettings as clearHomeFlow } from "./HomeFlowReducer";
import { clearCallHistory } from "./CallHistoryReducer";
import { clear as clearOnboarding } from './OnboardingReducer';
import { clearSettings as clearLinguistProfile } from "./ProfileLinguistReducer";

import PushNotification from "../Util/PushNotification";
import analytics from '@segment/analytics-react-native'

// The purpose of this is to manage the core actions of registering a device
// and logging a user in and out.

const initState = () => ({
  deviceJwtToken: null,
  deviceID: null,
  userJwtToken: null,
  userID: null,
  refreshToken: null,
});

// set any initial state and configuration if relevant
export const init = () => (dispatch, getState) => {
  const { userJwtToken, deviceJwtToken } = getState().auth2;
  // TODO: check state from old auth reducer
  const jwt = (!!userJwtToken) ? userJwtToken : deviceJwtToken;
  if (!!jwt) {
    setApiAuthToken(jwt);
    setForensicsAuthToken(jwt);
  }
  return Promise.resolve(true);
};

// create a new device record, managing
export const authorizeNewDevice = () => (dispatch, getState) => {
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

    // TODO: push notification setup
    //  * create FCM token
    //  * if that failed, create Pushy token

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

      // TODO: init push notification stuff, and update the device
      // import { registerFCM, addListeners } from "./PushNotificationReducer";


      resolve(res.data);
    })
    .catch(reject);
  });
};

// log the user in with their email/password combination
export const logIn = (email, password) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.post("/auth/user", {email, password})
    .then((res) => {
      const userID = res.data.id;
      const jwt = res.data.token;
      setApiAuthToken(jwt);
      setForensicsAuthToken(jwt);
      dispatch(update({
        userID,
        UserJwtToken: jwt,
      }));
      return dispatch(initializeUser(userID));
    })
    .catch(reject);
  });
};

// log out, and clear relevant internal app state
export const logOut = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.get("/auth/logout")
    .then(() => {
      resolve(true);
    })
    .catch(reject)
    .finally(() => {
      // clear local app state, regardless of success of logout request
      dispatch(clear()); // clear own auth state
      dispatch(clearAccount()); // clear account reducer
      dispatch(clearCurrentSession()); // clear current session reducer
      dispatch(clearNewSession()); // clear new session reducer

      // clear depreacted reducers, TODO: remove this once feasible
      dispatch(clearUserProfile());
      dispatch(clearHomeFlow());
      dispatch(clearCallHistory());
      dispatch(clearLinguistProfile());
      dispatch(clearOnboarding());

      // reconfigure other stuff in the system
      analytics.reset();
      // TODO: push notification stuff?  Does it need to stay here?
      PushNotification.cleanListeners();
    });
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
