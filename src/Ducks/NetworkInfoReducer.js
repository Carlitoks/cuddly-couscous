import { NetInfo } from "react-native";

const ACTIONS = {
  UPDATE: "networkInfo/update"
};

export const updateNetworkInfo = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const delayUpdateInfo = connectionInfo => (dispatch, getState) => {
  if (connectionInfo.type == "none") {
    setTimeout(() => {
      NetInfo.getConnectionInfo().then(connectionInfo => {
        dispatch(updateNetworkInfo(connectionInfo));
      });
    }, 2 * 1000);
  } else {
    dispatch(updateNetworkInfo(connectionInfo));
  }
};

const initialState = {
  type: null,
  effectiveType: null
};

const networkInfo = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
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

export default networkInfo;
