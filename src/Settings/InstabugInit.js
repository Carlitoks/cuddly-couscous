import Instabug from "instabug-reactnative";
import { instabugToken } from "../Config/env";
import I18n from "../I18n/I18n";
import { processColor } from "react-native";

const locale = I18n.currentLocale()
  .toLocaleLowerCase();

const processLocale = locale => {
  let shortLocale = locale.substring(0, 2);
  let instaBugLocale = "";

  if (shortLocale === "zh") {
    instaBugLocale = locale.substring(0, 7);
  } else {
    instaBugLocale = shortLocale ? shortLocale : "en";
  }
  return instaBugLocale;
};

const getInstaBugLanguage = locale => {
  const shortLocale = processLocale(locale);
  switch (shortLocale) {
    case "zh-hant":
      return Instabug.locale.chineseTraditional;
    case "zh-hans":
      return Instabug.locale.chineseSimplified;
    case "ja":
      return Instabug.locale.japanese;
    case "es":
      return Instabug.locale.spanish;
    default:
      return Instabug.locale.english;
  }
};

const instaBugLanguage = getInstaBugLanguage(locale);


const InitInstabug = (firstName,
                        lastName,
                        preferredName,
                        linguistProfile,
                        email,
                        deviceId,
                        sessionId,
                        eventId) => {

  const name = preferredName ? preferredName : firstName;
  const role = !!linguistProfile ? "Linguist" : "Customer";
  const device = !!deviceId ? ` DeviceID: ${deviceId} ` : "";
  const session = !!sessionId ? ` SessionID: ${sessionId} ` : "";
  const event = !!eventId ? ` EventID: ${eventId} ` : "";
  try {
    Instabug.startWithToken(instabugToken, [Instabug.invocationEvent.shake]);
    Instabug.setLocale(instaBugLanguage);
    Instabug.setViewHierarchyEnabled(false);
    Instabug.setPromptOptionsEnabled(false, true, true);
    Instabug.setEnabledAttachmentTypes(true, true, true, true, true);
    Instabug.setPrimaryColor(processColor("#52389d"));
    if (email) {
      Instabug.setUserData(
        `${name} ${lastName} (${role})${device}${session}${event}`
      );
      Instabug.setUserEmail(email);
    } else {
      Instabug.setUserData(`User  anonymous`);
    }
  } catch (e) {
    console.log("Error on Instabug");
  }
};

export {
  InitInstabug,
};
