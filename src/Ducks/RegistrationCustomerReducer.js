const ACTIONS = {
  CLEAR: "registrationCustomer/clear",
  UPDATE: "registrationCustomer/update",
  ERROR: "registrationCustomer/error"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const errorForm = payload => ({
  type: ACTIONS.ERROR,
  payload
});
const initialState = {
  email: "",
  password: "",
  emailErrorMessage: "",
  passwordErrorMessage: ""
};

const registrationCustomerReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
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

      return { ...state, ...errors };
    }
    default: {
      return state;
    }
  }
};

export default registrationCustomerReducer;
