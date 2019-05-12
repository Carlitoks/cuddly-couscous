import {StyleSheet} from "react-native";
import Color from "color";
import colors from "../../Themes/Colors";
import {moderateScale, moderateFontSize} from "../../Util/Scaling";

export default styles = StyleSheet.create({
  prominentButtonBase: {
    width: "70%",
    height: moderateScale(50, 0),
    borderWidth: moderateScale(1, 0),
    borderRadius: moderateScale(30, 0),
    marginBottom: moderateScale(15, 0),  
  },
  prominentButtonOrange: {
    backgroundColor: colors.backgroundOrange,
    borderColor: colors.white,
  },
  prominentButtonBlue: {
    backgroundColor: Color(colors.backgroundBlue).lighten(0.1).hex(),
    borderColor: Color(colors.backgroundBlue).lighten(0.2).hex()
  },
  prominentButtonText: {
    fontSize: moderateFontSize(15),
    color: colors.white,
  }
});