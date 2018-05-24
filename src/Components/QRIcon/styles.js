import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  buttonGrid: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginRight: scale(15)
  }
});
