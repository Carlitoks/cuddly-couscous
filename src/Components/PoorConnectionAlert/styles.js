import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  alertContainer: {
    position: "relative",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.26)",
    height: moderateScale(150),
    margin: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  alertBox: {
    flexGrow: 1,
    margin: moderateScale(15),
    justifyContent: "center",
    alignItems: "center"
  },
  alertContent: {
    textAlign: "center",
    fontSize: moderateScale(18),
    fontFamily: Fonts.primaryFont,
    color: Colors.white
  }
});
