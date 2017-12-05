// WIP - Can be rewritten

// Actions
export const ACTIONS = {
  LOG_IN: "auth/log_in"
};

const initialState = { isLoggedIn: false };

function auth(state = initialState, action) {
  switch (action.type) {
    case "Login":
      return { ...state, isLoggedIn: true };
    case "Logout":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}
