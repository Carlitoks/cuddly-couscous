import User from "../Api/User";
import { updateView } from "./UserProfileReducer";
// Constants

// Actions
export const ACTIONS = {
  CLEAR: "payments/clear",
  UPDATE: "payments/update"
};

// Action Creator
export const updatePayments = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearPayments = () => ({
  type: ACTIONS.CLEAR
});

// Initial State
const initialState = {
  displayCardField: false,
  cardInfo: {},
  loading: false
};

export const setPayment = stripeSourceToken => (dispatch, getState) => {
  const {
    userProfile: { id },
    auth: { token }
  } = getState();

  User.setPayment(id, token, stripeSourceToken)
    .then(response => {
      const { stripeCustomerID, stripePaymentToken } = response.data;
      dispatch(updateView({ stripeCustomerID, stripePaymentToken }));
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    });
};

export const removePayment = _ => (dispatch, getState) => {
  const {
    userProfile: { id },
    auth: { token }
  } = getState();

  User.removePayment(id, token)
    .then(response => {
      dispatch(updateView({ stripePaymentToken: null }));
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    });
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
