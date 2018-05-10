import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

export default (styles = StyleSheet.create({
  tileContainer: {
    width: scale(280),
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15
  },
  buttonText: { marginLeft: -moderateScale(12.5) },
  buttonContainer: {
    width: scale(130),
    marginBottom: 3
  },
  buttonStyle: {},
  backgroundImage: {
    width: scale(320),
    resizeMode: "stretch",
    borderRadius: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: Fonts.BoldFont
  }
}));
