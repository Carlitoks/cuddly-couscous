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
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(10),
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
  phoneSection: {
    flex: 1,
    flexDirection: "row"
  },
  tagCode: {
    marginTop: moderateScale(25),
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    backgroundColor: "#ebedfa"
  },
  codeText: {
    padding: 0,
    color: "#677bd8",
    fontSize: 20
  },
  containerInput: {
    flex: 1,
    paddingRight: moderateScale(20),
    paddingLeft: 0,
    marginTop: moderateScale(20),
    fontSize: 20,
    color: "black",
    paddingBottom: moderateScale(35)
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
