import { Linguist, CallHistory } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { User } from "../Api";

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

export const getCurrentAvailability = () => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(updateSettings({ loading: true }));
  return User.get(auth2.userID, auth2.userJwtToken)
    .then(({ data }) => {
      let availability = data.linguistProfile.available
        ? data.linguistProfile.available
        : false;
      dispatch(
        updateSettings({
          available: availability,
          loading: false
        })
      );
    })
    .catch(error => {
      dispatch(networkError(error));
      dispatch(
        updateSettings({
          loading: false
        })
      );
    });
};

export const changeStatus = status => (dispatch, getState) => {
  const { auth, profileLinguist, userProfile } = getState();
  if (userProfile.linguistProfile) {
    dispatch(updateSettings({ loading: true }));

    Linguist.update(userProfile.id, auth2.userJwtToken, {
      available: status
    })
      .then(res => {
        let available = res.data.linguistProfile.available
          ? res.data.linguistProfile.available
          : status;
        dispatch(
          updateSettings({
            available,
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

export const getTotalDuration = callHistory => {
  const amountDuration = callHistory
    .map(callDetail =>
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
