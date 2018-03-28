import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  topView: {
    width: "100%",
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        height: 20
      },
      android: {
        height: 20
      }
    })
  },
  topViewLarge: {
    width: "100%",
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        height: 32
      }
    })
  },
  scanQR: {
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  }
});
