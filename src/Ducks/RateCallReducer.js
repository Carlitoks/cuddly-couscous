import { Sessions } from "../Api";
// Actions
export const ACTIONS = {
  CLEAR: "rateCall/clear",
  UPDATE: "rateCall/update"
};

export const UpdateFlags = (
  IconName,
  IconState,
  action,
  selected
) => dispatch => {
  switch (action) {
    case "positiveFlags": {
      if (selected) {
        WhatWasGood.push(IconName);
        dispatch(updateOptions(IconState));
      } else {
        WhatWasGood.splice(WhatWasGood.indexOf(IconName), 1);
        dispatch(updateOptions(IconState));
      }
    }
    case "negativeFlags": {
      if (selected) {
        WhatCouldBetter.push(IconName);
        dispatch(updateOptions(IconState));
      } else {
        WhatCouldBetter.splice(WhatCouldBetter.indexOf(IconName), 1);
        dispatch(updateOptions(IconState));
      }
    }
  }
};

// Action Creator
export const updateOptions = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearOptions = () => ({
  type: ACTIONS.CLEAR
});

export const submitRateCall = (
  RateInformation,
  sessionID,
  token
) => dispatch => {
  RateInformation = {
    ...RateInformation,
    negativeFlags: WhatCouldBetter,
    positiveFlags: WhatWasGood,
    comment: ""
  };

  return Sessions.RatingSession(RateInformation, sessionID, token)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      // return dispatch(networkError(error));
    });
};

let WhatWasGood = [];
let WhatCouldBetter = [];

// Initial State
const initialState = {
  // Start Number
  rating: 0,

  // color Tab thumbs
  thumbsUp: false,
  thumbsDown: false,

  // States for icons that belong to What was Good question
  iconClockFirstList: false,
  iconVolumeFirstList: false,
  iconWifiFirstList: false,
  iconPersonFirstList: false,

  // States for icons that belong to What could be better
  iconClockSecondList: false,
  iconVolumeSecondList: false,
  iconWifiSecondList: false,
  iconPersonSecondList: false
};

// Reducer
const rateCallReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};

export default rateCallReducer;
