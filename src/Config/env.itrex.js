import { DURATION } from "../Util/Constants";

export const URL = "http://18.191.116.237:5110/v1/"; // ITRex dev server
export const TOKBOX_APIKEY = "46202112";
export const stripePublishableKey = "pk_test_VJ3Qq3KbSrkFGIjughMh88Hv";
export const instabugToken = "83f07c5f8dcb8496e3287f280ce6f61d";
export const codePushiOSKey = "5GPetYkgqkaZiSXSAzjbQiRTHsu1H1lJEb-Rm";
export const codePushAndroidKey = "Ltk63ltZ1T_1317CwYx0MpxKJLLJHk_MVZZC7";
export const segmentKey = "5CzcqoWWNLzu6F9XjIUMIV2gQXryOxdk";
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