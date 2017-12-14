import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/users";

const User = {
  create: (email, token) => {
    return AXIOS.post(
      `${BASE_URI}`,
      { email: email },
      { headers: { Authorization: token } }
    );
  },

  get: (id, token) => {
    return AXIOS.get(`${BASE_URI}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  update: (id, data, token) => {
    return AXIOS.patch(`${BASE_URI}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  del: (id, token) => {
    return AXIOS.delete(`${BASE_URI}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default User;
