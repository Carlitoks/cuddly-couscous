import I18n from "../I18n/I18n";

export const EMAIL_REGEX =
  '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const USER_NAME = "([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*";

export const CREDIT_CARD_FORMATS = [
  "\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}",
  "\\d{4}\\s\\d{6}\\s\\d{5}",
  "\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{2}"
];

export const ONLY_LETTER_REGEX = "^[a-zA-Z]+$";

// check for special chars and numbers
export const INVALID_NAME_REGEX = /[!@#\$%\^&\*\(\)'"\+-={}\[\];:\\\/\?\.,<>~`_\|0-9\s]+/gm;

// TODO: refactor and remove these constants, any language options should be based off the lists in `src/Config/Languages.js`
export const SUPPORTED_LANGS = ["eng", "cmn", "yue", "jpn", 'spa', 'por', 'fra','ita','deu'];

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
  TIMEOUT: 70,
  RECONNECT: 50,
  HIDEMODAL: 55,
  CALL_TIMEOUT: 65,
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

export const SOUNDS = {
  END_CALL: 'elastic_done3.wav',
  INCOMING_CALL: 'elastic_musical5.wav',
  EXTRA_TIME: 'elastic_done5.wav',
  DISCONNECTED: 'Elastic_Error1.wav',
  RECONNECTED: 'Elastic_Done11.wav'
};

export const DURATION = {
  MILLIS: 1,
  SECONDS: 1000,
  MINUTES: 1000 * 60,
  HOURS: 1000 * 60 * 60,
  DAYS: 1000 * 60 * 60 * 24
};

export const CUSTOMER_FREE_MINUTES = 5;

export const SESSION = {
  START: {
    NORMAL: 'normal', // customer initiated a new call
    RECONNECT: 'reconnect', // customer is attempting to connect again to their previous linguist
    RETRY_CANCEL: "retry_cancel", // customer is trying another call after the previous one was canceled by the remote user
    RETRY_FAILURE: 'retry_failure', // customer is trying another call after previous one failed to initially connect
    RETRY_TIMEOUT: 'retry_timeout', // customer is trying another call after previous one did not result in a match
    RETRY_DISCONNECT: 'retry_disconnect' // customer is trying another call after previous one was disconnected mid call
  },
  END: {
    DONE: 'done', // call ended normally by one side
    CANCEL: 'cancel', // call ended before connection was established between both sides
    TIMEOUT: 'timeout', // call ended because no linguist accepted the call within the time limit
    TIME_EXCEEDED: 'time_exceeded', // session had a hard time limit, so call was ended
    BALANCE_EXCEEDED: 'balance_exceeded', // paying customer's balance was empty, so call was ended
    FAILURE_LOCAL: 'failure_local', // call ended because local side failed to initially connect to the session
    FAILURE_REMOTE: 'failure_remote', // call ended because the remote side failed to initially connect to the session
    DISCONNECT_LOCAL: 'disconnect_local', // call ended because local side disconnected during the session
    DISCONNECT_REMOTE: 'disconnect_remote', // call ended because remote side disocnnected during the session
    ABORTED: 'aborted' // call was ended after creation by someone or a process other than the participants
  },
  TIME: {
    MATCH: 70 * DURATION.SECONDS,
    CONNECT: 30 * DURATION.SECONDS,
    RECONNECT: 10 * DURATION.SECONDS,
  }
};
