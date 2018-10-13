import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    paddingTop: 15,
    height: 60,
    backgroundColor: Colors.transparent
  },
  listContainer: {
    marginTop: 0,
    marginBottom: "3%",
    paddingBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.transparent
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.bordersLightGrey,
    width: "100%",
    height: 38
  },
  textBetweenView: {
    borderTopWidth: 0
  },
  regText: {
    textAlign: "center",
    justifyContent: "center",
    padding: 3,
    fontFamily: Fonts.BaseFont,
    fontSize: 18
  },
  leftText: {
    textAlign: "left",
    justifyContent: "center"
  },
  selectedText: {
    fontFamily: Fonts.BoldFont,
    fontWeight: "500",
    color: Colors.gradientColor.top
  },
  disabledText: {
    fontFamily: Fonts.BaseFont,
    color: Colors.black
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
    zIndex: 0
  },
  iconSelected: {
    alignSelf: "center",
    position: "absolute",
    right: 5,
    zIndex: 0,
    backgroundColor: Colors.transparent
  },
  disabledItemText: {
    color: Colors.lightGrey
  },
  selectedBackground: {
    backgroundColor: Colors.lightPurple
  },
  disabledBackground: {
    backgroundColor: Colors.white
  },
  crossLineText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  paddingContainer: {
    marginLeft: moderateScale(40),
    paddingRight: moderateScale(40)
  }
});
