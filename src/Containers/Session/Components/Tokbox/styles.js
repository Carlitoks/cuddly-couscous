import { StyleSheet } from "react-native";

// TODO: portrait vs landscape styles

export default styles = StyleSheet.create({
  //
  sessionContainer: {
    flex: 1,
    backgroundColor: "#44aa44",
    padding: 20
  },

  //
  session: {
    flex: 1,
    backgroundColor: "#66cc66",
    padding: 20
  },

  //
  subscriberContainer: {
    backgroundColor: "#aa4444",
    padding: 20
  },

  //
  subscriber: {
    height: 100,
    width: 100,
    backgroundColor: "#cc6666",
    padding: 20
  },
  
  //
  publisherContainer: {
    backgroundColor: "#4444aa",
    padding: 20,
    zIndex: 0,
  },

  // 
  publisher: {
    height: 100,
    width: 100,
    backgroundColor: "#6666cc",
    padding: 20,
    zIndex: 0,
  },
});
