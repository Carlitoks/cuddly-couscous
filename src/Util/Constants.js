import I18n from "../I18n/I18n";

export const EMAIL_REGEX =
  '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const USER_NAME = "([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*";

export const SUPPORTED_LANGS = ["eng", "cmn"];

export const LANG_CODES = new Map([
  ["eng", "English"],
  ["spa", "Spanish"],
  ["cmn", "Chinese (Mandarin)"],
  ["yue", "Chinese (Cantonese)"]
]);

export const LAUNCHSCREENENTRIES = [
  {
    title: I18n.t("lauchScreenSwipe1"),
    illustration: "lauchScreenSwipe1"
  },
  {
    title: I18n.t("lauchScreenSwipe2"),
    illustration: "lauchScreenSwipe2"
  },
  {
    title: I18n.t("lauchScreenSwipe3"),
    illustration: "lauchScreenSwipe3"
  },
  {
    title: I18n.t("lauchScreenSwipe4"),
    illustration: "lauchScreenSwipe4"
  },
  {
    title: I18n.t("lauchScreenSwipe5"),
    illustration: "lauchScreenSwipe5"
  }
];
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

export const STATUS_TOKBOX = {
  DISCONECTED: 0,
  CONECTED: 1,
  ERROR: 2,
  STREAM: 3
};

export const TOKBOX_EVENTS = {
  TOGGLE_VIDEO_CUSTOMER: "TOGGLE_VIDEO_CUSTOMER",
  TOGGLE_VIDEO_LINGUIST: "TOGGLE_VIDEO_LINGUIST"
};

export const SETTINGS = {
  CUSTOMER: "callCustomerSettings",
  LINGUIST: "callLinguistSettings"
};

export const CATEGORIES = {
  airport: I18n.t("airport"),
  transit: I18n.t("transit"),
  hotel: I18n.t("hotel"),
  dining: I18n.t("dining"),
  retail: I18n.t("retail"),
  conversations: I18n.t("conversations"),
  qr: I18n.t("qr"),
  other: I18n.t("other"),
  general: I18n.t("general")
};

export const TIME = {
  TIMEOUT: 60,
  RECONNECT: 50,
  HIDEMODAL: 55
};

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios"
};
