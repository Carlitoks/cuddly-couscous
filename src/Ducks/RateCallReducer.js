import { Sessions } from "../Api";

import { networkError } from "./NetworkErrorsReducer";

// Actions
export const ACTIONS = {
  CLEAR: "rateCall/clear",
  UPDATE: "rateCall/update"
};
// this functions is used to update the states of the icons, we have two cases positives and negatives flags

/*
 * @param {string} IconName - Name of the Icon.
 * @param {object} IconState - object with the current state.
 * @param {string} action - The action asociated with the question that we are selecting at the moment
 * @param {boolean} selected - flag used to know is the icon is selected
 * @param {object} OffState - object with the state of the icon that we are going to turn off
 */

export const UpdateFlags = (
  IconName,
  IconState,
  action,
  selected,
  OffState,
  Key
) => dispatch => {
  switch (action) {
    case "positiveFlags": {
      if (selected) {
        /* if the icon is selected we are going to push the name of the icon into the array WhatWasgood
        and we need to remove in what could be better question that element and update the state
        */
        WhatWasGood.push(Key);
        const index = WhatCouldBetter.indexOf(Key);
        if (index !== -1) {
          WhatCouldBetter.splice(index, 1);
        }
        dispatch(updateOptions(OffState));
        dispatch(updateOptions(IconState));
      } else {
        const index = WhatWasGood.indexOf(Key);
        if (index !== -1) {
          WhatWasGood.splice(index, 1);
        }
        dispatch(updateOptions(IconState));
      }
      break;
    }

    case "negativeFlags": {
      if (selected) {
        /* if the icon is selected we are going to push the name of the icon into the array WhatCouldBetter
       also we need to remove in what whas good question that element and update the state, if we want to cancel the selection
       we remove that element of WhatCouldBetter and we update the state of the icon.
       */
        WhatCouldBetter.push(Key);
        dispatch(updateOptions(IconState));
        dispatch(updateOptions(OffState));
        const index = WhatWasGood.indexOf(Key);
        if (index !== -1) {
          WhatWasGood.splice(index, 1);
        }
      } else {
        const index = WhatCouldBetter.indexOf(Key);
        if (index !== -1) {
          WhatCouldBetter.splice(index, 1);
        }
        dispatch(updateOptions(IconState));
      }
      break;
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

export const submitRateCall = (RateInformation, sessionID, token) => (
  dispatch,
  getState
) => {
  const { userProfile } = getState();

  RateInformation = {
    ...RateInformation,
    negativeFlags: WhatCouldBetter,
    positiveFlags: WhatWasGood,
    comment: getState().rateCall.comments,
    callType: getState().rateCall.callType,
    scenarioID: getState().rateCall.scenarioID,
    scenarioNote: getState().rateCall.scenarioNote,
  };
  return Sessions.RatingSession(RateInformation, sessionID, token)
    .then(response => {
      return response;
    })
    .catch(error => dispatch(networkError(error)));
};

let WhatWasGood = [];
let WhatCouldBetter = [];

// Initial State
const initialState = {
  // Start Number
  rating: 0,
  sessionID: "",
  customerName: "",
  avatarURL: "",
  comments: "",
  // color Tab thumbs
  thumbsUp: false,
  thumbsDown: false,
  scenarioID: null,
  scenarioNote: "",

  // States for icons that belong to What was Good question

  iconWaitTimeFirstList: false,
  iconProfessionalismFirstList: false,
  iconFriendlinessFirstList: false,
  iconLanguageAbilityFirstList: false,
  iconUnderstandFirstList: false,
  iconAudioQualityFirstList: false,

  // States for icons that belong to What could be better

  iconWaitTimeSecondList: false,
  iconProfessionalismSecondList: false,
  iconFriendlinessSecondList: false,
  iconLanguageAbilitySecondList: false,
  iconUnderstandSecondList: false,
  iconConnectionSecondList: false,
  iconBackgroundNoiseSecondList: false,
  iconVoiceClaritySecondList: false,
  iconDistractionsSecondList: false,

  //call classification
  callType: "",
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
