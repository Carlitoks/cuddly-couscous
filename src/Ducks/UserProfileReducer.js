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

export const asyncUploadAvatar = (id, image, token) => dispatch => {
  return User.uploadPhoto(id, image, token)
    .then(response => {
      dispatch(updateView({ avatarBase64: null }));
      return dispatch(updateView(JSON.parse(response.data)));
    })
    .catch(error => {
      return dispatch(networkError(error));
    });
};

export const getProfileAsync = (uid, token) => dispatch => {
  return User.get(uid, token)
    .then(response => {
      return dispatch(updateView(response.data));
    })
    .catch(error => {
      return dispatch(networkError(error));
    });
};

export const updateProfileAsync = (uid, payload, token) => dispatch => {
  return User.update(uid, payload, token)
    .then(response => {
      return User.get(uid, token)
        .then(response => {
          return dispatch(updateView(response.data));
        })
        .catch(error => {
          return dispatch(networkError(error));
        });
    })
    .catch(error => {
      return dispatch(networkError(error));
    });
};

// Initial State
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  nativeLangCode: "",
  preferredName: "",
  location: "",
  averageStarRating: 0,
  preferences: {},
  isLinguist: false,
  linguistProfile: null,
  avatarUrl: "",
  avatarBase64: null,
  selectedNativeLanguage: [],
  selectedSecondaryLanguages: [],
  selectionItemType: "",
  selectedLanguage: null
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
        ...payload,
        isLinguist: !!payload.linguistProfile

        /* firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        preferredName: payload.preferredName,
        rate: payload.averageStarRating ? payload.averageStarRating : 4.5,
        nativeLangCode: payload.nativeLangCode,
        preferences: payload.preferences,
        linguistProfile: payload.linguistProfile,
        isLinguist: !!payload.linguistProfile,
        avatarUrl: payload.avatarURL
          ? IMAGE_STORAGE_URL + payload.avatarURL
          : "",
        selectedNativeLanguage: payload.selectedNativeLanguage */
      };
    }

    default: {
      return state;
    }
  }
};

export default UserProfileReducer;