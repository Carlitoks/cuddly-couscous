import { DURATION } from "../Util/Constants";

export const URL = "http://10.0.2.2:5110/v1/"; // for android emulator: https://developer.android.com/studio/run/emulator-networking
export const TOKBOX_APIKEY = "46126532";
export const stripePublishableKey = "pk_test_VJ3Qq3KbSrkFGIjughMh88Hv";
export const instabugToken = "";
export const codePushiOSKey = "";
export const codePushAndroidKey = "";
export const segmentKey = "yEyPKFgLAwIKqKb2H47V8xfD7yLQRlTU";
export const forensicsEnabled = true;

export const promptUpdate = false;

export const CACHE = {
  SCENARIOS: 2 * DURATION.MINUTES,
  CONFIG: 2 * DURATION.MINUTES,
  USER: 30 * DURATION.SECONDS,
  SUBSCRIPTIONS: 1 * DURATION.MINUTES,
  CALL_HISTORY: 5 * DURATION.MINUTES,
  MINUTE_PACKAGES: 5 * DURATION.MINUTES,
};
