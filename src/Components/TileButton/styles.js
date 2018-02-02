import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

export default (styles = StyleSheet.create({
  tileContainer: {
    width: scale(170),
    marginBottom: 15,
    alignItems: "center"
  },
  buttonText: { marginLeft: -moderateScale(12.5) },
  buttonContainer: {
    width: scale(130),
    height: scale(130),
    marginBottom: 3
  },
  buttonStyle: {
    width: scale(130),
    height: scale(130)
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: Fonts.primaryBoldFont
  }
}));
