import I18n from "../I18n/I18n";

export const EMAIL_REGEX =
  '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const USER_NAME = "([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*";

export const SUPPORTED_LANGS = ["eng", "cmn", "yue"];

export const LANG_CODES = new Map([
  ["eng", "English"],
  ["spa", "Spanish"],
  ["cmn", "Chinese (Mandarin)"],
  ["yue", "Chinese (Cantonese)"]
]);

//Set cost to 0 until free is up
export const TIME_OPTIONS = [
  { duration: 8, cost: 0 },
  { duration: 15, cost: 0 },
  { duration: 30, cost: 0 },
  { duration: 60, cost: 0 }
];

export const REASON = {
  RETRY: "retry",
  CANCEL: "cancel",
  TIMEOUT: "timeout",
  DONE: "done"
};

export const VIDEO_WARNING = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
  TYPE: "WARNING"
};

export const STATUS_TOKBOX = {
  DISCONECTED: 0,
  CONECTED: 1,
  ERROR: 2,
  STREAM: 3,
  DESTROY: 4
};

export const TOKBOX_EVENTS = {
  TOGGLE_VIDEO_CUSTOMER: "TOGGLE_VIDEO_CUSTOMER",
  TOGGLE_VIDEO_LINGUIST: "TOGGLE_VIDEO_LINGUIST"
};

export const SETTINGS = {
  CUSTOMER: "callCustomerSettings",
  LINGUIST: "callLinguistSettings"
};

export const getLocalizedCategories = locale => ({
  airport: I18n.t("airport", { locale: locale }),
  transit: I18n.t("transit", { locale: locale }),
  hotel: I18n.t("hotel", { locale: locale }),
  dining: I18n.t("dining", { locale: locale }),
  retail: I18n.t("retail", { locale: locale }),
  conversations: I18n.t("conversations", { locale: locale }),
  qr: I18n.t("qr", { locale: locale }),
  other: I18n.t("other", { locale: locale }),
  general: I18n.t("general", { locale: locale })
});

export const TIME = {
  TIMEOUT: 60,
  RECONNECT: 50,
  HIDEMODAL: 55
};

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios"
};

export const VIBRATE_PATTERN = [1000, 2000, 3000];

export const CAMERA = {
  FRONT: "front",
  BACK: "back"
};
