// The purpose of this is to manage all state about the user who
// is logged in and using the app
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import lodashMerge from 'lodash/merge';
import moment from "moment";
import FCM from "react-native-fcm";
import isEmpty from "lodash/isEmpty";

import { CACHE } from '../Config/env';
import api, { uploadFormData, uploadBase64File } from "../Config/AxiosConfig";
import { getGeolocationCoords } from "../Util/Helpers";
import analytics from "@segment/analytics-react-native";
import branch from "react-native-branch";

// base api url - requires initializing a user in order to be set
let apiURL = "";

const initState = () => ({
  // info about users active device, or info derived
  // from the users device
  currentDeviceUpdateAt: null,
  currentDeviceID: null,
  currentDevice: null,
  isTravelling: false,

  // info about the current user, or dericved directly from the current user
  userID: null,
  user: null, // exact data structure from api: GET /users/{id}
  userLoadedAt: null, // last time user was reloaded from server
  userAvatarURL: null, // processed URL with cache control already set
  isLinguist: false, // meaning, are they at any stage of becoming a linguist?
  isActiveLinguist: false, // meaning, can they actually accept calls?
  isPropspectiveLinguist: false, // are they registered to become a linguist, but not yet active?
  linguistProfile: null,

  // based on subscriptionPeriods
  subscriptionPeriodsLoadedAt: null,
  subscriptionPeriods: [],
  hasUnlimitedUse: false,
  hasUnlimitedUseUntil: false,

  // user may have a minute package that reloads, or
  // a recurring subscription
  autoreloadMinutePackage: null,
  subscribedMinutePackage: null,

  // calls the user made as a customer
  customerCallHistoryLoadedAt: null,
  customerCallHistory: [],

  // calls the user received as a linguist
  linguistCallHistoryLoadedAt: null,
  linguistCallHistory: [],

  // calls received, but missed by the linguist
  linguistMissedCallHistoryLoadedAt: null,
  linguistMissedCallHistory: [],

  // minute packages available for purchase by the user. if
  // a promo code was used to load them, it may contain packages
  // only visible because of the promo code, or have applied discounts
  // to specific packages
  minutePackagesLoadedAt: null,
  minutePackages: [],

  // a promocode for minute packages, it may apply discounts
  // to existing packages, or make new packages available to see
  minutePackagePromoCode: null
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

// init key fields and set the api url if necessary
export const init = (payload) => (dispatch, getState) => {
  dispatch(update(payload));
  if (!!payload.userID) {
    apiURL = `/users/${payload.userID}`;
  }
};

// load the users device
export const initializeDevice = (deviceID) => (dispatch, getState) => {
  dispatch(update({
    currentDevice: null,
    currentDeviceID: deviceID,
    currentDeviceUpdateAt: null
  }));
  return dispatch(refreshDevice(true));
};

// refresh the users device, only updating fields that
// are determined by the physical device, and ensures a push
// notification token is set
export const refreshDevice = (force = false) => (dispatch, getState) => {
  const device = getState().account.currentDevice || {};
  // enforce some values on the device
  let payload = {
    locale: DeviceInfo.getDeviceLocale(),
    deviceOSVersion: Platform.Version.toString(),
    mobileAppVersion: DeviceInfo.getReadableVersion()
  };

  // some device fields must be set async
  let promises = [
    getGeolocationCoords().then((res) => {
      payload.lastGeoPoint = [res.coords.longitude, res.coords.latitude];
    })
  ];

  // ensure we have a push notification token if not already set
  if (force || (!device.notificationToken && !device.pushyNotificationToken)) {
    promises.push(FCM.getFCMToken().then((token) => {
      payload.notificationToken = token;
    }).catch(() => {
      if (!device.pushyNotificationToken) {
        // TODO: create Pushy token if FCM fails
      }
    }));
  }

  // update the device
  return Promise.all(promises).finally(() => { return dispatch(updateDevice(payload)) });
};

// update user device with specified fields
export const updateDevice = (payload = null) => (dispatch, getState) => {
  const {currentDeviceID} = getState().account;
  return new Promise((resolve, reject) => {
    api.patch(`/devices/${currentDeviceID}`, payload)
    .then((res) => {
      dispatch(update({
        currentDevice: res.data,
        currentDeviceUpdateAt: new Date('now').getTime()
      }));
      resolve(res.data);
    })
    .catch(reject)
  });
};

// clear and reload user data from server
export const initializeUser = (userID) => (dispatch, getState) => {
  const {
    currentDevice,
    currentDeviceID,
    user,
    userLoadedAt,
    userAvatarURL,
    isLinguist,
    isActiveLinguist,
    isPropspectiveLinguist,
    linguistProfile,
  } = getState().account;
  apiURL = `/users/${userID}`;

  // clear all account data
  dispatch(clear());

  // restore some items, because we can't let the user ref be null if has
  // been recovered from storage - it gets referenced in too many places
  // currently, and this will cause other errors.
  //
  // this is primarily the data that's set via `setUser`
  dispatch(update({
    currentDevice,
    currentDeviceID,
    userID,
    user,
    userLoadedAt,
    userAvatarURL,
    isLinguist,
    isActiveLinguist,
    isPropspectiveLinguist,
    linguistProfile,
  }));

  if(userID && currentDeviceID){
    analytics.identify(userID, {deviceID: currentDeviceID});
    branch.setIdentity(userID);
  }

  return dispatch(loadUser(false)); // force reload the user
};

// set the user object, and recalculate any fields derived
// from the user
export const setUser = (user) => (dispatch, getState) => {
  apiURL = `/users/${user.id}`;
  const now = new Date();
  let d = {user};
  d.userID = user.id;
  d.userLoadedAt = now.getTime();
  if(!d.user.stripePaymentToken){
    d.user.stripePaymentToken = null;
    d.user.StripePaymentSourceMeta = isEmpty(d.user.StripePaymentSourceMeta) ? null : d.user.StripePaymentSourceMeta;
  }
  d.linguistProfile = !!user.linguistProfile ? user.linguistProfile : null;
  d.isLinguist = !!d.linguistProfile;
  if (!!user.avatarURL) {
    d.userAvatarURL = user.avatarURL+"?"+(new Date('now')).getTime();
  }
  if (!!user.subscriptionPeriods && user.subscriptionPeriods.length > 0) {
    d.subscriptionPeriods = user.subscriptionPeriods;
    d.subscriptionPeriodsLoadedAt = now.getTime();
    unlimitedUseUntil = hasUnlimitedUseUntil(user.subscriptionPeriods);
    if (unlimitedUseUntil !== false) {
      d.hasUnlimitedUse = true;
      d.hasUnlimitedUseUntil = unlimitedUseUntil;
    }
  }
  d.autoreloadMinutePackage = user.autoreloadMinutePackage || null;
  d.subscribedMinutePackage = user.subscribedMinutePackage || null;

  // ensure linguist profile availability is actually set
  if (!!d.linguistProfile) {
    d.linguistProfile.available = !!d.linguistProfile.available;
  }

  // TODO: process feature flags for active/prospective linguist

  // TEMPORARY: TODO: set user state in deprecated userProfile reducer
  dispatch(update(d));
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
export const updateUser = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.patch(apiURL, payload)
    .then((res) => {
      dispatch(setUser(res.data));
      resolve(res.data);
    })
    .catch(reject);
  });
};

