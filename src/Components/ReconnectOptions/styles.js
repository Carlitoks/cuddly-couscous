import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export const marginTop = value => ({ marginTop: value });

export const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
  button: {
    height: 53,
    width: 255,
    borderColor: Colors.white,
    borderRadius: 50,
    borderWidth: 0.8
  },
  cancelButton: { marginTop: 15, marginBottom: 100 },
  noBorder: {
    borderWidth: 0
  },
  buttonText: {
    fontSize: 17,
    color: Colors.primaryColor,
    fontFamily: Fonts.BoldFont
  }
});
