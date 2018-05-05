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
    fontSize: moderateScale(26),
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  titleStyle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.listLabelColor,
    paddingBottom: 5
  },
  headerButtonCancel: {
    fontSize: moderateScale(20),
    color: Colors.primaryColor
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
    backgroundColor: "#401674",
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
    color: "#401674",
    fontWeight: "normal",
    fontSize: moderateScale(20)
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
    fontSize: moderateScale(24),
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6
  },
  extraMarginRight: {
    marginLeft: 6,
    marginRight: 15
  },
  extraMarginLeft: {
    marginLeft: 15,
    marginRight: 6
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
