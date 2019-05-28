import AXIOS from "../Config/AxiosConfig";
import { URL } from "../Config/env";
import RNFetchBlob from "react-native-fetch-blob";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";

const BASE_URI = "/users";

const User = {
  create: (userInfo, token) => {
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

  setPayment: (id, token, stripeSourceToken) => {
    return AXIOS.put(
      `${BASE_URI}/${id}/billing/payment-details`,
      {
        stripeSourceToken: stripeSourceToken
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  removePayment: (id, token) => {
    return AXIOS.delete(`${BASE_URI}/${id}/billing/payment-details`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  setPassword: (id, password, token) => {
    return AXIOS.put(
      `${BASE_URI}/${id}/password`,
      { newPassword: password },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  },

  del: (id, token) => {
    return AXIOS.delete(`${BASE_URI}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  uploadPhoto: (id, image, token) => {
    return AXIOS.delete(`${BASE_URI}/${id}/profile-photo`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
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
    });
  },
  updateDevice: (userId, deviceId, token, payload) => {
    // always update the latest parameters that are determined by the device
    payload.locale = DeviceInfo.getDeviceLocale();
    payload.deviceOSVersion = Platform.Version.toString();
    payload.mobileAppVersion = DeviceInfo.getReadableVersion();

    return AXIOS.patch(`${BASE_URI}/${userId}/devices/${deviceId}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  deleteDevice: (userId, deviceId, token) => {
    return AXIOS.delete(`${BASE_URI}/${userId}/devices/${deviceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  submitFeedback: (userId, token, payload) => {
    return AXIOS.post(`${BASE_URI}/${userId}/customer-feedback`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  updateEmail: (userId, token, payload) => {
    console.log(userId, token, payload, `${BASE_URI}/${userId}/email`);
    return AXIOS.put(`${BASE_URI}/${userId}/email`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default User;
