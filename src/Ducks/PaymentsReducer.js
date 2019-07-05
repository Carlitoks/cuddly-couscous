
// Actions
export const ACTIONS = {
  CLEAR: "payments/clear",
  UPDATE: "payments/update"
};

// Action Creator
export const updatePayments = payload => {
  return {
    type: ACTIONS.UPDATE,
    payload
  };
};

export const clearPayments = () => ({
  type: ACTIONS.CLEAR
});

// Initial State
const initialState = {
  displayCardField: false,
  cardInfo: { number: "", expMonth: "", expYear: "", cvc: "" },
  expDate: "",
  loading: false,
  errors: [],
  isValidCC: false,
  isValidDate: false,
  isValidCVV: false
};

// Reducer
const paymentsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};

export default paymentsReducer;
