// The purpose of this is to manage configuration for the app that is
// determined by external sources (the API primarily)

import DeviceInfo from "react-native-device-info";

import lodashMerge from 'lodash/merge';
import api from "../Config/AxiosConfig";
import { CACHE } from "../Config/env";
import { supportedLangCodes } from '../Config/Languages';
import { getCountryCodeFromLocale } from '../Util/Helpers';

const ACTIONS = {
  CLEAR: "appConfig/clear",
  MERGE: "appConfig/merge",
  UPDATE: "appConfig/update"
};

export const clear = () => ({
  type: ACTIONS.CLEAR
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const merge = (payload) => ({
  type: ACTIONS.MERGE,
  payload
});

const initState = () => {
  return {
    scenariosLoadedAt: null,
    scenarios: [],

    // config from the server, unmodified.  some other state
    // properties here may be calculated from it
    configLoadedAt: null,
    config: {},

    // object in the form {amount: number, currency: string}, meant to be passed to
    // I18n utilities to be localized in UIs.  This value is determined by config
    // that comes from the server, but also by user/device information, if available.
    payAsYouGoRate: null,

    supportedLangPairs: [], // TODO
    // map of langCode => num jeenies online
    jeenieCounts: {}
  }
};

// initialize app config and set any state
export const init = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      dispatch(loadConfig(false)),
      dispatch(updateJeenieCounts(true)),
    ])
    .then(resolve)
    .catch(reject)
    .finally(() => {
      dispatch(computePayAsYouGoRate());
    });    
  });
};

export const loadSessionScenarios = (useCache = true) => (dispatch, getState) => {
  const { scenariosLoadedAt, scenarios } = getState().appConfigReducer;
  if (
    useCache &&
    !!scenariosLoadedAt &&
    new Date().getTime() < scenariosLoadedAt + CACHE.SCENARIOS
  ) {
    return Promise.resolve(scenarios);
  }

  return new Promise((resolve, reject) => {
    api
      .get("/scenarios")
      .then(res => {
        dispatch(
          update({
            scenariosLoadedAt: new Date().getTime(),
            scenarios: res.data
          })
        );
        resolve(res.data);
      })
      .catch(reject);
  });
};

// one day these counts will actually come from the server, but for now we
// generate them locally
export const updateJeenieCounts = (initialize = false) => (dispatch, getState) => {
  const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const jitterNum = (num) => {
    const delta = randomNum(0, 2);
    if (randomNum(0, 1) > 0) {
      return num + delta;
    }
    return num - delta;
  };
  let {jeenieCounts} = getState().appConfigReducer;
  if(!jeenieCounts) {
    jeenieCounts = {};
    dispatch(update({jeenieCounts}));
  }
  for (var code of supportedLangCodes) {
    if (!!jeenieCounts[code]) {
      if (initialize) {
        jeenieCounts[code] = randomNum(30, 60);
      } else {
        jeenieCounts[code] = jitterNum(jeenieCounts[code]);
      }
    } else {
      jeenieCounts[code] = randomNum(30, 60);
    }
  }
  return new Promise((resolve, reject) => {
    dispatch(update({jeenieCounts}));
    resolve(jeenieCounts);
  });
}

// reload server config
export const loadConfig = (useCache = true) => (dispatch, getState) => {
  const {config, configLoadedAt} = getState().appConfigReducer;
  if (useCache && !!configLoadedAt && new Date().getTime() < configLoadedAt + CACHE.CONFIG) {
    return Promise.resolve(config);
  }
  return new Promise((resolve, reject) => {
    api.get("/config")
    .then((res) => {
      // TODO: calcluate any extra state values derived from the server config
      dispatch(update({
        configLoadedAt: new Date().getTime(),
        config: res.data,
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
};

// the pay-as-you-go price is dynamically set via
export const computePayAsYouGoRate = () => (dispatch, getState) => {
  const user = getState().account.user;
  const device = getState().account.device;
  const c = getState().appConfigReducer.config;
  const rates = (!!c && !!c.payAsYouGoRate) ? c.payAsYouGoRate : null;
  const countryCurrencyMap = (!!c && !!c.defaultCountryCurrencies) ? c.defaultCountryCurrencies : null;
  
  // set the default price in case we don't have any other config
  let price = {amount: 100, currency: "usd"};

  // now figure out the dynamic localized price based given available data
  if (!!rates) {
    // check for device locale to try and determine correct currency first
    if (!!countryCurrencyMap) {
      const l = (!!device && !!device.locale) ? device.locale.toLowerCase() : DeviceInfo.getDeviceLocale();
      code = getCountryCodeFromLocale(l);
      if (!!code && !!countryCurrencyMap[code] && !!rates[countryCurrencyMap[code]]) {
        price = {amount: rates[countryCurrencyMap[code]], currency: countryCurrencyMap[code]};
      }
    }

    // now check user, user pref overrides device preference
    if (!!user && !!user.currencyPreference && !!rates[user.currencyPreference]) {
      price = {amount: rates[user.currencyPreference], currency: user.currencyPreference};
    } else if (!!rates["usd"]) {
      price = {amount: rates["usd"], currency: "usd"};
    }
  }

  dispatch(update({payAsYouGoRate: price}));
};

const appConfigReducer = (state = null, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }

    case ACTIONS.MERGE: {
      return lodashMerge({}, state || initState(), payload);
    }

    case ACTIONS.UPDATE: {
      return {
        ...(state || initState()),
        ...payload
      };
    }

    default: {
      return state || initState();
    }
  }
};

export default appConfigReducer;
