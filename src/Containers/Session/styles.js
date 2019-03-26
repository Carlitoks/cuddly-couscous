import {StyleSheet} from "react-native";
import Color from "color";
import colors from "../../Themes/Colors";
import {moderateScale} from "../../Util/Scaling";

export default styles = StyleSheet.create({
  cancelButton: {
    borderRadius: moderateScale(50, 0),
    height: moderateScale(50, 0),
    paddingLeft: moderateScale(30, 0),
    paddingRight: moderateScale(30, 0),
    backgroundColor: Color(colors.backgroundBlue).lighten(0.05).hex(),
    borderWidth: moderateScale(2, 0),
    borderColor: Color(colors.backgroundBlue).lighten(0.1).hex(),
    marginBottom: moderateScale(30, 0)
  },
  cancelButtonText: {
    color: colors.white
  }
});