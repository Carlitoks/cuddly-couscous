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

  // put here the properly url when we have this endpoint

  // getRecents: (id, token) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       var data = MOCK_DATA.CALL_HISTORY.Recents;
  //       resolve(data);
  //     }, 2000);
  //   });
  // },
};
export default callHistory;
