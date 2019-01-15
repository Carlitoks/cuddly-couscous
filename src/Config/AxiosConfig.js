import axios from "axios";
import { URL } from "./env";
import DeviceInfo from "react-native-device-info";
import { recordApiCall } from "../Util/Forensics";

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

export const MOCK_DATA = {
  USERS: [],
  CALL_HISTORY: {
    AllCalls: [
      {
        key: 1,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/9.jpg"
      },
      {
        key: 2,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/64.jpg"
      },
      {
        key: 3,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      }
    ],
    Missed: [
      {
        key: 1,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
      {
        key: 2,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/women/37.jpg"
      },
      {
        key: 3,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/women/55.jpg"
      }
    ],
    Recents: [
      {
        key: 1,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/9.jpg"
      },
      {
        key: 2,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/64.jpg"
      },
      {
        key: 3,
        title: "Name",
        subtitle: "Duration",
        avatar: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      }
    ]
  }
};

export default client;
