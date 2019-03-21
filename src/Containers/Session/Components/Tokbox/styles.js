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

  publisherContainerEnabled: {
    display: 'flex',
    position: "absolute",
    top: 50,
    right: 10,
    height: 125,
    width: 75,
  },
  publisherContainerDisabled: {
    display: 'none',
    position: "absolute",
    top: -50,
    right: -10,
    height: 0,
    width: 0
  },
  publisherEnabled: {
    height: "100%",
    width: "100%",
  },
  publisherDisabled: {
    height: 0,
    width: 0,
  },

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
