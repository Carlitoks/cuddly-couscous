import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  headerContainer: {
    marginBottom: 20
  },
  header: {
    borderBottomWidth: 0,
    height: 60
  },
  windowTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
    marginTop: moderateScale(20),
    color: "white",
    backgroundColor: "transparent"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1
  },
  centerVertical: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  nativeLanguageTitle: {
    paddingLeft: 10
  },
  marginBottom10: {
    marginBottom: 20
  },
  primaryColor: {
    color: "#73BDEE"
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
