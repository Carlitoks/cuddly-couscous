import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale, scale } from "../../../Util/Scaling";
import { Iphone5 } from "../../../Util/Devices";

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
  imageContainer: {
    width,
    position: "absolute",
    top: Iphone5 ? scale(-235) : scale(-150) // 95 without scale
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    top: 0,
    width: "100%",
    zIndex: 0
  },
  title: {
    marginLeft: 16,
    fontSize: 26,
    color: Colors.white,
    backgroundColor: Colors.transparent
  },
  marginBottom10: {
    marginBottom: 10
  },
  marginBottom20: {
    marginBottom: 20
  },
  waves: {
    position: "absolute",
    bottom: 0
  }
});
