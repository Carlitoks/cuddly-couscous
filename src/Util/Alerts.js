import { Alert, Platform, Linking } from "react-native";
import I18n from "../I18n/I18n";

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

  Alert.alert("Error", errorStr, [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]);
};

export const displayNoNetworkConnectionAlert = () => {
  Alert.alert(
    I18n.t("thereNoInternetConnection"),
    I18n.t("checkYourConnection")
  );
};

export const displayUpdateAvailableAlert = () => {
  const url = Platform.OS == "ios" ? "itms-apps://itunes.apple.com/app/apple-store/id1341871432?mt=8" : "market://details?id=com.newsolo";
  Alert.alert(
    I18n.t("appUpdateAlert.title"),
    I18n.t("appUpdateAlert.description"),
    [
      {
        text: I18n.t("actions.ok"),
        onPress: () => {
          try {
            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.log("Can't handle url: " + url);
              } else {
                return Linking.openURL(url);
              }
            }).catch(err => console.error('An error occurred', err));
          } catch (e) {
            console.log('error from linking', e);
          }
        }
      }
    ],
    { cancelable: false }
  );
};