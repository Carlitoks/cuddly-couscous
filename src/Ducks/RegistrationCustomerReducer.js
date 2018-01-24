import { Auth, User } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { androidDeviceIDToPseudoUUID } from "../Util/Helpers";

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
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Other" },
    { gender: "Decline to spicify" }
  ];
};

export const upateDeviceToken = payload => ({
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

export const registerDevice = () => dispatch => {
  const deviceInfo = {
    deviceOS: Platform.OS,
    deviceOSVersion: Platform.Version.toString(),
    deviceType: DeviceInfo.isTablet() ? "tablet" : "phone",
    /*id:
      Platform.OS === "ios"
        ? DeviceInfo.getUniqueID()
        : androidDeviceIDToPseudoUUID(DeviceInfo.getUniqueID()),*/
    id: uuidv4(),
    mobileAppVersion: DeviceInfo.getReadableVersion(),
    name: DeviceInfo.getDeviceName(),
    notificationToken: "string"
  };
  return Auth.registerDevice(deviceInfo)
    .then(response => {
      return dispatch(upateDeviceToken(response.data));
    })
    .catch(err => dispatch(networkError(err)));
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
  mainTitle: "Enter Your Name",
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
  selectedNativeLanguage: [],
  CustomerSelectItemType: "",
  // error messages
  emailErrorMessage: "",
  passwordErrorMessage: "",
  deviceToken: ""
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