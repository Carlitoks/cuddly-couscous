const ACTIONS = {
  UPDATE: "networkInfo/update"
};

export const updateNetworkInfo = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

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
