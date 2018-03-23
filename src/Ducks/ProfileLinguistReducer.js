import { Linguist, CallHistory } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { linguistCalls } from "./CallHistoryReducer";

import moment from "moment";

// Constants

// Actions
export const ACTIONS = {
  CLEAR: "profileLinguist/clear",
  UPDATE: "profileLinguist/update"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const changeStatus = status => (dispatch, getState) => {
  const { auth, profileLinguist, userProfile } = getState();
  if (userProfile.linguistProfile) {
    dispatch(updateSettings({ loading: true }));

    Linguist.update(userProfile.id, auth.token, {
      available: status
    })
      .then(res => {
        dispatch(
          updateSettings({
            available: status,
            loading: false
          })
        );
      })
      .catch(err => {
        dispatch(networkError(err));
        dispatch(
          updateSettings({
            loading: false
          })
        );
      });
  }
};

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const asyncGetAccountInformation = () => (dispatch, getState) => {
  const { auth, profileLinguist, userProfile } = getState();

  return CallHistory.getAllLinguistCalls(userProfile.id, auth.token)
    .then(response => {
      const { data } = response;
      dispatch(linguistCalls(data));
      dispatch(
        updateSettings({
          numberOfCalls: data.length,
          amount: data.length > 0 ? getTotalDuration(data) : "00:00"
        })
      );
    })
    .catch(error => dispatch(networkError(error)));
};

export const getTotalDuration = callHistory => {
  const amountDuration = callHistory
    .map(
      callDetail =>
        callDetail.session.duration ? callDetail.session.duration : 0
    )
    .reduce((amount, duration) => amount + duration);

  return moment.utc(amountDuration * 1000).format("mm:ss");
};

// Initial State
const initialState = {
  available: false,
  rating: 4.5,
  numberOfCalls: 0,
  amount: "00:00",
  status: "Offline",
  username: "Adele G",
  loading: false
};

// Reducer
const profileLinguistReducer = (state = initialState, action) => {
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

export default profileLinguistReducer;
