import { NavigationActions } from "react-navigation";

// Actions
export const ACTIONS = {
  LOG_IN: "auth/log_in",
  LOG_OUT: "auth/log_in"
};

// Action Creators
export const logIn = payload => ({
  type: ACTIONS.LOG_IN
});

export const logInAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(logIn());
    // console.log(NavigationActions);
    dispatch({ type: "Profile" });
  }, 2000);
};

// Initial State
const initialState = {
  isLoggedIn: false
};

// Reducer
const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        isLoggedIn: true
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};

export default authReducer;
