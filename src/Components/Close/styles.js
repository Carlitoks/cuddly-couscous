import { StyleSheet } from "react-native";
import { moderateScale, scale } from "../../Util/Scaling";

export const styles = StyleSheet.create({
  headerButtonCancel: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 50,
    width: 50,
    paddingRight: scale(15)
  }
});
