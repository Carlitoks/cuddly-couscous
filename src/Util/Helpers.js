import { Alert } from "react-native";
import I18n from "../I18n/I18n";
import moment from "moment";
import { EMAIL_REGEX, INVALID_NAME_REGEX, DURATION } from "./Constants";
import Permissions from "react-native-permissions";
/**
 * @description Seconds to minutes and seconds String
 *
 * @param {number} s - Time in seconds
 */
export const fmtMSS = s => {
  const min = Math.trunc(s / 60);
  const sec = s % 60;
  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
};

/**
 * @description Gets navigator geolocation from navigator global object
 * http://facebook.github.io/react-native/docs/geolocation.html
 *
 * @returns {object} Geolocation object
 */
export const getGeolocationObject = () => navigator.geolocation;

/**
 * @description Gets Geolocation Coords Object
 * http://facebook.github.io/react-native/docs/geolocation.html#getcurrentposition
 *
 * @returns {Promise.<coordsObject>} Geolocation coords object
 */
export const getGeolocationCoords = () => {
  // Turning Callback call into a Promise
  return new Promise((resolve, reject) => {
    Permissions.check("location").then((status) => {
      if(status === "authorized"){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          },
          {
            // Allows you to get the most accurate location. Due to how it gets the location (via GPS) it may be slower to return a result but it will be more accurate when enabled.
            enableHighAccuracy: true,

            // How long does the API have to return the position before throwing an error?
            timeout: 3 * DURATION.SECONDS,

            // If a location exists in the device cache, how old can it be before it’s no longer valuable to your app?
            maximumAge: 1 * DURATION.MINUTES
          }
        );
      } else {
        reject("No Permissions");
      }
    });
  });
}

/**
 * @description Generate valid UUID from deviceId info (only for android)
 *
 * @param {string} deviceId - unique id of androd device (16 digits)
 */
export const androidDeviceIDToPseudoUUID = deviceId => {
  const id = deviceId.toString();
  return `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(
    12,
    id.length
  )}-${id.substring(0, 4)}-${id.substring(4, id.length)}`;
};

export const compareArrays = (obj1, obj2) => {
  var VALUE_CREATED = "created";
  var VALUE_UPDATED = "updated";
  var VALUE_DELETED = "deleted";
  var VALUE_UNCHANGED = "unchanged";

  function map(obj1, obj2) {
    if (isValue(obj1) || isValue(obj2)) {
      return {
        type: compareValues(obj1, obj2),
        old: obj1,
        new: obj2
      };
    }

    var diff = {};
    for (var key in obj1) {
      if (isFunction(obj1[key])) {
        continue;
      }

      var value2 = undefined;
      if ("undefined" != typeof obj2[key]) {
        value2 = obj2[key];
      }

      diff[key] = map(obj1[key], value2);
    }
    for (var key in obj2) {
      if (isFunction(obj2[key]) || "undefined" != typeof diff[key]) {
        continue;
      }

      diff[key] = map(undefined, obj2[key]);
    }

    return diff;
  }

  function compareValues(value1, value2) {
    if (value1 === value2) {
      return VALUE_UNCHANGED;
    }
    if ("undefined" == typeof value1) {
      return VALUE_CREATED;
    }
    if ("undefined" == typeof value2) {
      return VALUE_DELETED;
    }

    return VALUE_UPDATED;
  }

  function isFunction(obj) {
    return {}.toString.apply(obj) === "[object Function]";
  }

  function isArray(obj) {
    return {}.toString.apply(obj) === "[object Array]";
  }

  function isObject(obj) {
    return {}.toString.apply(obj) === "[object Object]";
  }

  function isValue(obj) {
    return !isObject(obj) && !isArray(obj);
  }

  return map(obj1, obj2);
};

/**
 * @description Define if the current view matches with the viewName
 * @param {AppNavigation} navigation redux-navigation object
 * @param {String} viewName name of current view
 *
 * @returns {Boolean} true when it's match and false if isn't
 */
