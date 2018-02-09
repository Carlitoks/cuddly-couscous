import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  topView: {
    width: "100%",
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        height: 20
      }
    })
  },
  topViewLarge: {
    width: "100%",
    ...Platform.select({
      ios: {
        height: 32
      }
    })
  }
});
