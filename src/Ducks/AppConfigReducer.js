import api from "../Config/AxiosConfig";
import { CACHE } from "../Config/env";

const ACTIONS = {
  CLEAR: "appConfig/clear",
  UPDATE: "appConfig/update",
};

export const clear = () => ({
  type: ACTIONS.CLEAR
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});


const initialState = {
  scenariosLoadedAt: null,
  scenarios: [],
  configLoadedAt: null,
  config: {},
};

export const loadSessionScenarios = (useCache = true) => (dispatch, getState) => {
  const {scenariosLoadedAt, scenarios} = getState().appConfigReducer;
  if (useCache && !!scenariosLoadedAt && new Date().getTime() < scenariosLoadedAt + CACHE.SCENARIOS) {
    return Promise.resolve(scenarios);
  }

  return new Promise((resolve, reject) => {
    api.get("/scenarios")
      .then((res) => {
        dispatch(update({
          scenariosLoadedAt: new Date().getTime(),
          scenarios: res.data,
        }));
        resolve(res.data);
      })
      .catch(reject);
  });
};

export const loadConfig = (useCache = true) => (dispatch, getState) => {
  return Promise.reject("not implemented");
};

const appConfigReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
};

export default appConfigReducer;
