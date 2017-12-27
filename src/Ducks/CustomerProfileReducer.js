const ACTIONS = {
  CLEAR: "customerProfile/clear",
  UPDATE: "customerProfile/update"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

const initialState = {
  firstName: "",
  firstNameErrorMessage: "",
  lastName: "",
  lastNameErrorMessage: "",
  formHasErrors: false,
  performingRequest: false
};

const customerProfileReducer = (state = initialState, action = {}) => {
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

export default customerProfileReducer;
