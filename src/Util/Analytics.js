import branch, {BranchEvent} from "react-native-branch";
import segment from "@segment/analytics-react-native";
import {recordNavigationEvent as forensicsNavEvent} from "./Forensics"

// app-level events, mapping them to specific segment/branch events
export const EVENTS = {
  SESSION_END: {
    BRANCH: BranchEvent.Purchase,
    SEGMENT: "Order Completed"
  },
  SESSION_ATTEMPTED: {
    BRANCH: BranchEvent.InitiatePurchase,
    SEGMENT: "Checkout Started"
  },
  REGISTRATION_BEGAN: {
    BRANCH: BranchEvent.AddToCart,
    SEGMENT: "Product Added"
  },
  // todo: implement in authreducer2.registerNewUser
  REGISTRATION_COMPLETED: {}
};

// only use this for navigation events
export const recordNavigationEvent = (screenName) => {
  try {
    segment.screen(screenName);
    forensicsNavEvent(screenName);  
  } catch (err) {
    console.log(err);
  }
};

// use this for any general analytics event not related to 
// nav.  Events referenced here should be defined in the `EVENTS`
// constants above
export const recordAnalyticsEvent = (name, params = null) => {
  try {
    // send custom event to Branch
    if (!!EVENTS[name] && !!EVENTS[name].BRANCH) {
      new BranchEvent(EVENTS[name].BRANCH, null, params).logEvent();
    }

    // send custom event to Segment
    if (!!EVENTS[name] && !!EVENTS[name].SEGMENT) {
      segment.track(EVENTS[name].SEGMENT, params);
    }
  } catch (err) {
    console.log(err);
  }
};

