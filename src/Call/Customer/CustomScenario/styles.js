import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    height: 60
  },
  scrollContainer: {
    backgroundColor: "white",
    height: height
  },
  wrapperContainer: {
    backgroundColor: "white",
    flex: 1
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  Icon: {
    color: Colors.primaryColor
  },
  title: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
    color: "white",
    backgroundColor:"transparent"
  },
  userContainer: {
    width: width,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30
  },
  containerBottom: {
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: Colors.primaryAltFontColor,
    width: width
  },
  containerInput: {
    marginTop: moderateScale(20),
    paddingBottom: moderateScale(35)
  }
});
