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
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: moderateScale(20),
    color: "white",
    backgroundColor: "transparent"
  },
  mainSubtitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(30),
    color: "white",
    backgroundColor: "transparent"
  },
  inputText: {
    fontSize: 20,
    color: "black",
    paddingBottom: 30
  },
  containerInput: {
    marginTop: 20
  },
  containerInput: {
    marginTop: moderateScale(20)
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
  links: {
    color: Colors.gradientColorButton.top,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  textAbove: {
    paddingRight: 2
  },
  formText: {
    textAlign: "center",
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  mainContainterText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 18,
    marginRight: 18
  },
  textCenter: {
    textAlign: "center",
    fontSize: 14
  }
});
