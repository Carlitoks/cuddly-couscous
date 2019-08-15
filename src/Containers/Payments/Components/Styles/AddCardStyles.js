import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../../../Themes";

export default StyleSheet.create({
  flexEndCenter: { width: Metrics.width * 0.9, marginTop: 31 },
  imagePosition: { marginTop: Metrics.height * 0.25 },
  loaderStyle: { zIndex: 100000, top: 150 },
  noCardText: {
    fontFamily: Fonts.BaseFont,
    color: Colors.gradientColor.top,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center"
  },
  addCardBottomInputs: { flexDirection: "row", marginTop: 41, justifyContent: "space-between" }
});
