import { DURATION } from "../Util/Constants";

export const URL = "http://74.208.205.2:5000/v1/";
export const TOKBOX_APIKEY = "46003062";
export const stripePublishableKey = "";
export const instabugToken = "";
export const codePushiOSKey = "";
export const codePushAndroidKey = "";
export const analyticsKey = "";
export const forensicsEnabled = false;

export const promptUpdate = false;

export const CACHE = {
  SCENARIOS: 5 * DURATION.MINUTES,
  CONFIG: 5 * DURATION.MINUTES,
  USER: 30 * DURATION.SECONDS,
  SUBSCRIPTIONS: 1 * DURATION.HOURS,
  CALL_HISTORY: 5 * DURATION.MINUTES,
  MINUTE_PACKAGES: 5 * DURATION.MINUTES,
};