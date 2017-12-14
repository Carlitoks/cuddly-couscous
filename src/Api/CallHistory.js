import AXIOS, { MOCK_DATA } from "../Config/AxiosConfig";
import Promise from "bluebird"; //for testing emulating axios

const BASE_URI = "/";

//id is userId
const callHistory = {
  getRecents: (id, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var data = MOCK_DATA.CALL_HISTORY.Recents;
        resolve(data);
      }, 2000);
    });
  },
  getMissed: (id, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var data = MOCK_DATA.CALL_HISTORY.Missed;
        resolve(data);
      }, 2000);
    });
  },
  getAll: (id, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var data = MOCK_DATA.CALL_HISTORY.AllCalls;
        resolve(data);
      }, 2000);
    });
  }
};
export default callHistory;
