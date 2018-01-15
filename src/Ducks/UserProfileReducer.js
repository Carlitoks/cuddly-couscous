import { User } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { IMAGE_STORAGE_URL } from "../Config/env";

// Actions
const ACTIONS = {
  CLEAR: "userProfile/clear",
  UPDATE: "userProfile/update"
};

// Action Creators
export const clearView = () => ({
  type: ACTIONS.CLEAR
});

export const updateView = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const getProfileAsync = (uid, token) => dispatch => {
  return User.get(uid, token)
    .then(response => {
      return dispatch(updateView(response.data));
    })
    .catch(function(error) {
      return dispatch(networkError(error));
    });
};

// Initial State
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  nativeLangCode: "",
  location: "",
  rate: 0,
  preferences: {},
  linguistProfile: null,
  avatarUrl: ""
};

const UserProfileReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        rate: payload.averageStarRating ? payload.averageStarRating : 0,
        nativeLangCode: payload.nativeLangCode,
        preferences: payload.preferences,
        linguistProfile: payload.linguistProfile,
        avatarUrl: payload.avatarURL
          ? IMAGE_STORAGE_URL + payload.avatarURL
          : ""
      };
    }

    default: {
      return state;
    }
  }
};

export default UserProfileReducer;