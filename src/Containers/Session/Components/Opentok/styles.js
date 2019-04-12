import { StyleSheet } from "react-native";
import colors from "../../../../Themes/Colors";
import Color from "color";
import { isIphoneXorAbove } from "../../../../Util/Devices";

// TODO: portrait vs landscape styles

export default styles = StyleSheet.create({

  sessionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Color(colors.backgroundBlue).darken(0.2)
  },
  session: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },


  // https://github.com/opentok/opentok-react-native/issues/162
  //
  // because fo this, we have to force move the publisher out of view, because
  // just hiding it doesn't work on Android
  publisherContainerEnabled: {
    display: 'flex',
    position: "absolute",
    top: isIphoneXorAbove() ? 84 : 50,
    right: 10,
    height: 125,
    width: 75,
    zIndex: 99998,
  },
  publisherContainerDisabled: {
    display: 'none',
    position: "absolute",
    top: -200,
    right: -100,
    height: 0,
    width: 0
  },
  publisherEnabled: {
    height: "100%",
    width: "100%",
    zIndex: 99999,
  },
  publisherDisabled: {
    display: 'none',
    position: "absolute",
    top: -200,
    right: -100,
    height: 0,
    width: 0
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
    width: "100%"
  },

  // NOTE: not possible to get this fully functional without updates to the lib:
  // see: https://github.com/opentok/opentok-react-native/issues/162
  primaryFeedToggle: {
    position: "absolute",
    top: isIphoneXorAbove() ? 94 : 50,
    right: 10,
    height: 125,
    width: 75,
    zIndex: 99999,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
