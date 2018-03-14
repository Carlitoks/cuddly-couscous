import I18n from "../I18n/I18n";

export const EMAIL_REGEX =
  '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const USER_NAME = "([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*";

export const LANG_CODES = new Map([
  ["eng", "English"],
  ["spa", "Spanish"],
  ["cmn", "Chinese (Mandarin)"],
  ["yue", "Chinese (Cantonese)"]
]);

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
  other: I18n.t("other")
};

export const TIME = {
  TIMEOUT: 60,
  RECONNECT: 50,
  HIDEMODAL: 55
};
