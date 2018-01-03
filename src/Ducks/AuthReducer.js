import { NavigationActions } from "react-navigation";

import { Auth, User, Sessions } from "../Api";

import { loginError } from "./LoginReducer";
import { networkError } from "./NetworkErrorsReducer";

import { clearView as clearUserProfile } from "./UserProfileReducer"; 

// Actions
export const ACTIONS = {
  LOG_IN: "auth/log_in",
  LOG_OUT: "auth/log_out" 
};

// Action Creators
export const logIn = payload => ({
  type: ACTIONS.LOG_IN,
  payload
});

export const logOut = payload => ({
  type: ACTIONS.LOG_OUT 
});


export const logOutAsync = () => dispatch => { 
  dispatch(logOut()); 
  dispatch(clearUserProfile()); 
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
export const logInAsync = (email, password) => dispatch => {
  return Auth.login(email, password)
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
  uuid: ""
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

    case ACTIONS.LOG_OUT:
    return { ...initialState }; 

    default:
      return state;
  }
};

export default authReducer;
