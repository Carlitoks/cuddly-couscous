const ACTIONS = {
  CLEAR: "networkErrors/clear",
  ERROR: "networkErrors/error"
};

export const clearError = () => ({
  type: ACTIONS.CLEAR
});

export const networkError = error => ({
  type: ACTIONS.ERROR,
  payload: error
});

const initialState = {
  errors: null
};

const networkErrors = (state = initialState, action = {}) => {
  const { payload, type } = action;
  const errors = {};
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.ERROR: {
      if (payload.request._hasError) {
        return {
          ...state,
          errors: payload.request._response
        };
      } else if (payload) {
        console.log(payload);
        return {
          ...state,
          errors: payload
        };
      }
    }

    default: {
      return state;
    }
  }
};

export default networkErrors;
