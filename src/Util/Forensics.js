import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getClient} from "../Config/AxiosConfig";

// list of events to send to the server in the next
// batch that gets flushed
let events = [];
let lastFlushed = null;
let version = null;
let authToken = false;

export const setAuthToken = (str) => {
  authToken = str;
};

const record = (evt) => {
  evt.createdAt = new Date().getTime();
  evt.meta = {
    mobileAppVersion: version
  };
  events.push(evt);
};

export const recordSessionEvent = (name, payload) => {
  record({
    event: 'session.'+name,
    payload
  })
}

export const recordSessionTokboxEvent = (name, payload) => {
  record({
    event: 'session.tokbox.'+ name,
    payload
  });
};

export const recordApiCall = (method, path) => {
  record({
    event: 'api.call',
    payload: {method, path}
  });
}

export const recordApiError = (method, path, payload = {}) => {
  record({
    event: 'api.error',
    payload: {
      method,
      path,
      ...payload
    }
  });
};

export const recordAppError = (payload) => {
  record({
    event: 'app.error',
    payload
  });

  // send these up immediately in case the error encountered
  // is one that could prevent other things from being processed - such
  // as white-screen-of-death errors
  flushEvents();
};

export const recordAppStateEvent = (from, to) => {
  record({
    event: 'app.state',
    payload: {
      from,
      to
    }
  });
};

export const recordNavigationEvent = (to) => {
  record({
    event: 'app.nav',
    payload: {to}
  });
};

// load any events from storage
export const init = async () => {
  try {
    version = DeviceInfo.getReadableVersion();
    const serializedState = await AsyncStorage.getItem("solo.forensics");
    events = [];
    if (!!serializedState) {
      events = JSON.parse(serializedState);
    }
  } catch (err) {
    console.log('error loading forensics', err);
  }
};

// persist events to storage
export const persist = async () => {
  await AsyncStorage.setItem('solo.forensics', JSON.stringify(events));
};

export const flushEvents = () => {
  if (events.length == 0 || !authToken) {
    return;
  }
  const now = new Date().getTime();
  record({
    event: 'app.forensics',
    payload: {
      current: now,
      lastFlushed: (!!lastFlushed) ? lastFlushed.getTime() : null,
      numEvents: events.length
    }
  });

  try {
    let api = getClient();
    api.post("/forensics", {
      sentAt: now,
      events: events
    }, {
      headers: {
        'Authorization': "Bearer " + authToken
      }
    }).then(() => {
      events = [];
      lastFlushed = new Date();
    }).catch(() => {
      recordApiError("POST", "/forensics");
    });
  } catch (e) {
    console.log('oh dear, failed on forensics', e);
  }
};
