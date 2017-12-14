import { AsyncStorage } from "react-native";

const saveAsync = (key, value, isJson) => {
  if (isJson) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    return AsyncStorage.setItem(key, value);
  }
};

const getAsync = (key) => {
  return AsyncStorage.getItem(key);
};
export { saveAsync, getAsync };