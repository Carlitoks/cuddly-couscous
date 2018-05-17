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
    width: "100%"
  },
  titleCall: {
    fontFamily: Fonts.LightFont,
    fontSize: moderateScale(26),
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: "white",
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  },
  titleStyle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.listLabelColor,
    paddingBottom: 5
  },
  audioBox: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 10,
    flex: 0.5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  audioBoxActive: {
    backgroundColor: "#5E57B2",
    borderRadius: 10,
    flex: 0.5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  textAudioActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(20)
  },
  textAudioInactive: {
    color: "#5E57B2",
    fontWeight: "normal",
    fontFamily: Fonts.LightFont,
    fontSize: moderateScale(20),
    opacity: 0.8
  },
  firstLanguage: {
    flexDirection: "row",
    borderBottomWidth: 0.8,
    borderColor: Colors.disabledColor,
    borderTopWidth: 0
  },
  secondLanguage: {
    borderRightWidth: 0.8,
    borderColor: Colors.disabledColor,
    flex: 0.5,
    padding: 20
  },
  selectionLanguage: { flex: 0.5, margin: 20, flexDirection: "row" },
  time: {
    padding: 20,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderColor: Colors.disabledColor,
    borderTopWidth: 0
  },
  timeItalic: {
    fontStyle: "italic"
  },
  iconAlign: {
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center"
  },
  bottomWidth: {
    borderBottomWidth: 0.8,
    borderColor: Colors.disabledColor,
    borderTopWidth: 0
  },
  flexit: { flexDirection: "row", height: 100 },
  justifyCenter: { justifyContent: "center", alignItems: "center" },
  flex: { flex: 1 },
  category: {
    padding: 20,
    borderBottomWidth: 0.8,
    borderColor: Colors.disabledColor,
    borderTopWidth: 0
  },
  textInput: {
    height: 40,
    marginLeft: 0,
    borderColor: Colors.white,
    borderWidth: 0,
    borderBottomColor: Colors.transparent
  },
  direction: { flexDirection: "column", flex: 1 },
  flexColumn: { flexDirection: "column", justifyContent: "center" },
  iconSize: {
    fontSize: 28
  },
  borderContainer: {
    borderBottomWidth: 0.8,
    borderColor: Colors.disabledColor,
    borderTopWidth: 0
  },
  regularText: {
    color: Colors.textDefault,
    fontWeight: "normal"
  },
  largeText: {
    fontSize: moderateScale(20)
  },
  centerIcon: {
    marginTop: 4,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6
  },
  extraMarginRight: {
    marginLeft: 7,
    marginRight: 25
  },
  extraMarginLeft: {
    marginLeft: 25,
    marginRight: 7
  },
  iconContainer: {
    justifyContent: "center",
    flex: 0.6
  },
  languagesContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  orangeTitle: {
    color: Colors.listLabelColor,
    fontWeight: "bold"
  }
});
