import AXIOS from "../Config/AxiosConfig";
import { URL } from "../Config/env";
import mockEvent from "./mockEvent"

const BASE_URI = "/events";

const Events = {  

  getQR: (eventId, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(mockEvent);
      },2000 );
    })
  },

  getScan: (eventId, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(mockEvent);
      },2000 );
    })
  }
}

export default Events;
