import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  buttons: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    paddingBottom: 19,
    width: "100%"
  },
  titleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  titleStyle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.listLabelColor
  },
  headerButtonCancel: {
    fontSize: 13,
    color: Colors.primaryColor
  },
  audioBox: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  audioBoxActive: {
    backgroundColor: "#401674",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  textAudioActive: {
    color: "white",
    fontWeight: "bold"
  },
  textAudioInactive: {
    color: "#401674",
    fontWeight: "bold"
  },
  firstLanguage: {
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  secondLanguage: {
    borderRightWidth: 1,
    flex: 0.5,
    padding: 20
  },
  selectionLanguage: { flex: 0.5, margin: 20, flexDirection: "row" },
  time: {
    borderBottomWidth: 1,
    padding: 20,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeItalic: { color: "gray", fontStyle: "italic" },
  iconAlign: {
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center"
  },
  bottomWidth: { borderBottomWidth: 1 },
  flexit: { flexDirection: "row", height: 100 },
  justifyCenter: { justifyContent: "center", alignItems: "center" },
  flex: { flex: 1 },
  category: { borderBottomWidth: 1, padding: 20 },
  textInput: {
    height: 40,
    marginLeft: 10,
    borderColor: Colors.white,
    borderWidth: 0,
    borderBottomColor: "transparent"
  },
  scenarioText: { color: "gray", fontWeight: "normal" },
  direction: { flexDirection: "column", flex: 1 },
  flexColumn: { flexDirection: "column" }
});
