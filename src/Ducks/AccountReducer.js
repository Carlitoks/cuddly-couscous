// The purpose of this is to manage all state about the user who
// is logged in and using the app

import lodashMerge from 'lodash/merge';

const initState = () => {
  return {
    isActiveLinguist: false,
    isPropspectiveLinguist: false,
    isTravelling: false,
    currentDeviceID: null,
    currentDevice: {},
    userID: null,
    // exact data structure from api: GET /users/{id}
    user: {},
    subscriptionPeriodsLoadedAt: null,
    subscriptionPeriods: [],
    // based on subscriptionPeriods
    hasUnlimitedUse: false,
    linguistProfile: {},
    customerCallHistoryLoadedAt: null,
    customerCallHistory: [],
    linguistCallHistoryLoadedAt: null,
    linguistCallHistory: [],
    availableMinutePackagesLoadedAt: null,
    availableMinutePackages: []
  }
};

const hasUnlimitedUse = (user) => {
  if (!user.subscriptionPeriods || user.subscriptionPeriods.length == 0) {
    return false;
  }

  for (var p of user.subscriptionPeriods) {
    // TODO: check time & p.unlimitedUse
  }

  return false;
}

export const reloadUser = (cache) => (getState, dispatch) => {

};

const ACTIONS = {
  UPDATE: 'account/update', // set the state
  MERGE: 'account/merge', // merge in nested updates to state
  CLEAR: 'account/clear' // reset state to initial state
}

export const update = (payload) => ({type: ACTIONS.UPDATE, payload});
export const merge = (payload) => ({type: ACTIONS.MERGE, payload});
export const clear = () => ({type: ACTIONS.CLEAR});

const accountReducer = (state = null, action = {}) => {
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

export default accountReducer;
