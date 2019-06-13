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

export const uploadFormData = (method, path, formData, progressCB = null) => {
  let cb = function () {}
  if (!!progressCB) {
    cb = function (e) {
      let percent = parseInt( Math.round( ( e.loaded * 100 ) / e.total ) );
      if (progressCB != null) {
        progressCB(percent);
      }
    }
  }

  return getClient()[method.toLowerCase()](path, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
    onUploadProgress: cb
  });

};

// having to rely on RNFetchBlob because I couldn't find a way to actually
// send base64 strings via axios... always resulted in network error, or the
// server not being able to see the file.
export const uploadBase64File = (method, path, fileData, fileName, mime) => {
  let token = getClient().defaults.headers.common['Authorization'];

  return RNFetchBlob.fetch(
    method.toUpperCase(),
    URL+path,
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

/*
// an attempt to convert a base64 data uri to a Blob so it can be
// sent via FormData() with Axios.  It didn't work, but it might be 
// close to working with some tweaks.  Leaving it for now, and may
// remove it at a later date.
const dataURItoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]
  const sliceSize = 1024;
  const byteChars = window.atob(arr[1]);
  const byteArrays = [];

  for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
    let slice = byteChars.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: mime});
};
*/

export default client;
