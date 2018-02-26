import { StyleSheet } from "react-native";
import Colors from "../../Themes/Colors";

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: Colors.black,
    textAlign: "center"
  },
  iconStyle: {
    color: Colors.selectedOptionMenu
  },
  optionButton: {
    marginTop: 5,
    marginBottom: 10
  }
});
