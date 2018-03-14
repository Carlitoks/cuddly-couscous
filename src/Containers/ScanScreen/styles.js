import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.black
  },
  bottomView: {
    backgroundColor: Colors.black
  },
  Button: {
    backgroundColor: Colors.primaryLightFillColor,
    width: moderateScale(150),
    alignSelf: "center",
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
    height: moderateScale(90)
  },
  buttonText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  title: {
    fontSize: 20,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: "90%"
  },
  zeroContainer: {
    height: 0,
    flex: 0
  },
  cameraContainer: {
    height: height
  },
  mainContainer: { flex: 1, backgroundColor: "transparent" },
  headerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignSelf: "flex-start",
    position: "absolute",
    zIndex: 1,
    width: "100%"
  },
  header: { width: "100%" },
  headerOuterContainer: {
    borderBottomWidth: 0
  },
  codeScanner: { flex: 1 },
  textContainer: { flex: 0.4, alignContent: "center", zIndex: 1 },
  scanText: {
    alignSelf: "center",
    color: Colors.primaryColor,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: Fonts.primaryBaseFont,
    fontSize: scale(35),
    textAlign: "center"
  }
});
