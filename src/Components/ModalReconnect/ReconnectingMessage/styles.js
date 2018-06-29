import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparent
  },
  connectingMessageContainer: {
    backgroundColor: "rgba(51, 51, 51, .64)",
    height: 0.31 * height,
    width: 0.54 * width,
    borderRadius: 7
  },
  connectingMessage: {
    backgroundColor: Colors.transparent,
    width: "100%",
    textAlign: "center",
    color: Colors.white,
    marginTop: 39,
    fontSize: 18
  },
  modalSpinner: { marginTop: 37 }
});
