import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  avatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    borderRadius: 75
  },
  headerContainer: {
    marginBottom: 20
  },
  header: {
    borderBottomWidth: 0,
    height: 60
  },
  avatar: { alignSelf: "center" },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1
  },
  title: {
    color: Colors.primaryColor,
    fontFamily: Fonts.primaryLightFont
  },
  containerTitles: {
    paddingLeft: 20,
    marginTop: 20
  },
  titlesForm: {
    color: "#b7a0aa"
  },
  containerAvatar: {
    marginTop: moderateScale(30),
    alignItems: "center",
    marginBottom: 10
  },
  inputText: {
    color: "black"
  },
  marginBottom10: {
    marginBottom: 20
  },
  marginBottom80: {
    marginBottom: 80
  },
  nativeLanguageTitle: {
    paddingLeft: 10
  },
  containerBottom: {
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    width: width
  },
  buttonText: {
    color: Colors.linguistFormText
  }
});
