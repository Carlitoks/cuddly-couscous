import { CallHistory } from "../Api";

const ACTIONS = {
  CLEAR: "callHistory/clear",
  ALL: "callHistory/AllCalls",
  MISSED: "callHistory/MissedCalls",
  RECENT: "callHistory/RecentCalls",
  SELECTED: "callHistory/selected"
};
export const indexChanged = payload => ({
  type: ACTIONS.SELECTED,
  payload
});

export const AllCalls = payload => ({
  type: ACTIONS.ALL,
  payload
});
export const MissedCalls = payload => ({
  type: ACTIONS.MISSED,
  payload
});
export const RecentCalls = payload => ({
  type: ACTIONS.RECENT,
  payload
});

export const IndexOnChange = idx => dispatch => {
  dispatch(indexChanged({ selectIndex: idx }));
};
export const getAllCalls = (id, token) => dispatch => {
  CallHistory.getAll(id, token).then(response => {
    dispatch(AllCalls(response));
  });
};

export const getMissedCalls = (id, token) => dispatch => {
  CallHistory.getMissed(id, token).then(response => {
    dispatch(MissedCalls(response));
  });
};
export const getRecentCalls = (id, token) => dispatch => {
  CallHistory.getRecents(id, token).then(response => {
    dispatch(RecentCalls(response));
  });
};

const initialState = {
  AllCalls: [],
  MissedCalls: [],
  RecentCalls: [],
  selectedIndex: 0
};

const callHistory = (state = initialState, action = {}) => {
  const { payload, type } = action;
  console.log(type, payload);
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }
    case ACTIONS.SELECTED: {
      return { ...state, ...payload };
    }
    case ACTIONS.ALL: {
      return { ...state, AllCalls: payload };
    }
    case ACTIONS.MISSED: {
      return { ...state, MissedCalls: payload };
    }
    case ACTIONS.RECENT: {
      return { ...state, RecentCalls: payload };
    }
    default: {
      return state;
    }
  }
};

export default callHistory;
