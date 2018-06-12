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
    backgroundColor: Colors.white
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
  genderItem: {
    paddingTop: moderateScale(23),
    paddingBottom: moderateScale(23)
  },
  genderCheck: {
    height: moderateScale(30),
    width: moderateScale(30)
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
  spaceBetween: {
    paddingTop: 14
  },
  textCenter: {
    textAlign: "center",
    fontSize: 14,
    color: Colors.gradientColorButton.bottom,
    textDecorationLine: "underline"
  },
  mainTitle: {
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
