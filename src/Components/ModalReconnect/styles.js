import { StyleSheet } from "react-native";
import Colors from "../../Themes/Colors";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(217, 217, 230, 0.9)"
  },
  topContainer: {
    marginTop: 30,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  mainMessage: {
    fontWeight: "bold"
  },
  modalWrapper: {
    width: 300,
    height: 200
  }
});
