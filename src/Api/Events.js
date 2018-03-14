import AXIOS from "../Config/AxiosConfig";
import { URL } from "../Config/env";
import mockEvent from "./mockEvent";

const BASE_URI = "/events";

const Events = {
  getQR: (eventId, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(mockEvent);
      }, 2000);
    });
  },

  getScan: (eventId, token) => {
    return AXIOS.get(`${BASE_URI}/${eventId}/scan`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getPromoCode: (promoCode, token) => {
    return AXIOS.get(`/event-codes/${promoCode}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default Events;
