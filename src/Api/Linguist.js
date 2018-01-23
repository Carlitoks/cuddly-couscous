import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/linguist-profile";

const Linguist = {
  create: (id, token, payload) => {
    return AXIOS.put(`/users/${id}${BASE_URI}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  update: (id, token, payload) => {
    return AXIOS.patch(`/users/${id}${BASE_URI}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  langUpdate: (id, langCode, token, payload) => {
    return AXIOS.put(`/users/${id}${BASE_URI}/languages/${langCode}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  langRemove: (id, langCode, token) => {
    return AXIOS.delete(`/users/${id}${BASE_URI}/languages/${langCode}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default Linguist;
