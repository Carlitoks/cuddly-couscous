import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 112,
    paddingBottom: 37
  }
});
