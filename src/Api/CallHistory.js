import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/";

//id is userId
const callHistory = {
  // call of customer

  getAllCustomerCalls: (userId, token) => {
    return AXIOS.get(`/users/${userId}/sessions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // call of linguist

  getAllLinguistCalls: (userId, token) => {
    return AXIOS.get(`/users/${userId}/linguist-profile/sessions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getMissedLinguistCalls: (userId, token) => {
    return AXIOS.get(
      `/users/${userId}/linguist-profile/session-invitations?status=missed`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }
};
export default callHistory;
