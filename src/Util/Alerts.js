import { Alert } from "react-native";
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

/**
 * @description Generic function to display time alerts
 *
 * @param {Number} time actual extra time
 */
export const displayTimeAlert = (time, timeEvent) => {
  Alert.alert(
    I18n.t("extraTime3"),
    "",
    [
      /* {
        text: I18n.t("extraTimeA1"),
        onPress: () => {
          timeEvent({
            red: false,
            showAlert: false,
            extraTime: time + 5 * 60
          });
        }
      },*/
      {
        text: I18n.t("ok"),
        onPress: () => {
          timeEvent({
            timeBtn: true
          });
        }
      }
    ],
    { cancelable: false }
  );
};

/**
 * @description Generic function to display alert before end the call
 *
 * @param {Function} cancelCall action to invoke
 */
export const displayEndCall = cancelCall => {
  Alert.alert(
    I18n.t("endCall"),
    I18n.t("logOutConfirmation"),
    [
      {
        text: I18n.t("cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: I18n.t("endCall"),
        onPress: async () => cancelCall()
      }
    ],
    { cancelable: true }
  );
};
