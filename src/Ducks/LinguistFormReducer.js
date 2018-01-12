const ACTIONS = {
  CLEAR: "linguistForm/clear",
  UPDATE: "linguistForm/update",
};

export const clearForm = () => ({
  type: ACTIONS.CLEAR
});

export const updateForm = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const GetOptions = () => dispatch => {
  return [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Other" },
    { gender: "Decline to spicify" }
  ]
};

const initialState = {
  // Linguist First Name and Last Name
  firstname: "",
  lastname: "",
  preferredName: "",
  formHasErrors: false,
  mainTitle: "Enter Your Name",
  // Linguist Email
  email: "",
  // Gender 
  selectedGender: "",
  // Phone number
  phoneNumber: "",
  // Verify Phone
  VerifyPhoneNumber: ""

};

const linguistFormReducer = (state = initialState, action = {}) => {
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

export default linguistFormReducer;
