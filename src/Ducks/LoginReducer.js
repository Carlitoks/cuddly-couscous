const ACTIONS = {
  CLEAR: "login/clear",
  UPDATE: "login/update",
  ERROR: "login/error"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const loginError = error => ({
  type: ACTIONS.ERROR,
  payload: error
});

const initialState = {
  email: "",
  password: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
  formHasErrors: false,
  performingRequest: false
};

const loginReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    case ACTIONS.ERROR: {
      const errors = {};

      switch (payload.data.errors[0]) {
        case "Email not found":
          errors.emailErrorMessage = "User not found";
          errors.formHasErrors = true;
          break;

        case "Password incorrect":
          errors.passwordErrorMessage = "Invalid password";
          errors.formHasErrors = true;
          break;

        default:
      }

      return {
        ...state,
        ...errors
      };
    }

    default: {
      return state;
    }
  }
};

export default loginReducer;
