import { DURATION } from "../Util/Constants";

export const URL = "https://api.jeenie.com/v1/";
export const TOKBOX_APIKEY = "46003062";
export const stripePublishableKey = "pk_live_IjwD7foeSq0ox5Q3y6GQ3jkv";
export const instabugToken = "1ef778fa18d0379f12f7ebaed42eba02";
export const codePushiOSKey = "0KJSeDnom8nacxfuo-r5MJ7m8giMBJSnwBnJ7";
export const codePushAndroidKey = "WFjG18TuRC9phOCXffSkV8o6B5vWHkurdr21Q";
export const segmentKey = "tDhw3qpxNwb0re67M8haeiQtz66r55XX";
export const forensicsEnabled = true;

export const promptUpdate = false;

export const CACHE = {
  SCENARIOS: 3 * DURATION.HOURS,
  CONFIG: 3 * DURATION.HOURS,
  USER: 10 * DURATION.MINUTES,
  SUBSCRIPTIONS: 1 * DURATION.HOURS,
  CALL_HISTORY: 5 * DURATION.MINUTES,
  MINUTE_PACKAGES: 3 * DURATION.HOURS,
};