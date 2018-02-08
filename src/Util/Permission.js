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