export const updateUserProfilePhoto = (base64Data, progressCB = null) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    uploadBase64File(
      "put",
      `${apiURL}/profile-photo`.slice(1),
      base64Data,
      "avatar.jpg",
      "image/jpg"
    )
    .then(() => {
      // force refresh the user after uploading the photo to ensure
      // the URL is reset
      return dispatch(loadUser(false));
    })
    .then(resolve)
    .catch(reject);
  });
};

export const deleteUserProfilePhoto = () => (dispatch, getState) => {
  return Promise.reject("not implemented");
};

// Change the users email address.  The user should be re-authenticated after this, because any
// JWT tokens may become invalid after this operation.
export const updateUserEmail = (email) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.put(`${apiURL}/email`, {email}).then(resolve).catch(reject);
  });
};

export const updateUserPassword = (oldPassword, newPassword) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.put(`${apiURL}/password`, {oldPassword, newPassword}).then(resolve).catch(reject);
  });
};

export const updateUserPaymentDetails = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.put(`${apiURL}/billing/payment-details`, payload)
    .then((res) => {
      dispatch(setUser(res.data));
      resolve(res.data);
    })
    .catch(reject);
  });
};

export const removeUserPaymentDetails = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.delete(`${apiURL}/billing/payment-details`)
    .then((res) => {
      dispatch(setUser(res.data));
      resolve(res.data);
    })
    .catch(reject);
  });
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
      dispatch(update({
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

// load minute package promo code, or return error if it was invalid or failed to load
export const loadMinutePackages = (useCache = true, code = null) => (dispatch, getState) => {
  const {minutePackagesLoadedAt} = getState().account;
  if (useCache && !code && new Date().getTime() < minutePackagesLoadedAt + CACHE.MINUTE_PACKAGES) {
    return Promise.resolve(getState().account.minutePackages);
  }
  const url = (!!code) ? `/minute-packages?promocode=${code}` : `/minute-packages`;
  return new Promise((resolve, reject) => {
    api.get(url)
    .then((res) => {
      dispatch(update({
        minutePackagesLoadedAt: new Date().getTime(),
        minutePackages: res.data,
        minutePackagePromoCode: !!code ? code : null,
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// just clears any promo-code and 
export const clearMinutePackagePromoCode = () => (dispatch, getState) => {
  return dispatch(loadMinutePackages(false));
};

// purchase a minute package, optionally using a promocode
export const purchaseMinutePackage = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.post(apiURL+"/billing/minute-packages", payload)
    .then((res) => {
      return dispatch(loadUser(false));
    })
    .then(resolve)
    .catch(reject);
  });
};

// if user has an autoreload minute package, remove it
export const removeAutoreloadMinutePackage = () => (dispatch, getState) =>  {
  return new Promise((resolve, reject) => {
    api.delete(`${apiURL}/billing/minute-package-autoreload`)
    .then((res) => {
      return dispatch(loadUser(false));
    })
    .then(resolve)
    .catch(reject);
  });
}; 

// load calls placed as a customer
export const loadCustomerCallHistory = (useCache = true) => (dispatch, getState) => {
  const {customerCallHistory, customerCallHistoryLoadedAt} = getState().account;
  return new Promise((resolve, reject) => {
    if (useCache && !!customerCallHistory && new Date().getTime() < customerCallHistoryLoadedAt + CACHE.CALL_HISTORY) {
      resolve(customerCallHistory);
      return;
    }
    api.get(apiURL+"/sessions")
    .then((res) => {
      dispatch(update({
        customerCallHistory: res.data,
        customerCallHistoryLoadedAt: new Date().getTime(),
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// load calls accepted as a linguist
export const loadLinguistCallHistory = (useCache = true) => (dispatch, getState) => {
  const {linguistCallHistory, linguistCallHistoryLoadedAt} = getState().account;
  return new Promise((resolve, reject) => {
    if (useCache && !!linguistCallHistory && new Date().getTime() < linguistCallHistoryLoadedAt + CACHE.CALL_HISTORY) {
      resolve(linguistCallHistory);
      return;
    }
    api.get(apiURL+"/linguist-profile/sessions")
    .then((res) => {
      dispatch(update({
        linguistCallHistory: res.data,
        linguistCallHistoryLoadedAt: new Date().getTime(),
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// load invites for calls missed by the linguist
export const loadLinguistMissedCallHistory = (useCache = true) => (dispatch, getState) => {
  const {linguistMissedCallHistory, linguistMissedCallHistoryLoadedAt} = getState().account;
  return new Promise((resolve, reject) => {
    if (useCache && !!linguistMissedCallHistory && new Date().getTime() < linguistMissedCallHistoryLoadedAt + CACHE.CALL_HISTORY) {
      resolve(linguistMissedCallHistory);
      return;
    }
    api.get(apiURL+"/linguist-profile/session-invitations?status=missed")
    .then((res) => {
      dispatch(update({
        linguistMissedCallHistory: res.data,
        linguistMissedCallHistoryLoadedAt: new Date().getTime(),
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

export const updateLinguistProfile = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api.patch(`${apiURL}/linguist-profile`, payload)
    .then((res) => {
      dispatch(setUser(res.data));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// general purpose feedback submission, payload should match API call from server docs
export const submitFeedback = (payload) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if (!payload) {
      return Promise.reject("no payload");
    }
    if (!payload.type) {
      payload.type = "general";
    }
    api.post(`${apiURL}/feedback`, payload)
    .then(resolve)
    .catch(reject)
    .finally(() => {
      return dispatch(loadUser(false));
    });
  });
};

// submit a specify type of feedback for reporting abuse in a session
export const submitSessionAbuseReport = (message, aboutUserID, sessionID) => (dispatch, getState) => {
  return dispatch(submitFeedback({
    type: "abuse_report",
    aboutUserID,
    sessionID,
    message
  }));
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
        ...(state || initState()),
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
