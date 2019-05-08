import { Alert } from "react-native";
import Permissions from "react-native-permissions";
import I18n from "../I18n/I18n";

export const setPermission = element => {
  return Permissions.request(element).then(response => {
    return response;

    // Returns once the user has chosen to 'allow' or to 'not allow' access
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    /*if (response == "denied" || response == "restricted") {
        

    }*/
  });
};

export const displayOpenSettingsAlert = () => {
  Alert.alert(
    I18n.t("permissionDenied"),
    I18n.t("changeSettings"),
    [
      {
        text: I18n.t("cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: I18n.t("settings"),
        onPress: () => {
          Permissions.openSettings().then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
          });
        }
      }
    ],
    { cancelable: true }
  );
};

/**
 * @description  Function to check for all phone permissions needed for the app
 *
 * @param {function} updateSetting Reducer function to update values on ActiveSessionReducer
 */
export const checkForAllPermissions = updateSetting => {
  const appPermissions = ["camera", "microphone", "photo", "location"];
  let appPermissionsStatus = {};

  Permissions.checkMultiple(appPermissions)
    .then(PermissionsStatus => {
      appPermissionsStatus = PermissionsStatus;
    })
    .then(() => {
      if (
        appPermissionsStatus.camera == "undetermined" ||
        appPermissionsStatus.camera == "denied"
      ) {
        return Permissions.request("camera");
      }
    })
    .then(cameraResponse => {
      if (cameraResponse == "authorized") {
        updateSetting({ video: true });
      }
    })
    .then(() => {
      if (
        appPermissionsStatus.microphone == "undetermined" ||
        appPermissionsStatus.microphone == "denied"
      ) {
        return Permissions.request("microphone");
      }
    })
    .then(microphoneResponse => {
      if (microphoneResponse == "authorized") {
        updateSetting({ mic: true });
      }
    })
    .then(() => {
      if (
        appPermissionsStatus.location == "undetermined" ||
        appPermissionsStatus.location == "denied"
      ) {
        return Permissions.request("location");
      }
    })
    .then(() => {
      if (
        appPermissionsStatus.photo == "undetermined" ||
        appPermissionsStatus.photo == "denied"
      ) {
        return Permissions.request("photo");
      }
    });
};


/**
 * @description  Function to check for all phone permissions needed for the call
 *
 * @param {function} updateSetting Reducer function to update values on ActiveSessionReducer
 */
export const checkCallPermissions = updateSetting => {
  const appPermissions = ["camera", "microphone"];
  let appPermissionsStatus = {};

  Permissions.checkMultiple(appPermissions)
    .then(PermissionsStatus => {
      appPermissionsStatus = PermissionsStatus;
    })
    .then(() => {
      if (
        appPermissionsStatus.camera == "undetermined" ||
        appPermissionsStatus.camera == "denied"
      ) {
        return Permissions.request("camera");
      }
    })
    .then(cameraResponse => {
      if (cameraResponse == "authorized") {
        updateSetting({ video: true });
      }
    })
    .then(() => {
      if (
        appPermissionsStatus.microphone == "undetermined" ||
        appPermissionsStatus.microphone == "denied"
      ) {
        return Permissions.request("microphone");
      }
    })
    .then(microphoneResponse => {
      if (microphoneResponse == "authorized") {
        updateSetting({ mic: true });
      }
    });
};

/**
 * @description  Function to check for all phone permissions needed for the call
 *
 * @param {function} updateSetting Reducer function to update values on ActiveSessionReducer
 */
export const checkRegisterCallPermissions = updateSetting => {
  const appPermissions = ["camera", "microphone"];
  let appPermissionsStatus = {};

  Permissions.checkMultiple(appPermissions)
    .then(PermissionsStatus => {
      appPermissionsStatus = PermissionsStatus;
    })
    .then(() => {
      if (
        appPermissionsStatus.camera == "undetermined" ||
        appPermissionsStatus.camera == "restricted" ||
        appPermissionsStatus.camera == "denied"
      ) {
        return Permissions.request("camera");
      }
    })
    .then(cameraResponse => {
      if (cameraResponse == "authorized") {
        updateSetting({ video: true });
      }else{
        updateSetting({ video: false });
      }
    })
    .then(() => {
      if (
        appPermissionsStatus.microphone == "undetermined" ||
        appPermissionsStatus.microphone == "restricted" ||
        appPermissionsStatus.microphone == "denied"
      ) {
        return Permissions.request("microphone");
      }
    })
    .then(microphoneResponse => {
      if (microphoneResponse == "authorized") {
        updateSetting({ mic: true });
      }else{
        updateSetting({ mic: false });
      }
    });
};

export const ensurePermissions = (perms) => {
  return new Promise((resolve) => {
    let results = {};
    let missing = [];

    Permissions.checkMultiple(perms)
    .then((res) => {
      Object.keys(perms).forEach((perm) => {
        results[perm] = res[perm];
        if (res[perm] !== "authorized") {
          missing.push(perm);
        }
      })

      if (missing.length > 0) {
        return requestPermissions(perms);
      }
    })
    .then(() => {
      if (missing.length == 0) {
        resolve(results);
      } else {
        Permissions.checkMultiple(perms).then((res) => {
          resolve(res);
        });
      }
    })
  })
}

export const requestPermissions = async (perms) => {
  let promises = [];
  for (const perm of perms) {
    promises.push(await Permissions.request(perm));
  }
  return Promise.all(promises);
}