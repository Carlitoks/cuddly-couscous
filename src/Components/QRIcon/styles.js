import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  buttonGrid: {
    alignItems: "center"
  },
  scanQRImage: {
    width: 25,
    height: 25,
    marginRight: scale(15)
  }
});