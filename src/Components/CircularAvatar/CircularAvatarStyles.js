import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import { moderateScaleViewports } from "../../Util/Scaling";

export default (styles = StyleSheet.create({
  historyTitleStyle: {
    fontSize: moderateScaleViewports(20),
    fontFamily: Fonts.BaseFont,
    fontWeight: "normal"
  },
}));
