import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(45),
  },
  text:{
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: Fonts.primaryBaseFont,
    padding: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.placeholderColor,
    width: "60%"
  },
  textBetween:{
    borderTopWidth: 0,
  },
  selected: {
    borderColor: Colors.gradientColorButton.top,
  },
  belowSelected: {
    borderBottomColor: Colors.gradientColorButton.top,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 4.5,
    borderBottomWidth: 9,
    borderLeftWidth: 4.5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.gradientColorButton.top,
    borderLeftColor: 'transparent',
    alignSelf: "center"
  },

});
