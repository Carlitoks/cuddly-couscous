import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: moderateScale(26),
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: "white",
    backgroundColor: Colors.transparent
  },
  inputText: {
    fontSize: 20,
    color: "black",
    paddingBottom: moderateScale(35)
  },
  containerInput: {
    marginTop: moderateScale(20)
  },
  formText: {
    fontSize: 15,
    paddingLeft: 15,
    marginBottom: 15,
    marginTop: 10
  },
  mainSubtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(30),
    color: "white",
    backgroundColor: Colors.transparent
  },
  containerBottom: {
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: Colors.linguistFormButton,
    width: width
  },
  buttonText: {
    color: Colors.linguistFormText
  }
});
