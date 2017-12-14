import { NavigationActions } from "react-navigation";

import { saveAsync, getAsync } from "../Config/LocalStorage";
import { Auth, User, Sessions } from "../Api";

// Actions
export const ACTIONS = {
  LOG_IN: "auth/log_in",
  LOG_OUT: "auth/log_in"
};

// Action Creators
export const logIn = payload => ({
  type: ACTIONS.LOG_IN,
  payload
});

export const logOut = payload => ({
  type: ACTIONS.LOG_OUT,
  payload
});

///To get userLogin in the splash screen and refresh token
export const haveSession = () => dispatch => {
  getAsync("userLogin").then(userlogin => {
    if (userlogin) {
      userlogin = JSON.parse(userlogin);
      Auth.refreshToken(userlogin.token).then(response => {
        const data = response.data;

        userlogin.token = data.token;
        saveAsync("userLogin", userlogin, true).then(err => {
          dispatch(logIn(userlogin));
          dispatch({ type: "Home" });
        });
      });
    }
  });
};
//Reset password
export const resetPasswordAsync = (email, callback) => dispatch => {
  Auth.resetPassword(email)
    .then(response => {
      // console.log(response.data);
      callback();
    })
    .catch(error => {
      // console.log(error);
      callback(error);
    });
};
//Login user
export const logInAsync = (email, password) => dispatch => {
  Auth.login(email, password)
    .then(response => {
      // console.log(response);

      const data = response.data;
      const token = data.token;
      saveAsync("userLogin", data, true);
      dispatch(logIn(data));
      let sessionID;
      let CustomerTokboxSessionID;
      let CustomerTokboxSessionToken;
      let LinguistTokboxSessionID;
      let LinguistTokboxSessionToken;
      let invitationID;
      Sessions.createSession(
        "immediate_virtual",
        "manual",
        "eng",
        "cmn",
        20,
        token
      )
        .then(response => {
          const data = response.data;
          sessionID = data.sessionID;
          CustomerTokboxSessionID = data.tokboxSessionID;
          CustomerTokboxSessionToken = data.tokboxSessionToken;

          Sessions.customerInvitation(
            sessionID,
            "11111111-1111-1111-1111-111111111111",
            "linguist",
            token
          )
            .then(response => {
              const data = response.data;
              invitationID = data.invitationID;
              Sessions.LinguistFetchesInvite(invitationID, token).then(
                response => {
                  Sessions.LinguistAcceptsInvite(invitationID, true, token)
                    .then(response => {
                      const data = response.data;
                      console.log("data", data);
                      console.log({
                        sessionID: sessionID,
                        CustomerTokboxSessionID: CustomerTokboxSessionID,
                        CustomerTokboxSessionToken: CustomerTokboxSessionToken,
                        LinguistTokboxSessionID: data.tokboxSessionID,
                        LinguistTokboxSessionToken: data.tokboxSessionToken
                      });
                    })
                    .catch(errorLog);
                }
              );

              dispatch({ type: "Home" });
            })
            .catch(errorLog);
        })
        .catch(errorLog);

      // dispatch({ type: "Home" });
    })
    .catch(function(error) {
      errorLog(error);
      dispatch(logOut());
    });
};
const errorLog = error => {
  console.log(error);
  console.log({
    config: error.config,
    request: error.request,
    response: error.response
  });
  if (error.data) console.log(error.data);
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
        uuid: payload.id
      };

    case ACTIONS.LOG_OUT:
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
};

export default authReducer;
