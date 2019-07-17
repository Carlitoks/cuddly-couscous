import Instabug from "instabug-reactnative";
import { instabugToken } from "../Config/env";
import { processColor } from "react-native";

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
    case "zh-hant": return Instabug.locale.chineseTraditional;
    case "zh-hans": return Instabug.locale.chineseSimplified;
    case "ja": return Instabug.locale.japanese;
    case "es": return Instabug.locale.spanish;
    case "pt": return Instabug.locale.portugueseBrazil;
    case "ko": return Instabug.locale.korean;
    case "fr": return Instabug.locale.french;
    case "it": return Instabug.locale.italian;
    case "de": return Instabug.locale.german;
    default: return Instabug.locale.english;
  }
};

export const setInstabugLanguage = (locale) => {
  Instabug.setLocale(getInstaBugLanguage(locale.toLocaleLowerCase()));
};

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
