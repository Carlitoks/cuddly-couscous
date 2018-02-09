import axios from "axios";
import { URL } from "./env";

// TODO: Configure Timeout
const AXIOS = axios.create({
  baseURL: URL,
  headers: {
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    accept: "application/json",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

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

export default AXIOS;
