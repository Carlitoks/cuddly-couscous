import { DURATION } from "../Util/Constants";

export const URL = "https://api.gps.network/v1/"; // Jeenie staging server
export const TOKBOX_APIKEY = "46152272";
export const stripePublishableKey = "pk_test_VJ3Qq3KbSrkFGIjughMh88Hv";
export const instabugToken = "83f07c5f8dcb8496e3287f280ce6f61d";
export const codePushiOSKey = "8dUSnL_VRozMNV3bqiZE4FbvUdnxHJr2wBnk7";
export const codePushAndroidKey = "WRbh3xWkrhDWABmePyWNSisdGTvyrkW_H_SnyX";
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