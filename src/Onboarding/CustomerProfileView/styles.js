import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10
  },
  myProfileText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  title: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.BoldFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  contentScrollContainer: { flexGrow: 1 },
  buttonText: {
    textAlign: "center",
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BaseFont,
    fontSize: 16,
    fontWeight: "bold"
  },
  avatar: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    borderRadius: 75
  }
});
