import axios from "axios";
import { URL } from "./env";
import DeviceInfo from "react-native-device-info";
import { recordApiCall } from "../Util/Forensics";
import RNFetchBlob from "react-native-fetch-blob";

const createClient = () => {
  // create instance
  let a = axios.create({
    baseURL: URL,
    headers: {
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      accept: "application/json",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Content-Type": "application/json",
      "X-Solo-Mobile-Version": DeviceInfo.getReadableVersion()
    },
    timeout: 30000
  });

  // add interceptor to record event for all api calls
  a.interceptors.request.use(function (config) {
    recordApiCall(config.method.toUpperCase(), config.url);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  return a;
}

let client = createClient();

export const getClient = () => {
  return client;
}

// NOTE: this does not work as expected for some reason - but it's exactly the same approach
// I took in the web app, which works as expected
export const setAuthToken = (str) => {
  if (str == null) {
    delete client.defaults.headers.common['Authorization'];
  } else {
    client.defaults.headers.common['Authorization'] = 'Bearer ' + str;
  }
};

export const uploadFile = (method, path, fileData, fileName, mime) => {
  let token = client.defaults.headers.common['Authorization'];
  return RNFetchBlob.fetch(
    method,
    path,
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
    [
      {
        name: "file",
        filename: fileName,
        data: fileData,
        type: mime
      }
    ]
  );
};

export default client;
