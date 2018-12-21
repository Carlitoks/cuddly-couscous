import { User } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import PushNotification from "../Util/PushNotification";
import { Languages } from "../Config/Languages";
import { registerFCM } from "./PushNotificationReducer";

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
      return dispatch(updateView(JSON.parse(response.data)));
    })
    .catch(error => dispatch(networkError(error)));
};

export const getNativeLang = code => (dispatch, getState) => {
  return Languages.find(e => {
    if (e["3"] === code) {
      return e;
    }
  });
};

export const getProfileAsync = (uid, token) => (dispatch, getState) => {
  const { pushNotification, auth } = getState();
  return User.get(uid, token)
    .then(({ data }) => {
      const { stripePaymentToken } = data;

      if (!pushNotification.tokenFCM) {
        PushNotification.registerDeviceInFCM(
          data.id,
          auth.deviceId,
          token,
          payload => {
            dispatch(registerFCM(payload));
          }
        );
      }

      return dispatch(updateView({ ...data, stripePaymentToken }));
    })
    .catch(error => dispatch(networkError(error)));
};

export const updateProfileAsync = (uid, payload, token) => dispatch => {
  return User.update(uid, payload, token)
    .then(response => {
      return User.get(uid, token)
        .then(response => {
          const data = {
            ...response.data,
            preferredName: response.data.preferredName
              ? response.data.preferredName
              : ""
          };
          return dispatch(updateView(data));
        })
        .catch(error => dispatch(networkError(error)));
    })
    .catch(error => dispatch(networkError(error)));
};

// Initial State
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  nativeLangCode: "",
  preferredName: "",
  location: "",
  gender: "",
  averageStarRating: 0,
  preferences: {},
  isLinguist: false,
  linguistProfile: null,
  avatarURL: "",
  avatarBase64: null,
  selectedNativeLanguage: {},
  selectedSecondaryLanguages: [],
  selectionItemType: "",
  selectedLanguage: null,
  isNewUser: false
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
