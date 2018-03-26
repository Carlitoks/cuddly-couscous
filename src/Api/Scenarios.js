import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/scenarios";
const Scenarios = {
  get: token => {
    return AXIOS.get(BASE_URI, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
export default Scenarios;
