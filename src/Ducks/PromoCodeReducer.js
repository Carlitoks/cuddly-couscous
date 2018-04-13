import { Events } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { scanQR } from "./EventsReducer";

const ACTIONS = {
  SCAN: "promocode/scan",
  CLEAR: "promocode/clear",
  UPDATE: "promocode/update"
};

export const scanPromoCode = payload => ({
  type: ACTIONS.SCAN,
  payload
});

export const updatePromoCode = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearPromoCode = () => ({
  type: ACTIONS.CLEAR
});

const initialState = {
  scanned: "",
  code: "",
  received: false,
  categories: [],
  scenarios: []
};

export const asyncScanPromoCode = (promoCode, token) => dispatch => {
  return Events.getPromoCode(promoCode, token)
    .then(response => {
      return dispatch(scanQR(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

const promoCodeReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE:
      return {
        ...state,
        ...payload
      };
      break;
    case ACTIONS.SCAN:
      return {
        ...state,
        scanned: payload,
        received: true
      };
      break;
    case ACTIONS.CLEAR:
      return {
        ...state,
        code: ""
      };
      break;
    default: {
      return state;
    }
  }
};

export default promoCodeReducer;
