import { StyleSheet, Platform } from "react-native";
import { moderateScale, scale } from "../../Util/Scaling";
import {Colors} from "../../Themes";

export const styles = StyleSheet.create({
  headerButtonCancel: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 50,
    width: 50,
    paddingRight: Platform.OS !== 'android' ? scale(15) : 0,
  },
  Icon: {
    color: Colors.primaryColor,
  },
});
