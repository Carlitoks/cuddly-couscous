import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale, scale } from "../../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  wrapperContainer: {
    backgroundColor: Colors.gradientColor.top,
    height: "100%"
  },
  mainContainer: {},
  buttonGrid: {
    alignItems: "center"
  },
  scanQRImage: {
    width: 25,
    height: 25,
    marginRight: scale(15)
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0
  },
  image: {
    position: "absolute",
    // flex: 1,
    height: "100%",
    zIndex: 0
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    color: Colors.white,
    backgroundColor: "transparent"
  },
  waves: {
    position: "absolute",
    bottom: 0
  }
});
