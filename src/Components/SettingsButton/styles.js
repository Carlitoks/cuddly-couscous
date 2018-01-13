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
    alignItems: "center",
    marginTop:50
  }
});
