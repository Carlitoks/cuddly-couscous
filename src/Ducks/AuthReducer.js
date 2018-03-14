import { NavigationActions } from "react-navigation";

import { Auth, User, Sessions } from "../Api";

import { loginError } from "./LoginReducer";
import { networkError } from "./NetworkErrorsReducer";

import { clearView as clearUserProfile } from "./UserProfileReducer";
import { clearCallHistory as clearHistory } from "./CallHistoryReducer";
import PushNotification from "../Util/PushNotification";
import { updateDeviceToken } from "./RegistrationCustomerReducer";
import { registerFCM } from "./PushNotificationReducer";
import { changeStatus } from "./ProfileLinguistReducer";

import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { clearSettings } from "./LinguistFormReducer";

// Actions
export const ACTIONS = {
  LOG_IN: "auth/log_in",
  LOG_OUT: "auth/log_out",
  UPDATE: "auth/update"
};

// Action Creators
export const logIn = payload => ({
  type: ACTIONS.LOG_IN,
  payload
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const logOut = payload => ({
  type: ACTIONS.LOG_OUT
});

export const logOutAsync = () => (dispatch, getState) => {
  const { userProfile, auth } = getState();
  // delete device in server
  User.deleteDevice(userProfile.id, auth.deviceId, auth.token)
    .catch(error => dispatch(networkError(error)))
    .finally(res => {
      // cleaning localstorage
      dispatch(changeStatus({ available: false }));
      dispatch(registerFCM({ tokenFCM: null }));
      dispatch(logOut());
      dispatch(clearUserProfile());
      dispatch(clearHistory());
      dispatch({ type: "SelectRoleView/Reset" });
    });
};

// To get userLogin in the splash screen and refresh token
export const haveSession = () => {
  getAsync("userLogin")
    .then(userlogin => {
      if (userlogin) {
        userlogin = JSON.parse(userlogin);
      }
    })
    .catch(error => dispatch(networkError(error)));
};

// Temp Function to create UUID for the phone,
// API not allowing to create several accounts
// on the same phone
uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const registerDevice = () => dispatch => {
  const deviceInfo = {
    deviceOS: Platform.OS,
    deviceOSVersion: Platform.Version.toString(),
    deviceType: DeviceInfo.isTablet() ? "tablet" : "phone",
    id: uuidv4(),
    mobileAppVersion: DeviceInfo.getReadableVersion(),
    name: DeviceInfo.getDeviceName(),
    notificationToken: null
  };

  return Auth.registerDevice(deviceInfo)
    .then(response => {
      dispatch(updateDeviceToken(response.data));
      return dispatch(
        update({
          deviceToken: response.data.token,
          deviceId: deviceInfo.id
        })
      );
    })
    .catch(error => dispatch(networkError(error)));
};

//Reset password
export const resetPasswordAsync = email => dispatch => {
  Auth.resetPassword(email)
    .then(response => {
      // console.log(response.data);
    })
    .catch(error => dispatch(networkError(error)));
};

//Login user
export const logInAsync = (email, password) => async (dispatch, getState) => {
  // Register device
  const { auth } = getState();

  return Auth.login(email, password, auth.deviceToken)
    .then(response => {
      return dispatch(
        logIn({
          token: response.data.token,
          uuid: response.data.id
        })
      );
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(loginError(error.response));
    });
};

// Error log function
const errorLog = (origin, error) => {
  console.log(origin, error);
};

// Initial State
const initialState = {
  isLoggedIn: false,
  token: null,
  uuid: "",
  deviceToken: "",
  deviceId: ""
};

// Reducer
const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        uuid: payload.uuid
      };

    case ACTIONS.UPDATE:
      return {
        ...state,
        ...payload
      };

    case ACTIONS.LOG_OUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
