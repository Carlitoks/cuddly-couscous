import { StyleSheet, Platform } from "react-native";
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Metrics
} from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import {isIphoneXorAbove} from "../../../../Util/Devices";

const setHeaderHeight = () => {
  if(Metrics.width <= 320){
    return Metrics.height * 0.60
  }
  if(isIphoneXorAbove()){
    return Metrics.height * 0.65;
  }

  if(Metrics.width <= 375){
    if(Platform.OS === 'ios'){
      return Metrics.height * 0.65;
    }
    return Metrics.height * 0.70;
  }
  return Metrics.height * 0.65;
}

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  avatarContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.gradientColor.top,
    height: setHeaderHeight(),
    width: Metrics.width,
    paddingTop: moderateScaleViewports(21),
  },
  jeeniesStandingBy: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(17), color: "#fff" },
  jeeniesImg: { marginTop: moderateScaleViewports(27) },
});
