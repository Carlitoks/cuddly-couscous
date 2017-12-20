import { User } from "../Api";

// Actions
const ACTIONS = {
  CLEAR: "home/clear",
  UPDATE: "home/update"
};

// Action Creators
export const clearView = () => ({
  type: ACTIONS.CLEAR
});

export const updateView = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const getProfileAsync = () => dispatch => {
  /*getAsync("userLogin").then((userlogin, error) => {
    if (!error) {
      userlogin = JSON.parse(userlogin);
      User.get(userlogin.id, userlogin.token)
        .then(response => {
          dispatch(updateView(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(error);
    }
  });*/
};

// Initial State
const initialState = {
  firstName: "",
  lastName: "",
  nativeLangCode: "",
  location: "San Diego, CA",
  rate: 3.5
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
        nativeLangCode: payload.nativeLangCode
      };
    }

    default: {
      return state;
    }
  }
};

export default UserProfileReducer;
