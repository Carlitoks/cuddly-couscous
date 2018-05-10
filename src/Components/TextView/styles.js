import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  contentScrollContainer: { flexGrow: 1 },
  text: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontFamily: Fonts.BoldFont
  }
});
