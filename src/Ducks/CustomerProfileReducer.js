import { User } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
const ACTIONS = {
  CLEAR: "customerProfile/clear",
  UPDATE: "customerProfile/update",
  USERUPDATE: "customerProfile/userInfoUpdate"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const userinfoUpdate = payload => ({
  type: ACTIONS.USERUPDATE,
  payload
});

export const asyncUpdateUser = (payload, token) => dispatch => {
  const { id, password } = payload;
  return User.update(id, { password }, token)
    .then(response => {
      return dispatch(userinfoUpdate(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

export const asyncCreateUser = (payload, token) => dispatch => {
  return User.create(payload, token)
    .then(response => {
      return dispatch(userinfoUpdate(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

export const asyncUploadAvatar = (id, image, token) => dispatch => {
  return User.uploadPhoto(id, image, token)
    .then(response => {
      return dispatch(userinfoUpdate(response.data));
    })
    .catch(error => dispatch(networkError(error)));
};

const initialState = {
  firstName: "",
  firstNameErrorMessage: "",
  lastName: "",
  lastNameErrorMessage: "",
  avatar: null,
  formHasErrors: false,
  performingRequest: false,
  userInfo: null
};

const customerProfileReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }
    case ACTIONS.USERUPDATE: {
      return { ...state, userInfo: payload };
    }
    default: {
      return state;
    }
  }
};

export default customerProfileReducer;