import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

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
    backgroundColor: Colors.white
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: moderateScale(20),
    color: Colors.white
  },
  inputText: {
    fontSize: 20,
    color: Colors.black,
    paddingBottom: moderateScale(35)
  },
  containerInput: {
    marginTop: moderateScale(20)
  },
  containerBottom: {
    backgroundColor: Colors.black,
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
  },
  marginSpinner: {
    marginTop: 30
  },
  titleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 20,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  titleCallSub: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  subTitleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 10,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  bottom: {
    marginTop: 30
  },
  bottomText: {
    fontSize: 12,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  }
});
