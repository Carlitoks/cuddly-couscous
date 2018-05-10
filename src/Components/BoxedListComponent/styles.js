import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: Colors.transparent,
    flex: 1
  },
  listContainer: {
    backgroundColor: Colors.transparent,

    marginTop: 0,
    paddingBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textView: {
    flex: 1,
    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",
    width: "94%",
    backgroundColor: Colors.lightPurple,
    minHeight: 60,
    marginBottom: 10,

    borderRadius: 2
  },
  textBetweenView: {
    borderTopWidth: 0
  },
  mainLine: {
    paddingLeft: 12,
    width: "100%",
    fontFamily: Fonts.BaseFont
  },
  regText: {
    fontSize: 18
  },
  subtitle: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 12,
    fontSize: 12,
    fontWeight: "bold"
  },
  singleTitle: {
    height: "100%",
    textAlign: "center",
    justifyContent: "center"
  },
  doubleTitle: {
    fontSize: 14
  },
  leftText: {
    textAlign: "left",
    justifyContent: "center"
  },
  selectedItem: {
    backgroundColor: Colors.white
  },
  selectedText: {
    fontFamily: Fonts.BoldFont,
    fontWeight: "bold",
    color: Colors.gradientColor.bottom,
    borderRadius: 2
  },
  triangle: {
    marginTop: -15,
    marginBottom: 15,
    width: 0,
    height: 0,
    backgroundColor: Colors.transparent,
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
    borderTopColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderBottomColor: Colors.gradientColorButton.top,
    borderLeftColor: Colors.transparent,
    alignSelf: "center"
  },
  linearGradient: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: "25%"
  },
  icon: {
    position: "absolute",
    right: 0,
    zIndex: 0,
    fontSize: 28
  },
  iconSelected: {
    position: "absolute",
    right: 0,
    zIndex: 0,
    backgroundColor: Colors.transparent,
    color: Colors.gradientColor.bottom,
    fontSize: 28
  },
  iconSelectedRow: {
    alignSelf: "center",
    position: "absolute",
    right: 15,
    zIndex: 0,
    backgroundColor: Colors.transparent
  },
  disabledItemView: {
    // backgroundColor: Colors.lightGrey
  },
  disabledItemText: {
    color: Colors.lightGrey
  }
});
