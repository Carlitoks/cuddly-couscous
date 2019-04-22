const ACTIONS = {
  CLEAR: "resetPassword/clear",
  UPDATE: "resetPassword/update"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

const initialState = {
  password: "",
  confirmPassword: "",
  formHasErrors: false
};

const resetPasswordReducer = (state = initialState, action = {}) => {
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

export default resetPasswordReducer;
