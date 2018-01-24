import { AsyncStorage } from "react-native";
import { Promise } from "bluebird";

export const clearState = () => {
  try {
    AsyncStorage.clear();
  } catch (err) {
    //
  }
};

export const saveState = async state => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem("onvoy-store", serializedState);

    return true;
  } catch (err) {
    // Ignore writing errors
  }
};

export const loadState = async key => {
  try {
    const serializedState = await AsyncStorage.getItem("onvoy-store");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const dumpAsyncStorage = () =>
  AsyncStorage.getAllKeys().then(keys =>
    Promise.reduce(
      keys,
      (result, key) => {
        return AsyncStorage.getItem(key).then(value => {
          result[key] = value;
          return result;
        });
      },
      {}
    )
  );
