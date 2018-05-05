import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  topView: {
    width: "100%",
    backgroundColor: Colors.transparent,
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
    backgroundColor: Colors.transparent,
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
