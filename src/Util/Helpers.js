/**
 * @description Seconds to minutes and seconds String
 * 
 * @param {number} s - Time in seconds
 */
export const fmtMSS = s => {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
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
export const getGeolocationCoords = () =>
  // Turning Callback call into a Promise
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      {
        // Allows you to get the most accurate location. Due to how it gets the location (via GPS) it may be slower to return a result but it will be more accurate when enabled.
        enableHighAccuracy: true,

        // How long does the API have to return the position before throwing an error?
        timeout: 20000,

        // If a location exists in the device cache, how old can it be before it’s no longer valuable to your app?
        maximumAge: 3600000
      }
    );
  });

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
