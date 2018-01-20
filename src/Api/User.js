import AXIOS from "../Config/AxiosConfig";
import { URL } from "../Config/env";
const BASE_URI = "/users";

const User = {
  create: (userInfo, token) => {
    console.log(userInfo, token);
    return AXIOS.post(`${BASE_URI}`, userInfo, {
      headers: { Authorization: `Bearer ${token}` }
    });
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
  },
  /*uploadPhoto: (id, image, token) => {
    return RNFetchBlob.fetch(
      "put",
      `${URL}users/${id}/profile-photo`,
      {
        Authorization: `Bearer ${token}`,

        "Content-Type": "multipart/form-data"
      },
      [
        {
          name: "file",
          filename: "avatar.jpg",
          data: image,
          type: "image/jpg"
        }
      ]
    );
  }*/
};

export default User;