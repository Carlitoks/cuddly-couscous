// The purpose of this is to manage all state about the user who
// is logged in and using the app
import { DeviceInfo, Platform } from "react-native";
import lodashMerge from 'lodash/merge';
import moment from "moment";
import { CACHE } from '../Config/env';
import api from "../Config/AxiosConfig";
import { getGeolocationCoords } from "../Util/Helpers";

// base api url - requires initializing a user in order to be set
let apiURL = "";

const initState = () => ({
  // info about users active device, or info derived
  // from the users device
  currentDeviceUpdateAt: null,
  currentDeviceID: null,
  currentDevice: {},
  isTravelling: false,

  // info about the current user, or dericved directly from the current user
  userID: null,
  userLoadedAt: null,
  user: {}, // exact data structure from api: GET /users/{id}
  isLinguist: false, // meaning, are they at any stage of becoming a linguist?
  isActiveLinguist: false, // meaning, can they actually accept calls?
  isPropspectiveLinguist: false, // are they registered to become a linguist, but not yet active?
  linguistProfile: {},

  // based on subscriptionPeriods
  subscriptionPeriodsLoadedAt: null,
  subscriptionPeriods: [],
  hasUnlimitedUse: false,
  hasUnlimitedUseUntil: false,

  // calls the user made as a customer
  customerCallHistoryLoadedAt: null,
  customerCallHistory: [],

  // calls the user received as a linguist
  linguistCallHistoryLoadedAt: null,
  linguistCallHistory: [],

  // minute packages available for purchase by the user
  availableMinutePackagesLoadedAt: null,
  availableMinutePackages: []
});

// given a user, do they have unlimited use right now based on
// any active subscription periods?
//
// note, this one is not a reducer function, just a convenience
// mechanism used internally, but can also be used elswhere
export const hasUnlimitedUseUntil = (periods) => {
  periods = periods || [];
  if (periods.length == 0) {
    return false;
  }


  const now = moment();
  for (var p of periods) {
    const begin = moment(p.beginAt);
    const end = moment(p.endAt);
    if (p.unlimitedUse) {
      if (begin.isBefore(now) && end.isAfter(now)) {
        return end;
      }
    }
  }

  return false;
}

// load the users device
export const initializeDevice = (deviceID) => (dispatch, getState) => {
  dispatch(update({
    currentDevice: null,
    currentDeviceID: deviceID,
    currentDeviceUpdateAt: null
  }));
  return new Promise((resolve, reject) => {
    api.get(`/user-devices/${deviceID}`)
    .then((res) => {
      dispatch(update({
        currentDevice: res.data,
        currentDeviceUpdateAt: new Date('now').getTime()
      }));
    })
    .catch(reject)
  });
};

// refresh the users device, only updating fields that
// are determined by the physical device
export const refreshDevice = (force = false) => (dispatch, getState) => {
  return dispatch(updateDevice());
};

// update any fields on the users device, some fields are set
// automatically
export const updateDevice = (payload = null) => (dispatch, getState) => {
  payload = payload || {};
  payload.locale = DeviceInfo.getDeviceLocale();
  payload.deviceOSVersion = Platform.Version.toString();
  payload.mobileAppVersion = DeviceInfo.getReadableVersion();

  // enforce some values on the device
  return new Promise((resolve, reject) => {
    // always update the current location
    getGeolocationCoords()
    .then((res) => {
      payload.lastGeoPoint = [res.coords.longitude, res.coords.latitude];
    })
    .finally(() => {
      const {currentDeviceID} = getState().account;
      return api.patch(`${apiURL}/devices/${currentDeviceID}`, payload)
    })
    .then((res) => {
      dispatch(update({
        currentDevice: res.data,
        currentDeviceUpdateAt: new Date('now').getTime()
      }));
    })
    .catch(reject)
  });
};

// clear and reload user data from server
export const initializeUser = (userID) => (dispatch, getState) => {
  const {currentDevice, currentDeviceID} = getState().account;
  dispatch(clear());
  dispatch(update({userID, currentDevice, currentDeviceID}));
  apiURL = `/users/${userID}`;
  dispatch(loadUser(false)); // force reload the user
}

// set the user object, and recalculate any fields derived
// from the user
export const setUser = (user) => (dispatch, getState) => {
  const now = new Date();
  let d = {user};
  d.userID = user.id;
  d.userLoadedAt = now.getTime();
  apiURL = `/users/${user.id}`;
  d.linguistProfile = !!user.linguistProfile ? user.linguistProfile : null;
  d.isLinguist = !!d.linguistProfile;
  if (!!user.subscriptionPeriods && user.subscriptionPeriods.length > 0) {
    d.subscriptionPeriods = user.subscriptionPeriods;
    d.subscriptionPeriodsLoadedAt = now.getTime();
    unlimitedUseUntil = hasUnlimitedUseUntil(user.subscriptionPeriods);
    if (unlimitedUseUntil !== false) {
      d.hasUnlimitedUse = true;
      d.hasUnlimitedUseUntil = unlimitedUseUntil;
    }
  }
  
  // TODO: process feature flags for active/prospective linguist

  // TEMPORARY: TODO: set user state in deprecated userProfile reducer

  dispatch(merge(d));
}

// fetch user from server, use cache object by default
export const loadUser = (useCache = true) => (dispatch, getState) => {
  const {user, userLoadedAt} = getState().account;
  return new Promise((resolve, reject) => {
    if (useCache && !!user && new Date().getTime() < userLoadedAt + CACHE.USER) {
      resolve(user);
      return;
    }
    api.get(apiURL)
    .then((res) => {
      dispatch(setUser(res.data));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// update any fields on the user
export const updateUser = (payload) = (dispatch, getState) => {

};

// load users currently active subscription periods
export const loadActiveSubscriptionPeriods = (useCache = true) => (dispatch, getState) => {
  const {subscriptionPeriods, subscriptionPeriodsLoadedAt} = getState().account;
  return new Promise((resolve, reject) => {
    if (useCache && !!subscriptionPeriods && new Date().getTime() < subscriptionPeriodsLoadedAt + CACHE.SUBSCRIPTIONS) {
      resolve(subscriptionPeriods);
      return;
    }
    api.get(apiURL+"/billing/subscription-periods?active=true")
    .then((res) => {
      const unlimitedUseUntil = hasUnlimitedUseUntil(res.data);
      dispatch(merge({
        subscriptionPeriods: res.data || [],
        subscriptionPeriodsLoadedAt: new Date().getTime(),
        hasUnlimitedUse: unlimitedUseUntil !== false,
        hasUnlimitedUseUntil: unlimitedUseUntil
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

const ACTIONS = {
  UPDATE: 'account/update', // set the state
  MERGE: 'account/merge', // merge in nested updates to state
  CLEAR: 'account/clear' // reset state to initial state
}

export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

const reducer = (state = null, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state || initState(),
        ...payload
      }
    }

    case ACTIONS.MERGE: {
      return lodashMerge({}, state || initState(), payload);
    }

    case ACTIONS.CLEAR: {
      return initState();
    }

    default: {
      return state || initState();
    }
  }
};

export default reducer;
