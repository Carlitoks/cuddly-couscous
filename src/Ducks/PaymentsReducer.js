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
  cardInfo: { number: "", expMonth: "", expYear: "", cvc: "" },
  loading: false,
  errors: [],
  isValidCC: false,
  isValidDate: false,
  isValidCVV: false
};

export const setPayment = stripeSourceToken => (dispatch, getState) => {
  const {
    userProfile: { id },
    auth: { token }
  } = getState();

  return User.setPayment(id, token, stripeSourceToken).then(response => {
    const { stripeCustomerID, stripePaymentToken } = response.data;
    dispatch(updateView({ stripeCustomerID, stripePaymentToken }));
  });
};

export const removePayment = _ => (dispatch, getState) => {
  const {
    userProfile: { id },
    auth: { token }
  } = getState();

  return User.removePayment(id, token).then(response => {
    dispatch(updateView({ stripePaymentToken: null }));
  });
};

export const changePayment = stripeSourceToken => (dispatch, getState) => {
  const {
    userProfile: { id },
    auth: { token }
  } = getState();

  return User.removePayment(id, token)
    .then(response => {
      console.log("response del remove", response);
      console.log("remove");
      dispatch(updateView({ stripePaymentToken: null }));
    })
    .then(response => {
      console.log("response del set", response);
      console.log("set");
      User.setPayment(id, token, stripeSourceToken).then(response => {
        const { stripeCustomerID, stripePaymentToken } = response.data;
        dispatch(updateView({ stripeCustomerID, stripePaymentToken }));
      });
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
