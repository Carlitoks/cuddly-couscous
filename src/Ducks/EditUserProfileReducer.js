import { Sessions } from "../Api";
import { Images } from "../Themes/Images";
import EN from "../I18n/en";

// Constants

const ACTIONS = {
  CLEAR: "editProfile/clear",
  UPDATE: "editProfile/update"
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});


export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});


const initialState = {
  // Linguist First Name and Last Name
  profileName: "Viola Lowe",
  preferredName: "Viola-Viola",

};


const editProfileReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
};

export default editProfileReducer;
