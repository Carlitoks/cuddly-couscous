import { NavigationActions } from "react-navigation";

import { Auth, User, Sessions } from "../Api";

import { loginError } from "./LoginReducer";
import { networkError } from "./NetworkErrorsReducer";

import { clearView as clearUserProfile } from "./UserProfileReducer";
import { clearCallHistory as clearHistory } from "./CallHistoryReducer";

import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

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

export const logOutAsync = () => dispatch => {
  dispatch(logOut());
  dispatch(clearUserProfile());
  dispatch(clearHistory());
  dispatch({ type: "SelectRoleView/Reset" });
};

// To get userLogin in the splash screen and refresh token
export const haveSession = () => {
  getAsync("userLogin")
    .then(userlogin => {
      console.log("->", userlogin);

      if (userlogin) {
        userlogin = JSON.parse(userlogin);

        /*
      Auth.refreshToken(userlogin.token).then(response => {
        const data = response.data;

        userlogin.token = data.token;

          dispatch(logIn(userlogin));
          dispatch({ type: "Home" });

      });

      */
      }
    })
    .catch(e => console.log(e));
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
    /*id:
      Platform.OS === "ios"
        ? DeviceInfo.getUniqueID()
        : androidDeviceIDToPseudoUUID(DeviceInfo.getUniqueID()),*/
    id: uuidv4(),
    mobileAppVersion: DeviceInfo.getReadableVersion(),
    name: DeviceInfo.getDeviceName(),
    notificationToken: "string"
  };
  console.log("device info: ", deviceInfo);
  return Auth.registerDevice(deviceInfo)
    .then(response => {
      return dispatch(
        update({
          deviceToken: response.data.token
        })
      );
    })
    .catch(err => dispatch(networkError(err)));
};

//Reset password
export const resetPasswordAsync = email => dispatch => {
  Auth.resetPassword(email)
    .then(response => {
      // console.log(response.data);
    })
    .catch(error => {
      // console.log(error);
    });
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
  deviceToken: ""
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
