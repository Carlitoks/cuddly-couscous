import AXIOS from "../Config/AxiosConfig";

const BASE_URI = "/auth";

const Auth = {
  login: (email, password, token) => {
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return AXIOS.post(
      `${BASE_URI}/user`,
      {
        email: email,
        password: password
      },
      token ? headers : undefined
    );
  },

  //endpoint not Implemented
  resetPassword: (email, token) => {
    return AXIOS.get(`${BASE_URI}/password-reset?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  refreshToken: token => {
    return AXIOS.get(`${BASE_URI}/tokens/${token}`);
  },

  registerDevice: deviceInfo => {
    return AXIOS.post(`${BASE_URI}/device`, {
      ...deviceInfo
    });
  }
};

export default Auth;
