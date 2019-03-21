import { StyleSheet } from "react-native";

// TODO: portrait vs landscape styles

export default styles = StyleSheet.create({

  sessionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  session: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  
  // NOTE: not possible to get this fully functional without updates to the lib:
  // see: https://github.com/opentok/opentok-react-native/issues/162
  primaryFeedToggle: {
    position: "absolute",
    top: 50,
    right: 10,
    height: 125,
    width: 75,
    zIndex: 99999999,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});

export const subscriberStyles = (videoEnabled) => {
  return {
    subscriberContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  
    subscriber: {
      height: "100%",
      height: "100%"
    },
  };
};

export const publisherStyles = (videoEnabled) => {
  return {
    publisherContainer: {
      display: videoEnabled ? 'flex' : 'none',
      position: "absolute",
      top: videoEnabled ? 50 : -50,
      right: videoEnabled ? 10 : -10,
      height: videoEnabled ? 125 : 0,
      width: videoEnabled ? 75 : 0
    },
  
    publisher: {
      height: videoEnabled ? "100%" : 0,
      width: videoEnabled ? "100%" : 0,
    },
  };
};
