import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import { Colors, Fonts } from "../../Themes";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "100%"
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  col: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  backgroundForm:{
    backgroundColor:"white"
  },
  personalInformation: {
    fontSize: 17,
    width: width,
    paddingTop: 30,
    paddingLeft: 15
  },
  myProfileText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  title: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.primaryLightFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  contentScrollContainer: { flexGrow: 1 },
  logoutContainer: {
    backgroundColor: "transparent",
    marginTop: moderateScale(40),
    width: width,
    alignSelf: "center",
    marginBottom: moderateScale(40)
  },
  buttonText: {
    textAlign: "center",
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBaseFont,
    fontSize: 16,
    fontWeight: "bold"
  }
});
