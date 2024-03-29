import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  Icon: {
    color: Colors.primaryColor
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
    width: 50
  }
});
