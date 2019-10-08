import {BranchEvent} from "react-native-branch";
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
  REGISTRATION_COMPLETED: {
    BRANCH: BranchEvent.CompleteRegistration,
    SEGMENT: "Registration Completed",
  },
  PACKAGE_PURCHASED: {
    BRANCH: "solo_purchase_package",
    SEGMENT: "solo_purchase_package"
  },
  PAYMENT_DETAILS_ADDED: {
    BRANCH: BranchEvent.AddPaymentInfo,
    SEGMENT: "Payment Info Entered",
  },
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
export const recordAnalyticsEvent = (map, params = null) => {
  // send custom event to Branch
  try {
    if (!!map.BRANCH) {
      const evt = new BranchEvent(map.BRANCH);
      // branch custom data MUST be strings, so casting any 
      // received params to strings
      if (!!params) {
        let d = {};
        for (let i in params) {
          d[i] = String(params[i]);
        }
        evt.customData = d;  
      }
      evt.logEvent();
    }
  } catch (e) {
    console.log(e);
  }

  // send custom event to Segment
  try {
    if (map.SEGMENT) {
      if (!!params) {
        segment.track(map.SEGMENT, params);
      } else {
        segment.track(map.SEGMENT);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
