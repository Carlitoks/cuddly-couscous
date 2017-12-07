const ACTIONS = {
  CLEAR: "registrationCustomer/clear",
  UPDATE: "registrationCustomer/update"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
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
      return {
        ...state,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
};

export default registrationCustomerReducer;