export const isCurrentView = (navigation, viewName) =>
  navigation.state.routes[0].routes[
    navigation.state.routes[0].routes.length - 1
  ].routeName === viewName;

/**
 * @description Get the routename of the previous view
 * @param {AppNavigation} navigation redux-navigation object
 * @param {Array} routes routes' stack
 *
 * @returns {String} name of the previous route
 */
export const previousView = routes =>
  routes.length > 1 && routes[routes.length - 2].routeName;

/**
 * @description Validates a phone number
 * @param {String} phoneNumber phone number to check
 *
 * @returns {Boolean} true when it's match and false if isn't
 */
export const validatePhoneNumber = phoneNumber => {
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/g;
  return phoneRegex.test(phoneNumber);
};

export const emtpyArray = array => (array && array.length > 0 ? array : []);

/**
 * @description Generic function to display form errors
 *
 * @param {array} Form errors
 */
export const displayFormErrors = (...errors) => {
  const errorStr = errors.reduce((last, current) => {
    curr = "";
    if (current) {
      curr = `- ${current}\n`;
    }
    return last.concat(curr);
  }, "");

  displayAlert(errorStr);
};

export const displayAlert = message => {
  Alert.alert("Error", message, [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]);
};

export const displayTemporaryErrorAlert = () =>
  displayAlert(I18n.t("temporaryError"));

export const is500Response = error => {
  const status = Number(error.response.status);

  return status >= 500 && status < 599;
};

export const is403Response = error => {
  const status = Number(error.status);

  return status === 403;
};
/**
 * @description Generic function to validate only letters
 *
 * @param {String} value string to check for only letter
 *
 * @returns {Boolean} true when it's match and false if isn't
 */
export const onlyLetters = str => {
  let reg = new RegExp(INVALID_NAME_REGEX);
  return reg.test(str);
};

/**
 * @description Generic function to validate only alpha numeric characters
 *
 * @param {String} value string to check for only alpha numeric characters
 *
 * @returns {Boolean} true when it's match and false if isn't
 */
export const onlyAlphaNumeric = str => {
  const alphaNumberRegex = /^[a-zA-Z0-9_.={}+~^&*/$#!?{}%°¬|@-]+$/;
  //const patt = new RegExp(EMAIL_REGEX);
  return alphaNumberRegex.test(str);
};

/**
 * @description Display an alert if not into operating hours EDT
 */
export const checkOperatingHours = (
  withinAnOur = false,
  languagePrimary,
  languageSecondary
) => {
  const OperatingHoursInit = 10;
  const OperatingHoursEnd = 19 - (withinAnOur ? 1 : 0);
  const OperatingHoursEndJPN = 7;
  const OperatingHoursInitJPN = 19 - (withinAnOur ? 1 : 0);
  const EDT_hour = moment()
    .utcOffset(-240) // TimeZone
    .hours();
  let showModal = false;
  if (languagePrimary || languageSecondary) {
    if (
      languagePrimary === "cmn" ||
      languageSecondary === "cmn" ||
      languagePrimary === "yue" ||
      languageSecondary === "yue"
    ) {
      if (EDT_hour <= OperatingHoursInit && EDT_hour >= OperatingHoursEnd) {
        showModal = true;
      }
    }
    if (languagePrimary === "jpn" || languageSecondary === "jpn") {
      if (
        EDT_hour <= OperatingHoursInitJPN &&
        EDT_hour >= OperatingHoursEndJPN
      ) {
        showModal = true;
      }
    }
  } else {
    showModal = true;
  }
  if (showModal) {
    Alert.alert(
      // This is Alert Dialog Title
      I18n.t("operatingHoursAlertTitle"),

      // This is Alert Dialog Message.
      I18n.t("operatingHoursAlertMessage"),
      [
        // First Text Button in Alert Dialog.
        {
          text: I18n.t("ok")
        }
      ]
    );
  }
};
