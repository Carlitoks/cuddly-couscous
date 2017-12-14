import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/auth";

const Auth = {
  login: (email, password) => {
    return AXIOS.post(`${BASE_URI}/user`, {
      email: email,
      password: password
    });
  },
  //endpoint not Implemented
  resetPassword: (email, token) => {
    return AXIOS.get(`${BASE_URI}/password-reset?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  refreshToken: token => {
    return AXIOS.get(`${BASE_URI}/tokens/${token}`);
  }
};

export default Auth;
