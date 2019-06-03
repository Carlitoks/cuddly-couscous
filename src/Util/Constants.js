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
export const INVALID_NAME_REGEX = /[!@#\$%\^&\*\(\)'"\+-={}\[\];:\\\/\?\.,<>~`_\|0-9]+/gm;

export const VIDEO_WARNING = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
  TYPE: "WARNING"
};

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios"
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
    MATCH: 70 * DURATION.SECONDS, // time to wait for a linguist to accept call before considering session a timeout
    CONNECT: 45 * DURATION.SECONDS, // time to wait before considering initial connction attempt a failure; keep this above 30s, because some OT errors will only fire after 30s
    RECONNECT: 10 * DURATION.SECONDS, // time to wait before showing reconnection options
    END_SOON_WARNING: 2 * DURATION.MINUTES // show warning that call is ending soon when this much time is remaining
  }
};

export const PERMISSIONS = {
  CAMERA: 'camera',
  MIC: 'microphone',
  LOCATION: 'location',
  PHOTO: "photo"
};
