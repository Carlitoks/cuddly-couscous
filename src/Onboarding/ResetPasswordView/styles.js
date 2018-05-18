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
    backgroundColor: "white"
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
    color: "white"
  },
  containerView: {
    marginTop: moderateScale(10)
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
    paddingLeft: 18,
    fontSize: 15
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
  },
  titleCall: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  }
});
