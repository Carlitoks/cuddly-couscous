import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { Iphone5 } from "../../../../../Util/Devices";

export default StyleSheet.create({
  profileImageBackground: {
    position: "relative",
    left: Iphone5 ? -55 : -35
  },
  avatarImage: {
    backgroundColor: "transparent",
    width: Iphone5 ? moderateScale(220) : moderateScale(261),
    height: Iphone5 ? moderateScale(240) : moderateScale(311),
    opacity: 0.8
  }
});