import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: width,
  },
  buttonContainerX: {
    width: width,
    height:62
  },
  textBold: {
    fontFamily: Fonts.primaryBoldFont
  }
});