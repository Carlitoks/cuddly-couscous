import { StyleSheet } from "react-native";
import Colors from "../../Themes/Colors";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  topContainer: {
    marginTop: 30,
    marginBottom: 50,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  mainMessage: {
    fontWeight: "bold",
    color: Colors.white
  },
  modalWrapper: {
    width: 300,
    height: 200
  }
});
