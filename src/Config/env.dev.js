import { DURATION } from "../Util/Constants";

export const URL = "http://3.16.186.26:5110/v1/"; // TV dev server
export const TOKBOX_APIKEY = "46126532";
export const stripePublishableKey = "pk_test_VJ3Qq3KbSrkFGIjughMh88Hv";
export const instabugToken = "83f07c5f8dcb8496e3287f280ce6f61d";
export const codePushiOSKey = "u8WlmDSlfU84iwqdWEaGkq_f8zirSyU-PJqTQ";
export const codePushAndroidKey = "aeWlpL31mCzb1sgr9I-gpvuImZmarJWyDJcpm";
export const segmentKey = "yEyPKFgLAwIKqKb2H47V8xfD7yLQRlTU";
export const forensicsEnabled = true;

export const promptUpdate = false;

export const CACHE = {
  SCENARIOS: 5 * DURATION.MINUTES,
  CONFIG: 5 * DURATION.MINUTES,
  USER: 30 * DURATION.SECONDS,
  SUBSCRIPTIONS: 1 * DURATION.HOURS,
  CALL_HISTORY: 5 * DURATION.MINUTES,
  MINUTE_PACKAGES: 5 * DURATION.MINUTES,
};
