import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(141, 123, 315, 0.9)"
  },
  innerContainer: {
    alignItems: "center"
  },
  text: {
    backgroundColor: Colors.transparent,
    color: "#fff",
    fontSize: 18
  }
});
