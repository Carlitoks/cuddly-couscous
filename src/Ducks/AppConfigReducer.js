// The purpose of this is to manage configuration for the app that is
// determined by external sources (the API primarily)

import lodashMerge from 'lodash/merge';
import api from "../Config/AxiosConfig";
import { CACHE } from "../Config/env";

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
    configLoadedAt: null,
    config: {},
    supportedLangPairs: [], // TODO
    jeenieCounts: {} // TODO:  
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

export const loadConfig = (useCache = true) => (dispatch, getState) => {
  return Promise.reject("not implemented");
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
