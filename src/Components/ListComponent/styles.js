import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1
    //marginTop: moderateScale(45),
    //marginBottom: moderateScale(45)
  },
  listContainer: {
    marginTop: 0,
    marginBottom: "3%",
    paddingBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
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
    padding: 8,
    width: "100%",
    height: "100%",
    fontFamily: Fonts.primaryBaseFont,
    fontSize: 16
  },
  leftText: {
    textAlign: "left",
    justifyContent: "center"
  },
  selectedText: {
    fontFamily: Fonts.primaryBoldFont,
    fontWeight: "bold",
    backgroundColor: Colors.gradientColor.bottom,
    color: Colors.primaryColor
  },
  triangle: {
    marginTop: -15,
    marginBottom: 15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.gradientColorButton.top,
    borderLeftColor: "transparent",
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
    position: "absolute",
    right: 0,
    zIndex: 0,
    backgroundColor: Colors.gradientColor.bottom,
    color: "white"
  }
});
