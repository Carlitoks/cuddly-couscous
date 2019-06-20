// The purpose of this is to manage configuration for the app that is
// determined by external sources (the API primarily)

import lodashMerge from 'lodash/merge';
import api from "../Config/AxiosConfig";
import { CACHE } from "../Config/env";
import { supportedLangCodes } from '../Config/Languages';

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
    supportedLangPairs: [], // TODO
    // map of langCode => num jeenies online
    jeenieCounts: {}
  }
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
      dispatch(merge({
        configLoadedAt: new Date().getTime(),
        config: res.data,
      }));
      resolve(res.data);
    })
    .catch(reject);
  });
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
        ...state || initState(),
        ...payload
      };
    }

    default: {
      return state || initState();
    }
  }
};

export default appConfigReducer;
