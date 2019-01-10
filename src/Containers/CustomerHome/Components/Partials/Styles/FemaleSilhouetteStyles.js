import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { Iphone5 } from "../../../../../Util/Devices";
import metrics from './../../../../../Themes/Metrics';

export default StyleSheet.create({
  profileImageBackground: {
    position: "absolute",
    zIndex: 0,
    left: moderateScale(225, 0),
    bottom: 0.5,
  },
  profileImageBackgroundOnboarding: {
    position: "absolute",
    zIndex: 0
  },
  avatarImage: {
    backgroundColor: "transparent",
    height: metrics.height * 0.28,
    width: metrics.width * 0.58,
    opacity: 0.8
  }
});
