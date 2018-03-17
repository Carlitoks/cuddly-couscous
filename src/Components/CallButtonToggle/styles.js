import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  buttonCommon: {
    height: 80,
    width: 80,
    justifyContent: "center",
    borderRadius: 100
  },
  buttonIcon: {
    color: "white",
    fontSize: 40,
    right: 100
  }
});
