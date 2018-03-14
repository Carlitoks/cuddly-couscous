import { Platform } from "react-native";
import { androidDeviceIDToPseudoUUID } from "../Util/Helpers";
import I18n from "../I18n/I18n";

const ACTIONS = {
  CLEAR: "registrationCustomer/clear",
  UPDATE: "registrationCustomer/update",
  ERROR: "registrationCustomer/error",
  DEVICETOKEN: "registrationCustomer/devicetoken"
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
    {
      label: I18n.t("male"),
      value: "male"
    },
    {
      label: I18n.t("female"),
      value: "female"
    },
    {
      label: I18n.t("preferNotToDisclose"),
      value: "decline"
    }
  ];
};

export const updateDeviceToken = payload => ({
  type: ACTIONS.DEVICETOKEN,
  payload
});

// Temp Function to create UUID for the phone,
// API not allowing to create several accounts
// on the same phone
uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const errorForm = payload => ({
  type: ACTIONS.ERROR,
  payload
});
const initialState = {
  // Customer First Name and Last Name
  firstname: "",
  lastname: "",
  preferredName: "",
  mainTitle: I18n.t("mainTitle"),
  formHasErrors: false,
  // Customer Email
  email: "",
  // Gender
  selectedGender: "",
  // Phone
  phoneNumber: "",
  // password
  password: "",
  // selected Native Language
  languages: [],
  selectedNativeLanguage: {
    1: "en",
    2: "eng",
    3: "eng",
    name: "English",
    local: "English",
    "2T": "eng",
    "2B": "eng"
  },
  CustomerSelectItemType: "",
  // error messages
  emailErrorMessage: "",
  passwordErrorMessage: "",
  deviceToken: "",
  performingRequest: false,
  id: null
};

const registrationCustomerReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }
    case ACTIONS.DEVICETOKEN: {
      return { ...state, deviceToken: payload.token };
    }
    case ACTIONS.ERROR: {
      const errors = {};

      switch (payload.data.errors[0]) {
        case "Email not found":
          errors.emailErrorMessage = "User not found";
          errors.formHasErrors = true;
          break;

        case "Password incorrect":
          errors.passwordErrorMessage = "Invalid password";
          errors.formHasErrors = true;
          break;

        default:
      }

      return { ...state, ...errors };
    }
    default: {
      return state;
    }
  }
};

export default registrationCustomerReducer;
