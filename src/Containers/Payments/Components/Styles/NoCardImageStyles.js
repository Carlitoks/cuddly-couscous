import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../../../Themes";

export default StyleSheet.create({
  flexEndCenter: { justifyContent: "center", alignItems: "flex-end" },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  imagePosition: { marginTop: Metrics.height * 0.25 },
  noCardText: {
    fontFamily: Fonts.BaseFont,
    color: Colors.gradientColor.top,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center"
  }
});
